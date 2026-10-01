import { z } from "zod";
import { buildQuoteIntakeMailtoUrl, quoteServiceValues, quoteTimelineValues, validateQuoteIntakeStep } from "@/lib/quote-intake";

export const runtime = "nodejs";
const MAX_BODY = 8 * 1024 * 1024;
const headers = { "Cache-Control": "no-store" };
const attempts = new Map<string, { count: number; expires: number }>();
const fields = z.object({
  service: z.enum(quoteServiceValues), timeline: z.enum(quoteTimelineValues),
  municipality: z.string().max(100), postalCode: z.string().trim().max(12),
  fullName: z.string().trim().min(1).max(150), phone: z.string().trim().max(40),
  email: z.string().trim().email().max(254), address: z.string().trim().min(1).max(300),
  description: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const fail = (error: string, status: number) => Response.json({ error }, { status, headers });
  try {
    const origin = new URL(request.headers.get("origin") || "");
    if (!["http:", "https:"].includes(origin.protocol) || origin.host !== (request.headers.get("host") || new URL(request.url).host)) return fail("origin", 403);
  } catch { return fail("origin", 403); }
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return fail("invalid-input", 415);
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = attempts.get(ip) ?? { count: 0, expires: now + 60_000 };
  if (++limit.count > 5) return fail("rate-limit", 429);
  attempts.set(ip, limit);

  let form: FormData;
  try {
    if (!request.body) return fail("invalid-input", 400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    const timer = setTimeout(() => { void reader.cancel(); }, 10_000);
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BODY) { await reader.cancel(); return fail("files", 413); }
        chunks.push(value);
      }
    } finally { clearTimeout(timer); reader.releaseLock(); }
    form = await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
  } catch { return fail("invalid-input", 400); }
  if (form.get("website")) return fail("invalid-input", 400);
  const parsed = fields.safeParse(Object.fromEntries(form));
  if (!parsed.success) return fail("invalid-input", 400);
  const locale = form.get("locale") === "fr" ? "fr" : "en";
  const values = { ...parsed.data, fileNames: [] };
  for (const step of [1, 2, 3, 4] as const) {
    if (Object.keys(validateQuoteIntakeStep(values, step, locale)).length) return fail("invalid-input", 400);
  }
  const files = form.getAll("files");
  if (files.length > 5 || files.some(file => typeof file === "string" || !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) return fail("files", 400);
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!key || !from) return fail("unavailable", 503);
  const requestId = z.string().uuid().safeParse(form.get("requestId"));
  if (!requestId.success) return fail("invalid-input", 400);
  const message = new URL(buildQuoteIntakeMailtoUrl(values, locale)).searchParams;
  try {
    const attachments = await Promise.all(files.map(async file => {
      const attachment = file as File;
      return { filename: attachment.name.replace(/[\r\n/\\]/g, "_").slice(0, 150), content: Buffer.from(await attachment.arrayBuffer()).toString("base64") };
    }));
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": requestId.data },
      body: JSON.stringify({ from, to: [process.env.RESEND_TO_EMAIL || "yasser@eclipseelectrique.com"], reply_to: values.email, subject: message.get("subject"), text: message.get("body"), attachments }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!result.ok) return fail("send-failed", 502);
    const data = await result.json();
    if (!data.id) return fail("send-failed", 502);
    return Response.json({ success: true }, { headers });
  } catch { return fail("send-failed", 502); }
}
