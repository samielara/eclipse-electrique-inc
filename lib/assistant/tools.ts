import { z } from "zod";
import { cityRoutes } from "@/lib/city-routes";
import { getAssistantReply, type AssistantReply } from "@/lib/knowledge-base";
import { quoteServiceValues } from "@/lib/quote-intake";
import { pathFor, quotePath, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export const serviceSchema = z.enum(quoteServiceValues);
export const prefillSchema = z.object({
  service: serviceSchema.nullable(),
  municipality: z.string().max(100).nullable(),
}).strict();

export function emergencyHandoff(locale: Locale): AssistantReply {
  const reply = getAssistantReply(locale === "fr" ? "urgence" : "emergency", locale);
  return { ...reply, action: { ...reply.action!, href: site.emergencyPhoneHref } };
}

export function checkServiceArea(city: string, locale: Locale): AssistantReply {
  return getAssistantReply(`${locale === "fr" ? "vérifier ville" : "check city"} ${city}`, locale);
}

export function matchElectricalService(service: z.infer<typeof serviceSchema>, locale: Locale): AssistantReply {
  const mapping = {
    residential: { query: "panel", page: "residential" },
    commercialIndustrial: { query: "commercial", page: "commercial" },
    thermography: { query: "thermography", page: "thermography" },
    security: { query: "security system", page: "security" },
    other: { query: "", page: "services" },
  } as const;
  const item = mapping[service];
  // Locale is authoritative here; the query selects a verified template only.
  const reply = getAssistantReply(item.query, locale);
  const localized = getAssistantReply({ residential: "panneau", commercialIndustrial: "commercial", thermography: "thermographie", security: "alarme", other: "" }[service], "fr");
  return { ...(locale === "fr" ? localized : reply), locale, action: { kind: "service", label: locale === "fr" ? "Consulter le service" : "View service", href: pathFor(item.page, locale) } };
}

export function prefillQuote(input: z.infer<typeof prefillSchema>, locale: Locale): AssistantReply {
  const value = prefillSchema.parse(input);
  const params = new URLSearchParams();
  if (value.service) params.set("assistantService", value.service);
  if (cityRoutes.some(city => city.slug === value.municipality)) params.set("assistantCity", value.municipality!);
  const reply = getAssistantReply(locale === "fr" ? "soumission" : "quote", locale);
  const [base, hash] = quotePath(locale).split("#");
  return { ...reply, action: { ...reply.action!, href: `${base}${params.size ? `?${params}` : ""}#${hash}` } };
}

export { readQuotePrefill } from "./prefill";
