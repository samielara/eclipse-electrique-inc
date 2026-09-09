import { cityRoutes } from "@/lib/city-routes";
import { quoteServiceValues, type QuoteIntakeValues, type QuoteService } from "@/lib/quote-intake";

/** Lightweight client allowlists; no model/provider or Zod bundle required. */
export function readQuotePrefill(search: string): Partial<QuoteIntakeValues> {
  const params = new URLSearchParams(search);
  const result: Partial<QuoteIntakeValues> = {};
  const service = params.get("assistantService");
  if (quoteServiceValues.some(value => value === service)) result.service = service as QuoteService;
  const city = params.get("assistantCity");
  if (cityRoutes.some(item => item.slug === city)) result.municipality = city!;
  return result;
}
