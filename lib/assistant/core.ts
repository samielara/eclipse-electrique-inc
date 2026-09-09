import { z } from "zod";
import { findCoveredCity, getAssistantReply, normalizeAssistantText, type AssistantReply } from "@/lib/knowledge-base";
import type { Locale } from "@/lib/routes";
import { checkServiceArea, emergencyHandoff, matchElectricalService, prefillQuote, prefillSchema, serviceSchema } from "./tools";

export const assistantInputSchema = z.object({
  message: z.string().min(1).max(600).refine(value => value.trim().length > 0 && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)).transform(value => value.trim()),
  locale: z.enum(["fr", "en"]),
}).strict();
export const selectionSchema = z.discriminatedUnion("tool", [
  z.object({ tool: z.literal("checkServiceArea"), city: z.string().max(100) }).strict(),
  z.object({ tool: z.literal("matchElectricalService"), service: serviceSchema }).strict(),
  z.object({ tool: z.literal("prefillQuote"), ...prefillSchema.shape }).strict(),
  z.object({ tool: z.literal("emergencyHandoff") }).strict(),
  z.object({ tool: z.literal("fallback") }).strict(),
]);
export type AssistantInput = z.infer<typeof assistantInputSchema>;

export function deterministicReply(message: string, locale: Locale): AssistantReply {
  const reply = getAssistantReply(message, locale);
  return reply.emergency ? emergencyHandoff(reply.locale) : reply;
}

// Deliberately process-global: no client-controlled forwarded header can evade it.
export function createRequestBudget(limit = 20, windowMs = 60_000) {
  let start = 0;
  let count = 0;
  return (now = Date.now()) => {
    if (now - start >= windowMs) { start = now; count = 0; }
    if (count >= limit) return false;
    count++;
    return true;
  };
}

export async function resolveAssistant(input: AssistantInput, options: {
  enabled: boolean;
  allowed: () => boolean;
  select: (input: AssistantInput, signal: AbortSignal) => Promise<unknown>;
  timeoutMs?: number;
}): Promise<AssistantReply> {
  const fallback = deterministicReply(input.message, input.locale);
  if (fallback.emergency || !options.enabled || !options.allowed()) return fallback;
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const output = await Promise.race([
      options.select(input, controller.signal),
      new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error("timeout")); }, options.timeoutMs ?? 6000); }),
    ]);
    const selection = selectionSchema.parse(output);
    const locale = fallback.locale;
    switch (selection.tool) {
      case "emergencyHandoff": return emergencyHandoff(locale);
      case "checkServiceArea": {
        const city = findCoveredCity(selection.city);
        if (city && city.slug !== findCoveredCity(input.message)?.slug) return fallback;
        if (!city && !normalizeAssistantText(input.message).includes(normalizeAssistantText(selection.city))) return fallback;
        return checkServiceArea(selection.city, locale);
      }
      case "matchElectricalService": return matchElectricalService(selection.service, locale);
      case "prefillQuote": return prefillQuote({ service: selection.service, municipality: selection.municipality === findCoveredCity(input.message)?.slug ? selection.municipality : null }, locale);
      default: return fallback;
    }
  } catch { return fallback; }
  finally { if (timer) clearTimeout(timer); }
}
