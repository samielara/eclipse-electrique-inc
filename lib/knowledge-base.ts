import { cityPath, cityRoutes, type CityRoute } from "@/lib/city-routes";
import { pathFor, quotePath, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export type AssistantIntent =
  | "emergency"
  | "panel-ev"
  | "thermography"
  | "security"
  | "commercial-industrial"
  | "coverage"
  | "quote"
  | "licence"
  | "hours"
  | "general";

export type AssistantActionKind =
  | "emergency"
  | "quote"
  | "city"
  | "service-area"
  | "service";

export interface AssistantAction {
  kind: AssistantActionKind;
  label: string;
  href: string;
}

export interface AssistantReply {
  intent: AssistantIntent;
  locale: Locale;
  message: string;
  emergency: boolean;
  action?: AssistantAction;
  matchedCity?: CityRoute;
}

export interface AssistantQuickReply {
  id: "emergency" | "panel-ev" | "thermography" | "coverage" | "quote";
  label: string;
  value: string;
}

export const assistantBusinessFacts = {
  name: site.shortName,
  rbq: site.rbq,
  licensedSince: site.licensedSince,
  cmeqListingUrl: site.cmeqUrl,
  officePhone: site.officePhoneDisplay,
  emergencyPhone: site.emergencyPhoneDisplay,
  emergencyPhoneHref: "tel:5147179277",
  coveredCityCount: cityRoutes.length,
  emergencyAvailability: "24/7",
} as const;

const quickReplies: Record<Locale, readonly AssistantQuickReply[]> = {
  fr: [
    {
      id: "emergency",
      label: "🚨 Urgence électrique 24/7",
      value: "J’ai une urgence électrique active",
    },
    {
      id: "panel-ev",
      label: "⚡ Remplacement de panneau / Borne VE",
      value: "Je cherche un remplacement de panneau ou une borne VE",
    },
    {
      id: "thermography",
      label: "🔍 Thermographie infrarouge",
      value: "Je souhaite planifier une inspection par thermographie infrarouge",
    },
    {
      id: "coverage",
      label: "📍 Vérifier ma ville",
      value: "Je veux vérifier si ma ville est desservie",
    },
    {
      id: "quote",
      label: "📋 Obtenir une soumission",
      value: "Je souhaite obtenir une soumission",
    },
  ],
  en: [
    {
      id: "emergency",
      label: "🚨 24/7 electrical emergency",
      value: "I have an active electrical emergency",
    },
    {
      id: "panel-ev",
      label: "⚡ Panel replacement / EV charger",
      value: "I need a panel replacement or EV charger",
    },
    {
      id: "thermography",
      label: "🔍 Infrared thermography",
      value: "I want to schedule an infrared thermography inspection",
    },
    {
      id: "coverage",
      label: "📍 Check my city",
      value: "I want to check whether my city is covered",
    },
    {
      id: "quote",
      label: "📋 Request a quote",
      value: "I would like to request a quote",
    },
  ],
};

const copy = {
  fr: {
    greeting:
      "Bonjour! Je suis l’assistant automatique d’Éclipse électrique. Décrivez votre besoin ou choisissez une option ci-dessous.",
    hazard:
      "⚠️ Situation dangereuse : ne touchez à aucun équipement. Éloignez-vous de la zone. En présence de feu ou de fumée, quittez les lieux et composez le 911. Pour la répartition électrique d’urgence, appelez maintenant.",
    emergencyAction: "Appeler l’urgence · 514-717-9277",
    quote:
      "Je peux vous diriger vers la demande de soumission. Indiquez le type de bâtiment, les travaux, la municipalité et vos coordonnées; pour une urgence active, appelez plutôt la ligne 24/7.",
    quoteAction: "Commencer la demande",
    panelEv:
      "Pour un panneau ou une borne VE, précisez le service électrique actuel, le type de bâtiment, l’équipement visé et la municipalité. L’équipe confirmera la portée après examen de votre demande.",
    thermography:
      "La thermographie infrarouge permet d’observer les écarts thermiques d’une installation sous charge sans intervention destructive. Décrivez le bâtiment, les équipements à inspecter et l’objectif du rapport.",
    security:
      "Éclipse électrique publie des services liés aux systèmes d’alarme, à la détection incendie et aux raccordements de sécurité. Décrivez le bâtiment et le système concerné pour orienter la demande.",
    commercialIndustrial:
      "Pour un besoin commercial ou industriel, indiquez le type d’installation, l’équipement concerné, les contraintes d’exploitation et l’échéancier souhaité.",
    coverageFound: (city: string) =>
      `${city} figure dans le territoire publié. La disponibilité dépend de l’adresse précise et de la nature des travaux; l’équipe les confirmera avec vous.`,
    coverageFoundAction: (city: string) => `Voir les services à ${city}`,
    coverageAsk:
      "Écrivez le nom de votre municipalité ou arrondissement. Je le comparerai aux 50 secteurs publiés; l’équipe confirmera ensuite l’adresse précise et la portée des travaux.",
    coverageAction: "Consulter le territoire desservi",
    licence: `Éclipse électrique inc. détient la licence RBQ ${site.rbq}, délivrée en ${site.licensedSince}, et possède une fiche au répertoire de la CMEQ.`,
    licenceAction: "Consulter la fiche CMEQ",
    hours:
      "La ligne d’urgence électrique est disponible 24 h sur 24, 7 jours sur 7 au 514-717-9277. Les heures du bureau et la disponibilité pour un projet sont confirmées directement par l’équipe au 514-510-1112.",
    general:
      "Je peux vous aider à choisir un service, vérifier une ville publiée ou commencer une demande. Je fournis de l’orientation générale, jamais un diagnostic électrique à distance.",
  },
  en: {
    greeting:
      "Hello! I’m Éclipse électrique’s automated assistant. Describe what you need or choose an option below.",
    hazard:
      "⚠️ Dangerous situation: do not touch any equipment. Move away from the area. If you see fire or smoke, leave the premises and call 911. Call electrical emergency dispatch now.",
    emergencyAction: "Call emergency dispatch · 514-717-9277",
    quote:
      "I can take you to the quote request. Include the property type, work required, municipality and contact details; for an active emergency, call the 24/7 line instead.",
    quoteAction: "Start the request",
    panelEv:
      "For a panel or EV charger request, include the current electrical service, property type, equipment and municipality. The team will confirm scope after reviewing your request.",
    thermography:
      "Infrared thermography can reveal thermal differences in equipment under normal load without destructive testing. Describe the property, equipment to inspect and purpose of the report.",
    security:
      "Éclipse électrique publishes alarm, fire-detection and safety-system connection services. Describe the property and system involved so the request can be directed correctly.",
    commercialIndustrial:
      "For a commercial or industrial need, include the installation type, affected equipment, operational constraints and preferred timeline.",
    coverageFound: (city: string) =>
      `${city} is in the published service territory. Availability depends on the exact address and work required; the team will confirm both with you.`,
    coverageFoundAction: (city: string) => `View services in ${city}`,
    coverageAsk:
      "Enter your municipality or borough. I’ll compare it with the 50 published areas; the team will then confirm the exact address and scope of work.",
    coverageAction: "View the service area",
    licence: `Éclipse électrique inc. holds RBQ licence ${site.rbq}, issued in ${site.licensedSince}, and has a listing in the CMEQ directory.`,
    licenceAction: "View the CMEQ listing",
    hours:
      "The electrical emergency line is available 24 hours a day, 7 days a week at 514-717-9277. Office hours and project availability are confirmed directly by the team at 514-510-1112.",
    general:
      "I can help you choose a service, check a published city or begin a request. I provide general guidance, never a remote electrical diagnosis.",
  },
} as const;

const englishSignals = [
  "active",
  "alarm",
  "are",
  "breaker",
  "burning",
  "charger",
  "check",
  "city",
  "commercial",
  "cover",
  "do",
  "equipment",
  "electrical",
  "emergency",
  "fire",
  "get",
  "have",
  "i",
  "industrial",
  "inspection",
  "need",
  "outage",
  "panel",
  "please",
  "quote",
  "serve",
  "service",
  "smell",
  "smoke",
  "sparks",
  "there",
  "thermography",
  "water",
  "wiring",
  "would",
  "you",
] as const;

const frenchSignals = [
  "alarme",
  "borne",
  "brule",
  "commercial",
  "devis",
  "eau",
  "equipement",
  "etincelles",
  "fumee",
  "incendie",
  "industriel",
  "inspection",
  "je",
  "j",
  "cherche",
  "municipalite",
  "odeur",
  "panne",
  "panne active",
  "panneau",
  "pres",
  "soumission",
  "souhaite",
  "thermographie",
  "urgence",
  "urgence active",
  "ville",
  "vous",
] as const;

const hazardPatterns = [
  /\b(?:on fire|there is (?:a )?fire|flames?|electric(?:al)? shock|electrocut(?:ed|ion))\b/,
  /\b(?:feu|flammes?|choc electrique|electrocution|electrocute)\b/,
  /\b(?:spark|sparks|sparking)\b/,
  /\bburning smell\b/,
  /\bsmoke\b/,
  /\bsizzl(?:e|es|ing)\b/,
  /\bbuzzing (?:breaker|panel|outlet|wire|wiring)\b/,
  /\bwater (?:near|around|on) (?:a |the )?(?:breaker|outlet|panel|wire|wires|wiring)\b/,
  /\bactive (?:power )?outage\b/,
  /\betincell(?:e|es)\b/,
  /\bodeur (?:de )?brul(?:e|ee)\b/,
  /\bfumee\b/,
  /\b(?:crepitement|crepitements|gresillement|gresillements)\b/,
  /\beau (?:pres|proche|autour|sur) (?:du |de la |des )?(?:cablage|disjoncteur|fil|fils|panneau|prise)\b/,
  /\b(?:disjoncteur|panneau|prise) (?:qui )?(?:bourdonne|crepite|gresille)\b/,
  /\bpanne active\b/,
] as const;

const intentPatterns: Record<Exclude<AssistantIntent, "emergency" | "general">, readonly RegExp[]> = {
  "panel-ev": [
    /\b(?:electrical )?panel\b/,
    /\bpanel replacement\b/,
    /\bev charger\b/,
    /\bpanneau\b/,
    /\bborne (?:ve|electrique|de recharge)\b/,
  ],
  thermography: [
    /\bthermograph(?:y|ie)\b/,
    /\binfrared\b/,
    /\binfrarouge\b/,
    /\bthermal inspection\b/,
    /\binspection thermique\b/,
  ],
  security: [
    /\b(?:fire|intrusion) alarm\b/,
    /\bsecurity system\b/,
    /\balarme\b/,
    /\bincendie\b/,
    /\bintrusion\b/,
  ],
  "commercial-industrial": [
    /\bcommercial\b/,
    /\bindustrial\b/,
    /\bindustriel\b/,
    /\bthree phase\b/,
    /\btriphase\b/,
    /\btransformer\b/,
    /\btransformateur\b/,
  ],
  coverage: [
    /\b(?:check|cover|coverage|serve|service area)\b/,
    /\b(?:desserv|territoire|verifier|ville|municipalite|arrondissement)\w*\b/,
  ],
  quote: [
    /\b(?:quote|estimate|request)\b/,
    /\b(?:soumission|devis|estimation|demande)\b/,
  ],
  licence: [
    /\b(?:licence|license|licensed|rbq|cmeq)\b/,
    /\bmaitre electricien\b/,
    /\bmaster electrician\b/,
  ],
  hours: [
    /\b(?:hours|opening hours|open|closed|available|availability|when do you)\b/,
    /\b(?:heures|ouvert|ferme|disponibilite|disponible|quand)\b/,
  ],
};

const emergencyIntentPatterns = [
  /\b(?:electrical )?emergency\b/,
  /\burgence(?: electrique)?\b/,
  /\b24 7\b/,
] as const;

function hasPattern(value: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(value));
}

function countSignals(value: string, signals: readonly string[]): number {
  const padded = ` ${value} `;
  return signals.reduce(
    (score, signal) => score + (padded.includes(` ${signal} `) ? 1 : 0),
    0,
  );
}

export function normalizeAssistantText(value: string): string {
  return value
    .toLocaleLowerCase("fr-CA")
    .replaceAll("œ", "oe")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function detectAssistantLocale(
  input: string,
  routeLocale: Locale = "fr",
): Locale {
  const normalized = normalizeAssistantText(input);
  const englishScore = countSignals(normalized, englishSignals);
  const frenchScore = countSignals(normalized, frenchSignals);

  if (englishScore > frenchScore) return "en";
  if (frenchScore > englishScore) return "fr";
  return routeLocale;
}

const searchableCities = cityRoutes
  .flatMap((city) => {
    const variants = new Set([
      normalizeAssistantText(city.fr),
      normalizeAssistantText(city.en),
      normalizeAssistantText(city.slug.replaceAll("-", " ")),
    ]);
    return [...variants].map((variant) => ({ city, variant }));
  })
  .sort((left, right) => right.variant.length - left.variant.length);

export function findCoveredCity(input: string): CityRoute | undefined {
  const normalized = ` ${normalizeAssistantText(input)} `;
  return searchableCities.find(({ variant }) =>
    normalized.includes(` ${variant} `),
  )?.city;
}

export function getAssistantQuickReplies(
  locale: Locale,
): readonly AssistantQuickReply[] {
  return quickReplies[locale];
}

export function getAssistantGreeting(locale: Locale): string {
  return copy[locale].greeting;
}

function emergencyReply(locale: Locale): AssistantReply {
  return {
    intent: "emergency",
    locale,
    message: copy[locale].hazard,
    emergency: true,
    action: {
      kind: "emergency",
      label: copy[locale].emergencyAction,
      href: assistantBusinessFacts.emergencyPhoneHref,
    },
  };
}

function quoteAction(locale: Locale): AssistantAction {
  return {
    kind: "quote",
    label: copy[locale].quoteAction,
    href: quotePath(locale),
  };
}

export function getAssistantReply(
  input: string,
  routeLocale: Locale = "fr",
): AssistantReply {
  const normalized = normalizeAssistantText(input);
  const locale = detectAssistantLocale(input, routeLocale);
  const localized = copy[locale];

  if (hasPattern(normalized, hazardPatterns)) {
    return emergencyReply(locale);
  }

  if (hasPattern(normalized, emergencyIntentPatterns)) {
    return emergencyReply(locale);
  }

  const matchedCity = findCoveredCity(input);
  if (matchedCity) {
    const cityName = matchedCity[locale];
    return {
      intent: "coverage",
      locale,
      message: localized.coverageFound(cityName),
      emergency: false,
      matchedCity,
      action: {
        kind: "city",
        label: localized.coverageFoundAction(cityName),
        href: cityPath(locale, matchedCity.slug),
      },
    };
  }

  if (hasPattern(normalized, intentPatterns.quote)) {
    return {
      intent: "quote",
      locale,
      message: localized.quote,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.coverage)) {
    return {
      intent: "coverage",
      locale,
      message: localized.coverageAsk,
      emergency: false,
      action: {
        kind: "service-area",
        label: localized.coverageAction,
        href: pathFor("serviceArea", locale),
      },
    };
  }

  if (hasPattern(normalized, intentPatterns.thermography)) {
    return {
      intent: "thermography",
      locale,
      message: localized.thermography,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns["panel-ev"])) {
    return {
      intent: "panel-ev",
      locale,
      message: localized.panelEv,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.security)) {
    return {
      intent: "security",
      locale,
      message: localized.security,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns["commercial-industrial"])) {
    return {
      intent: "commercial-industrial",
      locale,
      message: localized.commercialIndustrial,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.licence)) {
    return {
      intent: "licence",
      locale,
      message: localized.licence,
      emergency: false,
      action: {
        kind: "service",
        label: localized.licenceAction,
        href: site.cmeqUrl,
      },
    };
  }

  if (hasPattern(normalized, intentPatterns.hours)) {
    return {
      intent: "hours",
      locale,
      message: localized.hours,
      emergency: false,
      action: { kind: "service", label: locale === "fr" ? "Appeler le bureau" : "Call the office", href: site.officePhoneHref },
    };
  }

  return {
    intent: "general",
    locale,
    message: localized.general,
    emergency: false,
  };
}
