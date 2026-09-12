import { cityPath, cityRoutes, type CityRoute } from "@/lib/city-routes";
import { pathFor, quotePath, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export type AssistantIntent =
  | "emergency"
  | "panel-ev"
  | "thermography"
  | "security"
  | "commercial-industrial"
  | "generators"
  | "residential-renovation"
  | "pricing"
  | "rebates"
  | "troubleshooting"
  | "services"
  | "greeting"
  | "thanks"
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
  quoteSteps: 4,
  coreServices: [
    "Panneau électrique & Borne VE",
    "Thermographie infrarouge",
    "Génératrices & transfert",
    "Rénovation résidentielle",
    "Commercial & Industriel",
    "Urgence électrique 24/7",
  ],
} as const;

const quickReplies: Record<Locale, readonly AssistantQuickReply[]> = {
  fr: [
    {
      id: "emergency",
      label: "🚨 Urgence électrique 24/7",
      value: "J’ai une urgence électrique immédiate",
    },
    {
      id: "panel-ev",
      label: "⚡ Remplacement de panneau / Borne VE",
      value: "Je veux remplacer un panneau électrique ou installer une borne VE",
    },
    {
      id: "thermography",
      label: "🔍 Thermographie infrarouge",
      value: "Je souhaite planifier une inspection par thermographie infrarouge",
    },
    {
      id: "coverage",
      label: "📍 Vérifier ma ville",
      value: "Pouvez-vous vérifier si ma ville est desservie?",
    },
    {
      id: "quote",
      label: "📋 Obtenir une soumission",
      value: "J’aimerais obtenir une soumission pour des travaux électriques",
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
      value: "I want to replace an electrical panel or install an EV charger",
    },
    {
      id: "thermography",
      label: "🔍 Infrared thermography",
      value: "I would like to book an infrared thermography inspection",
    },
    {
      id: "coverage",
      label: "📍 Check my city",
      value: "Can you confirm whether you serve my city?",
    },
    {
      id: "quote",
      label: "📋 Request a quote",
      value: "I would like to request an electrical quote",
    },
  ],
};

const copy = {
  fr: {
    greeting:
      "Bonjour ! Je suis votre conseiller technique chez Éclipse Électrique inc. Maîtres électriciens certifiés CMEQ et RBQ dans le Grand Montréal, nous intervenons pour vos panneaux électriques, bornes de recharge, génératrices, rénovations et urgences 24/7. Comment puis-je vous aider aujourd’hui ?",
    hazard:
      "⚠️ Situation dangereuse : ne touchez à aucun équipement. Éloignez-vous de la zone. En présence de feu ou de fumée, quittez les lieux et composez le 911. Pour la répartition électrique d’urgence, appelez maintenant.",
    emergencyAction: "Appeler l’urgence · 514-717-9277",
    quote:
      "Je peux vous diriger vers la demande de soumission en 4 étapes. Précisez le type de bâtiment, les travaux prévus, votre municipalité et vos coordonnées. En cas d’urgence active, composez plutôt la ligne 24/7.",
    quoteAction: "Commencer la demande",
    pricing:
      "Chez Éclipse Électrique, nous misons sur une tarification transparente sans frais cachés. Le coût précis dépend de la capacité de votre panneau existant, de la distance de câblage et des normes d'Hydro-Québec. Remplissez notre formulaire d’estimation rapide pour recevoir une proposition détaillée de nos maîtres électriciens.",
    rebates:
      "Au Québec, profitez des programmes de subventions ! Le programme 'Roulez Vert' offre jusqu'à 600 $ de remboursement pour l'achat et l'installation d'une borne de recharge résidentielle par un maître électricien certifié. Nous vous fournissons la facture détaillée conforme pour votre réclamation.",
    panelEv:
      "Pour le remplacement de panneau (100A vers 200A) ou l'installation de borne de recharge pour véhicule électrique (Tesla Wall Connector, FLO, ChargePoint), nos maîtres électriciens effectuent le calcul de charge, le câblage dédié 240V et la coordination avec Hydro-Québec. Les bornes résidentielles sont admissibles à la subvention Roulez Vert de 600 $.",
    generators:
      "Nous installons et entretenons des génératrices automatiques de secours (telles que Generac) ainsi que des commutateurs de transfert manuel. Ces systèmes assurent une alimentation continue de vos circuits essentiels lors des pannes de réseau ou tempêtes.",
    residentialRenovation:
      "Pour vos projets de rénovation résidentielle (cuisine, salle de bain, sous-sol, éclairage encastré LED ou mise aux normes du filage), nos maîtres électriciens certifiés vous garantissent une installation sécuritaire, propre et conforme au Code de l’électricité du Québec.",
    troubleshooting:
      "Si un disjoncteur saute fréquemment ou qu'une prise ne fonctionne plus sans signe de danger immédiat, vérifiez d'abord si une prise DCL (GFCI) en amont a déclenché. Si le problème persiste, évitez de manipuler le câblage et laissez un maître électricien certifié inspecter et diagnostiquer le circuit en toute sécurité.",
    services:
      "Nous offrons 6 services certifiés de maître électricien dans le Grand Montréal :\n\n• **Électricité résidentielle** : Remplacement de panneau (100A à 200A), filage, éclairage et rénovations\n• **Bornes de recharge pour VE** : Installation certifiée admissible à la subvention Roulez Vert de 600 $\n• **Commercial et industriel** : Distribution 600V, raccordement de machinerie et maintenance\n• **Thermographie infrarouge** : Inspection thermique préventive sans coupure et rapports pour assurances\n• **Génératrices d’urgence** : Systèmes d’alimentation de secours automatiques et commutateurs de transfert\n• **Urgence électrique 24/7** : Ligne d’intervention rapide pour pannes et défaillances (514-717-9277)",
    servicesAction: "Consulter tous nos services",
    thermography:
      "La thermographie infrarouge permet d’examiner les composants électriques sous charge normale sans interruption de service. Décrivez le bâtiment, les équipements à vérifier et l’objectif du rapport (ex. exigence d'assurance).",
    security:
      "Éclipse électrique inc. raccorde des systèmes d’alarme incendie, d'intrusion et de sécurité électrique. Précisez la nature de l’installation afin de diriger votre demande vers nos spécialistes.",
    commercialIndustrial:
      "Pour vos installations commerciales ou industrielles (distribution 600V, transformateurs, moteurs, maintenance préventive), mentionnez les équipements concernés, les contraintes d’exploitation et l'échéancier souhaité.",
    coverageFound: (city: string) =>
      `${city} figure dans le territoire publié. La disponibilité dépend de l’adresse précise et de la nature des travaux; l’équipe les confirmera avec vous.`,
    coverageFoundAction: (city: string) => `Voir les services à ${city}`,
    coverageAsk:
      "Écrivez le nom de votre municipalité ou arrondissement. Je le comparerai aux 50 secteurs publiés; l’équipe confirmera ensuite l’adresse précise et la portée des travaux.",
    coverageAction: "Consulter le territoire desservi",
    licence: `Éclipse électrique inc. détient la licence RBQ ${site.rbq}, délivrée en ${site.licensedSince}, et possède une fiche au répertoire de la CMEQ.`,
    licenceAction: "Consulter la fiche CMEQ",
    hours:
      "**Heures d'ouverture et de service :**\n\n• **Urgence électrique 24/7** : Disponible 24 h sur 24, 7 jours sur 7 (soirs, week-ends et jours fériés) au **514-717-9277**.\n• **Bureau et projets réguliers (Semaine)** : Du lundi au vendredi de 7 h 00 à 17 h 00 au **514-510-1112**.\n• **Fin de semaine (Samedi et Dimanche)** : Équipe d'urgence active 24/7; consultations et soumissions planifiées sur rendez-vous.",
    hoursAction: "Appeler le bureau · 514-510-1112",
    thanks:
      "C’est un grand plaisir de vous aider ! Si vous avez besoin d’autres renseignements ou si vous souhaitez planifier des travaux avec nos maîtres électriciens, nous sommes toujours à votre écoute.",
    greetingResponse:
      "Bonjour ! Comment puis-je vous aider aujourd’hui pour vos travaux ou vos urgences électriques dans le Grand Montréal?",
    general:
      "Je peux vous aider à choisir un service, vérifier une ville publiée ou commencer une demande. Je fournis de l’orientation générale, jamais un diagnostic électrique à distance.",
  },
  en: {
    greeting:
      "Hello! I’m your technical advisor at Éclipse Électrique Inc. As certified master electricians (CMEQ & RBQ) in Greater Montreal, we handle electrical panel upgrades, EV chargers, generators, renovations, and 24/7 emergency dispatch. How can I help you today?",
    hazard:
      "⚠️ Dangerous situation: do not touch any equipment. Move away from the area. If you see fire or smoke, leave the premises and call 911. Call electrical emergency dispatch now.",
    emergencyAction: "Call emergency dispatch · 514-717-9277",
    quote:
      "I can take you to the 4-step quote request. Include the property type, work required, municipality and contact details; for an active emergency, call the 24/7 line instead.",
    quoteAction: "Start the request",
    pricing:
      "At Éclipse Électrique, we believe in complete pricing transparency with zero hidden fees. Exact costs depend on your existing panel capacity, wiring distance, and Hydro-Québec code requirements. You can submit our quick, free estimate form to receive an accurate, detailed proposal from our master electricians.",
    rebates:
      "In Québec, you can take advantage of valuable financial rebates! Notably, the provincial 'Roulez Vert' program offers up to a $600 rebate on the purchase and certified master electrician installation of an eligible home EV charging station. We provide the compliant detailed invoice required for your claim.",
    panelEv:
      "For an electrical panel replacement (upgrade from 100A to 200A) or an EV charger installation (Tesla Wall Connector, FLO, ChargePoint), our certified master electricians perform the load calculation, run dedicated 240V wiring, and coordinate with Hydro-Québec. Home charger installations are eligible for Québec's $600 Roulez Vert rebate.",
    generators:
      "We install and service automatic standby generators (such as Generac) as well as manual transfer switches. These systems guarantee reliable backup power for your essential circuits during storm outages or network interruptions.",
    residentialRenovation:
      "For your home renovations (kitchens, bathrooms, basements, recessed LED lighting, or replacing legacy wiring), our master electricians guarantee tidy, safe craftsmanship fully compliant with the Québec Electrical Code.",
    troubleshooting:
      "If a breaker repeatedly trips or an outlet loses power without immediate hazard signs, first check if an upstream GFCI outlet tripped. If the issue persists, avoid touching internal wiring and let a certified master electrician safely inspect and diagnose the issue.",
    services:
      "We provide 6 certified master electrician services across Greater Montreal:\n\n• **Residential Electrical**: Panel upgrades (100A to 200A), rewiring, lighting & renovations\n• **EV Charging Stations**: Turnkey installation eligible for the $600 Roulez Vert rebate\n• **Commercial & Industrial**: 600V power distribution, transformer connections & machinery wiring\n• **Infrared Thermography**: Non-invasive thermal scans & insurance compliance reports\n• **Generators & Transfer Switches**: Automatic standby backup systems for storm outages\n• **24/7 Emergency Dispatch**: Rapid intervention for electrical failures and hazards (514-717-9277)",
    servicesAction: "Explore our services",
    thermography:
      "Infrared thermography can reveal thermal differences in equipment under normal load without destructive testing. Describe the property, equipment to inspect and purpose of the report.",
    security:
      "Éclipse électrique publishes alarm, fire-detection and safety-system connection services. Describe the property and system involved so our master electricians can direct your request correctly.",
    commercialIndustrial:
      "For a commercial or industrial need (600V distribution, transformers, motors, preventative maintenance), include the installation type, affected equipment, operational constraints and preferred timeline.",
    coverageFound: (city: string) =>
      `${city} is in the published service territory. Availability depends on the exact address and work required; the team will confirm both with you.`,
    coverageFoundAction: (city: string) => `View services in ${city}`,
    coverageAsk:
      "Enter your municipality or borough. I’ll compare it with the 50 published areas; the team will then confirm the exact address and scope of work.",
    coverageAction: "View the service area",
    licence: `Éclipse électrique inc. holds RBQ licence ${site.rbq}, issued in ${site.licensedSince}, and has a listing in the CMEQ directory.`,
    licenceAction: "View the CMEQ listing",
    hours:
      "**Opening & Service Hours:**\n\n• **24/7 Emergency Dispatch**: Open 24 hours a day, 7 days a week (weekdays, weekends & holidays) at **514-717-9277**.\n• **Office & Regular Projects (Weekdays)**: Monday to Friday from 7:00 AM to 5:00 PM at **514-510-1112**.\n• **Weekends (Saturday & Sunday)**: Emergency crew is active 24/7; planned appointments and consultations are scheduled by appointment.",
    hoursAction: "Call the office · 514-510-1112",
    thanks:
      "You’re very welcome! If you need any more information or would like to schedule an appointment with our master electricians, we’re always here to assist.",
    greetingResponse:
      "Hello! How can I help you today with your electrical projects or emergencies across Greater Montreal?",
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
  "cost",
  "costs",
  "cover",
  "do",
  "equipment",
  "electrical",
  "emergency",
  "fee",
  "fees",
  "fire",
  "generator",
  "generators",
  "get",
  "grant",
  "have",
  "hello",
  "hey",
  "hi",
  "how",
  "i",
  "industrial",
  "inspection",
  "kitchen",
  "need",
  "outage",
  "panel",
  "please",
  "price",
  "prices",
  "pricing",
  "quote",
  "rate",
  "rates",
  "rebate",
  "rebates",
  "renovation",
  "renovations",
  "serve",
  "service",
  "smell",
  "smoke",
  "sparks",
  "subsidy",
  "thank",
  "thanks",
  "there",
  "thermography",
  "water",
  "wiring",
  "would",
  "you",
] as const;

const frenchSignals = [
  "alarme",
  "allo",
  "bonjour",
  "bonsoir",
  "borne",
  "brule",
  "commercial",
  "combien",
  "cout",
  "couts",
  "cuisine",
  "devis",
  "eau",
  "equipement",
  "estimation",
  "etincelles",
  "frais",
  "fumee",
  "generatrice",
  "generatrices",
  "incendie",
  "industriel",
  "inspection",
  "je",
  "j",
  "cherche",
  "merci",
  "municipalite",
  "odeur",
  "panne",
  "panne active",
  "panneau",
  "pres",
  "prix",
  "rabais",
  "renovation",
  "renovations",
  "salut",
  "soumission",
  "souhaite",
  "subvention",
  "subventions",
  "tarif",
  "tarifs",
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
  pricing: [
    /\b(?:pricing|price|prices|cost|costs|rate|rates|how much|fee|fees)\b/,
    /\b(?:prix|tarif|tarifs|cout|couts|combien|frais)\b/,
  ],
  rebates: [
    /\b(?:rebate|rebates|subsidy|subsidies|grant|grants|roulez vert|financial aid|hydro quebec rebate)\b/,
    /\b(?:subvention|subventions|rabais|aide financiere|roulez vert|programme)\b/,
  ],
  generators: [
    /\b(?:generator|generators|standby generator|backup power|transfer switch|generac)\b/,
    /\b(?:generatrice|generatrices|groupe electrogene|commutateur de transfert|generac)\b/,
  ],
  "residential-renovation": [
    /\b(?:renovation|renovations|remodel|remodeling|kitchen|bathroom|basement|pot light|pot lights|recessed light|recessed lights|rewiring)\b/,
    /\b(?:renovation|renovations|reno|cuisine|salle de bain|sous sol|encastre|encastres|remplacement de filage)\b/,
  ],
  troubleshooting: [
    /\b(?:troubleshoot|troubleshooting|tripping|trips|breaker trips|no power|outlet not working|gfci|dead outlet)\b/,
    /\b(?:depannage|disjoncteur saute|disjoncteur declenche|plus de courant|prise ne fonctionne pas|disjoncteur dcl|dcl|reinitialiser)\b/,
  ],
  greeting: [
    /\b(?:hello|hi|hey|good morning|good afternoon|good evening)\b/,
    /\b(?:bonjour|bonsoir|salut|allo)\b/,
  ],
  thanks: [
    /\b(?:thank|thanks|thank you|appreciate)\b/,
    /\b(?:merci|merci beaucoup|remercie|parfait merci)\b/,
  ],
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
  services: [
    /\b(?:what|which|how many|all|list of|our|your)\s+(?:services?|electrical services?)\b/,
    /\b(?:services? offered|services? you offer|offer(?:ed)? services?|services? available|type of services?|kinds? of services?)\b/,
    /\b(?:services? list|available services?)\b/,
    /\b(?:how many|what)\s+services\b/,
    /\bservices\b/,
    /\b(?:quels?|combien de|vos|liste des?|nos|offrez|proposez)\s+(?:services?|services? electriques?)\b/,
    /\b(?:services? offerts?|services? disponibles?|types? de services?)\b/,
  ],
  hours: [
    /\b(?:hours|opening hours|business hours|opening|closing|open and close|open|closed|what time|schedule|availability|available|weekday|weekdays|weekend|weekends)\b/,
    /\b(?:heures|horaire|horaires|ouverture|fermeture|ouvert|ferme|disponibilite|disponible|semaine|fin de semaine|week end|weekend|quand ouvrez|a quelle heure)\b/,
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

  if (hasPattern(normalized, intentPatterns.pricing)) {
    return {
      intent: "pricing",
      locale,
      message: localized.pricing,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.rebates)) {
    return {
      intent: "rebates",
      locale,
      message: localized.rebates,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.services)) {
    return {
      intent: "services",
      locale,
      message: localized.services,
      emergency: false,
      action: {
        kind: "service",
        label: localized.servicesAction,
        href: pathFor("services", locale),
      },
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

  if (hasPattern(normalized, intentPatterns.generators)) {
    return {
      intent: "generators",
      locale,
      message: localized.generators,
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

  if (hasPattern(normalized, intentPatterns["residential-renovation"])) {
    return {
      intent: "residential-renovation",
      locale,
      message: localized.residentialRenovation,
      emergency: false,
      action: quoteAction(locale),
    };
  }

  if (hasPattern(normalized, intentPatterns.troubleshooting)) {
    return {
      intent: "troubleshooting",
      locale,
      message: localized.troubleshooting,
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
      action: { kind: "service", label: localized.hoursAction, href: site.officePhoneHref },
    };
  }

  if (hasPattern(normalized, intentPatterns.thanks)) {
    return {
      intent: "thanks",
      locale,
      message: localized.thanks,
      emergency: false,
    };
  }

  if (hasPattern(normalized, intentPatterns.greeting)) {
    return {
      intent: "greeting",
      locale,
      message: localized.greetingResponse,
      emergency: false,
    };
  }

  return {
    intent: "general",
    locale,
    message: localized.general,
    emergency: false,
  };
}
