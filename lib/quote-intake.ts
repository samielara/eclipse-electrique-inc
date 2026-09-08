import { cityRoutes } from "@/lib/city-routes";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export const quoteServiceValues = [
  "residential",
  "commercialIndustrial",
  "thermography",
  "security",
  "other",
] as const;

export type QuoteService = (typeof quoteServiceValues)[number];

export const quoteTimelineValues = ["emergency", "soon", "planned"] as const;

export type QuoteTimeline = (typeof quoteTimelineValues)[number];
export type QuoteIntakeStep = 1 | 2 | 3 | 4;

export interface QuoteIntakeValues {
  service: "" | QuoteService;
  timeline: "" | QuoteTimeline;
  municipality: string;
  postalCode: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  fileNames: string[];
}

export type QuoteIntakeErrors = Partial<
  Record<Exclude<keyof QuoteIntakeValues, "fileNames">, string>
>;

export const emptyQuoteIntakeValues: QuoteIntakeValues = {
  service: "",
  timeline: "",
  municipality: "",
  postalCode: "",
  fullName: "",
  phone: "",
  email: "",
  address: "",
  description: "",
  fileNames: [],
};

const validationMessages = {
  fr: {
    service: "Choisissez un type de service.",
    timeline: "Choisissez un délai d’intervention.",
    municipality: "Choisissez une municipalité du territoire desservi.",
    postalCode: "Entrez un code postal canadien valide.",
    fullName: "Entrez votre nom complet.",
    phone: "Entrez un numéro de téléphone valide.",
    email: "Entrez une adresse courriel valide.",
    address: "Entrez l’adresse des travaux.",
    description: "Décrivez brièvement le projet ou le problème.",
  },
  en: {
    service: "Choose a service type.",
    timeline: "Choose an intervention timeline.",
    municipality: "Choose a municipality from the service area.",
    postalCode: "Enter a valid Canadian postal code.",
    fullName: "Enter your full name.",
    phone: "Enter a valid phone number.",
    email: "Enter a valid email address.",
    address: "Enter the work address.",
    description: "Briefly describe the project or issue.",
  },
} as const;

const handoffCopy = {
  fr: {
    subject: "Demande de soumission",
    service: "Type de service",
    timeline: "Délai d’intervention",
    municipality: "Municipalité ou arrondissement",
    postalCode: "Code postal",
    fullName: "Nom complet",
    phone: "Téléphone",
    email: "Courriel",
    address: "Adresse des travaux",
    description: "Projet ou problème",
    files: "Fichiers sélectionnés",
    attachmentNotice:
      "Ajoutez manuellement les fichiers sélectionnés à ce courriel avant de l’envoyer.",
    services: {
      residential: "Résidentiel",
      commercialIndustrial: "Commercial / Industriel",
      thermography: "Thermographie infrarouge",
      security: "Alarme & incendie",
      other: "Autre",
    },
    timelines: {
      emergency: "Urgence immédiate (24/7)",
      soon: "Dans les 24 à 48 heures",
      planned: "Projet planifié / estimation standard",
    },
  },
  en: {
    subject: "Quote request",
    service: "Service type",
    timeline: "Intervention timeline",
    municipality: "Municipality or borough",
    postalCode: "Postal code",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    address: "Work address",
    description: "Project or issue",
    files: "Selected files",
    attachmentNotice:
      "Please attach the selected files manually to this email before sending it.",
    services: {
      residential: "Residential",
      commercialIndustrial: "Commercial / Industrial",
      thermography: "Infrared thermography",
      security: "Alarm and fire systems",
      other: "Other",
    },
    timelines: {
      emergency: "Immediate emergency (24/7)",
      soon: "Within 24 to 48 hours",
      planned: "Planned project / standard estimate",
    },
  },
} as const;

export function getQuoteServiceOptions(locale: Locale) {
  return quoteServiceValues.map((value) => ({
    value,
    label: handoffCopy[locale].services[value],
  }));
}

export function getQuoteTimelineOptions(locale: Locale) {
  return quoteTimelineValues.map((value) => ({
    value,
    label: handoffCopy[locale].timelines[value],
  }));
}

export function getQuoteMunicipalityOptions(locale: Locale) {
  return cityRoutes.map((city) => ({ value: city.slug, label: city[locale] }));
}

function isSupportedMunicipality(value: string): boolean {
  return cityRoutes.some((city) => city.slug === value);
}

function isValidCanadianPostalCode(value: string): boolean {
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateQuoteIntakeStep(
  values: QuoteIntakeValues,
  step: QuoteIntakeStep,
  locale: Locale,
): QuoteIntakeErrors {
  const copy = validationMessages[locale];
  const errors: QuoteIntakeErrors = {};

  if (step === 1 && !quoteServiceValues.includes(values.service as QuoteService)) {
    errors.service = copy.service;
  }

  if (step === 2 && !quoteTimelineValues.includes(values.timeline as QuoteTimeline)) {
    errors.timeline = copy.timeline;
  }

  if (step === 3) {
    if (!isSupportedMunicipality(values.municipality)) {
      errors.municipality = copy.municipality;
    }
    if (!isValidCanadianPostalCode(values.postalCode)) {
      errors.postalCode = copy.postalCode;
    }
  }

  if (step === 4) {
    if (!values.fullName.trim()) errors.fullName = copy.fullName;
    if (!isValidPhone(values.phone)) errors.phone = copy.phone;
    if (!isValidEmail(values.email)) errors.email = copy.email;
    if (!values.address.trim()) errors.address = copy.address;
    if (!values.description.trim()) errors.description = copy.description;
  }

  return errors;
}

export function buildQuoteIntakeMailtoUrl(
  values: QuoteIntakeValues,
  locale: Locale,
): string {
  const copy = handoffCopy[locale];
  const city = cityRoutes.find((item) => item.slug === values.municipality);
  const serviceLabel = values.service ? copy.services[values.service] : "—";
  const timelineLabel = values.timeline ? copy.timelines[values.timeline] : "—";
  const municipalityLabel = (city?.[locale] ?? values.municipality.trim()) || "—";
  const body = [
    `${copy.service}: ${serviceLabel}`,
    `${copy.timeline}: ${timelineLabel}`,
    `${copy.municipality}: ${municipalityLabel}`,
    `${copy.postalCode}: ${values.postalCode.trim().toUpperCase()}`,
    "",
    `${copy.fullName}: ${values.fullName.trim()}`,
    `${copy.phone}: ${values.phone.trim()}`,
    `${copy.email}: ${values.email.trim()}`,
    `${copy.address}: ${values.address.trim()}`,
    "",
    `${copy.description}:`,
    values.description.trim(),
    ...(values.fileNames.length > 0
      ? [
          "",
          `${copy.files}:`,
          ...values.fileNames.map((fileName) => `- ${fileName}`),
          "",
          copy.attachmentNotice,
        ]
      : []),
  ].join("\n");
  const subject = `${copy.subject} — ${serviceLabel}`;

  return `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
