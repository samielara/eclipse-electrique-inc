import { residentialServices } from "@/content/residential-services";
import { commercialServices } from "@/content/commercial-services";
import type { Locale } from "@/lib/routes";

export function getQuoteWorkOptions(service: string, locale: Locale) {
  const items = service === "residential" ? residentialServices : service === "commercialIndustrial" ? commercialServices : [];
  if (service === "solar") return [{value: "solar", label: locale === "fr" ? "Énergie solaire" : "Solar energy"}];
  if (service === "security") return [{value: "security", label: locale === "fr" ? "Alarme et incendie" : "Alarm and fire systems"}];
  if (service === "other") return [{value: "maintenance", label: locale === "fr" ? "Entretien et dépannage" : "Maintenance and troubleshooting"}];
  return items.map(item => ({ value: item.id, label: item.label[locale] }));
}
