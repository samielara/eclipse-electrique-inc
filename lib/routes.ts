import { cityPath, citySlugs } from "@/lib/city-routes";
import { residentialServices, residentialServicePath } from "@/content/residential-services";
import { commercialServices, commercialServicePath } from "@/content/commercial-services";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const pageIds = [
  "home",
  "services",
  "residential",
  "commercial",
  "industrial",
  "maintenance",
  "generators",
  "solar",
  "security",
  "serviceArea",
  "about",
  "faq",
  "contact",
  "privacy",
] as const;

export type PageId = (typeof pageIds)[number];
export type ServicePageId =
  | "residential"
  | "commercial"
  | "industrial"
  | "maintenance"
  | "generators"
  | "solar"
  | "security";

export const servicePageIds: readonly ServicePageId[] = [
  "residential",
  "commercial",
  "maintenance",
  "generators",
  "solar",
  "security",
];

export const routes = {
  home: { fr: "/fr", en: "/en" },
  services: { fr: "/fr/services", en: "/en/services" },
  residential: {
    fr: "/fr/services/electricien-residentiel",
    en: "/en/services/residential-electrician",
  },
  commercial: {
    fr: "/fr/services/electricien-commercial",
    en: "/en/services/commercial-electrician",
  },
  industrial: {
    fr: "/fr/services/electricien-industriel",
    en: "/en/services/industrial-electrician",
  },
  maintenance: {
    fr: "/fr/services/maintenance-et-urgence",
    en: "/en/services/maintenance-and-emergency",
  },
  generators: {
    fr: "/fr/services/generatrices",
    en: "/en/services/generators",
  },
  solar: {
    fr: "/fr/services/energie-solaire",
    en: "/en/services/solar-energy",
  },
  security: {
    fr: "/fr/services/alarme-et-securite",
    en: "/en/services/fire-and-security",
  },
  serviceArea: {
    fr: "/fr/territoire-desservi",
    en: "/en/service-area",
  },
  about: { fr: "/fr/a-propos", en: "/en/about" },
  faq: { fr: "/fr/faq", en: "/en/faq" },
  contact: { fr: "/fr/contact", en: "/en/contact" },
  privacy: { fr: "/fr/confidentialite", en: "/en/privacy" },
} as const satisfies Record<PageId, Record<Locale, string>>;

export interface ResolvedPage {
  locale: Locale;
  pageId: PageId;
  citySlug?: string;
  residentialServiceId?: string;
  commercialServiceId?: string;
  retiredService?: boolean;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function pathFor(pageId: PageId, locale: Locale): string {
  if(pageId==="industrial") return routes.commercial[locale];
  return routes[pageId][locale];
}

export function quotePath(locale: Locale, context?: { pageId?: string; residentialServiceId?: string; commercialServiceId?: string; citySlug?: string }): string {
  const params = new URLSearchParams();
  const page = context?.pageId;
  const category = context?.residentialServiceId ? "residential" : context?.commercialServiceId ? "commercialIndustrial" : page === "commercial" || page === "industrial" ? "commercialIndustrial" : page === "residential" ? "residential" : page === "solar" ? "solar" : page === "security" ? "security" : page === "generators" ? "residential" : page === "maintenance" ? "other" : "";
  if (category) params.set("assistantService", category);
  const work = context?.residentialServiceId || context?.commercialServiceId || (page === "generators" ? "generators" : page === "solar" || page === "security" || page === "maintenance" ? page : "");
  if (work) params.set("work", work);
  if (context?.citySlug) params.set("assistantCity", context.citySlug);
  return `${pathFor("contact", locale)}${params.size ? `?${params}` : ""}#quote-intake`;
}

export function alternatePath(pageId: PageId, locale: Locale): string {
  return pathFor(pageId, locale === "fr" ? "en" : "fr");
}

export function resolvePage(
  localeValue: string,
  segments: readonly string[] = [],
): ResolvedPage | null {
  if (!isLocale(localeValue)) {
    return null;
  }

  const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";
  const candidate = `/${localeValue}${suffix}`;
  const pageId = pageIds.find((id) => routes[id][localeValue] === candidate);

  if (pageId) return { locale: localeValue, pageId };
  if (candidate === "/en/services/infrared-thermography" || candidate === "/fr/services/thermographie-infrarouge") return {locale:localeValue,pageId:"services",retiredService:true};
  const residential = residentialServices.find(s => residentialServicePath(localeValue,s.id) === candidate);
  if (residential) return {locale:localeValue,pageId:"residential",residentialServiceId:residential.id};
  const commercial = commercialServices.find(s => commercialServicePath(localeValue,s.id) === candidate);
  if(commercial) return {locale:localeValue,pageId:"commercial",commercialServiceId:commercial.id};

  const areaSegment = localeValue === "fr" ? "territoire-desservi" : "service-area";
  if (
    segments.length === 2 &&
    segments[0] === areaSegment &&
    citySlugs.includes(segments[1])
  ) {
    return { locale: localeValue, pageId: "serviceArea", citySlug: segments[1] };
  }

  return null;
}

export function allLocalizedPaths(): string[] {
  return [
    ...pageIds.filter(id=>id!=="industrial").flatMap((pageId) => [routes[pageId].fr, routes[pageId].en]),
    ...commercialServices.flatMap(s=>[commercialServicePath("fr",s.id),commercialServicePath("en",s.id)]),
    ...residentialServices.flatMap(s => [residentialServicePath("fr",s.id),residentialServicePath("en",s.id)]),
    ...citySlugs.flatMap((slug) => [cityPath("fr", slug), cityPath("en", slug)]),
  ];
}
