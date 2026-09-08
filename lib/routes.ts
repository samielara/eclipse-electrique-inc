import { cityPath, citySlugs } from "@/lib/city-routes";

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
  "thermography",
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
  | "thermography"
  | "security";

export const servicePageIds: readonly ServicePageId[] = [
  "residential",
  "commercial",
  "industrial",
  "maintenance",
  "generators",
  "thermography",
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
  thermography: {
    fr: "/fr/services/thermographie-infrarouge",
    en: "/en/services/infrared-thermography",
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
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function pathFor(pageId: PageId, locale: Locale): string {
  return routes[pageId][locale];
}

export function quotePath(locale: Locale): string {
  return `${pathFor("contact", locale)}#quote-intake`;
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
    ...pageIds.flatMap((pageId) => [routes[pageId].fr, routes[pageId].en]),
    ...citySlugs.flatMap((slug) => [cityPath("fr", slug), cityPath("en", slug)]),
  ];
}
