import { pathFor, type Locale, type PageId } from "@/lib/routes";
import { site } from "@/lib/site";

const schemaCopy = {
  fr: {
    description:
      "Entrepreneur électricien bilingue desservant le Grand Montréal, avec répartition d’urgence électrique 24/7.",
    catalog: "Services électriques",
    areas: ["Grand Montréal", "Montréal", "Laval", "Longueuil", "Rive-Nord", "Rive-Sud"],
    officeContact: "service à la clientèle",
    emergencyContact: "répartition d’urgence électrique 24/7",
    offers: [
      { name: "Services électriques résidentiels", pageId: "residential" },
      { name: "Services électriques commerciaux et industriels", pageId: "commercial" },
      { name: "Thermographie infrarouge", pageId: "thermography" },
      { name: "Systèmes d’alarme et d’incendie", pageId: "security" },
    ],
  },
  en: {
    description:
      "Bilingual electrical contractor serving Greater Montréal, with 24/7 electrical emergency dispatch.",
    catalog: "Electrical services",
    areas: ["Greater Montréal", "Montréal", "Laval", "Longueuil", "North Shore", "South Shore"],
    officeContact: "customer service",
    emergencyContact: "24/7 electrical emergency dispatch",
    offers: [
      { name: "Residential electrical services", pageId: "residential" },
      { name: "Commercial and industrial electrical services", pageId: "commercial" },
      { name: "Infrared thermography", pageId: "thermography" },
      { name: "Alarm and fire systems", pageId: "security" },
    ],
  },
} as const satisfies Record<
  Locale,
  {
    description: string;
    catalog: string;
    areas: readonly string[];
    officeContact: string;
    emergencyContact: string;
    offers: readonly { name: string; pageId: PageId }[];
  }
>;

function absolute(pathname: string): string {
  return new URL(pathname, site.origin).toString();
}

export function buildLocalBusinessSchema(locale: Locale) {
  const copy = schemaCopy[locale];
  const businessId = `${site.origin}/#business`;

  return {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness"],
    "@id": businessId,
    name: site.shortName,
    legalName: site.legalName,
    description: copy.description,
    url: absolute(pathFor("home", locale)),
    logo: absolute("/eclipse-logo.jpg"),
    telephone: site.officePhoneE164,
    email: site.email,
    identifier: [
      { "@type": "PropertyValue", name: "RBQ", value: site.rbq },
      { "@type": "PropertyValue", name: "NEQ", value: site.neq },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: copy.areas.map((name, index) => ({
      "@type": index > 0 && index < 4 ? "City" : "AdministrativeArea",
      name,
    })),
    knowsLanguage: ["fr-CA", "en-CA"],
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.officePhoneE164,
        contactType: copy.officeContact,
        availableLanguage: ["fr", "en"],
      },
      {
        "@type": "ContactPoint",
        telephone: site.emergencyPhoneE164,
        contactType: copy.emergencyContact,
        availableLanguage: ["fr", "en"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.catalog,
      itemListElement: copy.offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          url: absolute(pathFor(offer.pageId, locale)),
          provider: { "@id": businessId },
        },
      })),
    },
  };
}

export function SchemaOrg({ locale }: { locale: Locale }) {
  const jsonLd = JSON.stringify(buildLocalBusinessSchema(locale)).replaceAll(
    "<",
    "\\u003c",
  );

  return (
    <script
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      id="eclipse-local-business-schema"
      type="application/ld+json"
    />
  );
}
