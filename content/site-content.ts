import type { Locale, PageId, ServicePageId } from "@/lib/routes";

export interface SeoCopy {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocalizedPage {
  seo: SeoCopy;
  eyebrow: string;
  title: string;
  intro: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  faq?: readonly FaqItem[];
  related?: readonly ServicePageId[];
}

export interface RegionCopy {
  name: string;
  description: string;
  cities: readonly string[];
}

export type SectorId =
  | "residential"
  | "commercialIndustrial"
  | "thermography"
  | "security";

export interface SectorMatrixCopy {
  eyebrow: string;
  title: string;
  intro: string;
  tablistLabel: string;
  viewDetails: string;
  secondaryLinkLabel: string;
  tabs: readonly {
    id: SectorId;
    label: string;
    secondaryLabel: string;
    title: string;
    intro: string;
    items: readonly string[];
    route: ServicePageId;
    secondaryRoute?: ServicePageId;
  }[];
}

export interface ThermographyProofCopy {
  eyebrow: string;
  title: string;
  intro: string;
  pillarCountLabel: string;
  cta: string;
  ctaNote: string;
  pillars: readonly {
    title: string;
    secondaryTitle: string;
    description: string;
    metric: string;
    proof: string;
  }[];
}

export interface LocaleContent {
  languageName: string;
  alternateLanguageName: string;
  nav: {
    services: string;
    serviceArea: string;
    about: string;
    faq: string;
    contact: string;
    menu: string;
  };
  actions: {
    quote: string;
    emergency: string;
    office: string;
    email: string;
    exploreServices: string;
    learnMore: string;
    checkArea: string;
    allQuestions: string;
  };
  home: {
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    trustBadges: readonly { label: string; value: string }[];
    capabilitiesEyebrow: string;
    capabilitiesTitle: string;
    capabilitiesIntro: string;
    capabilities: readonly { title: string; items: readonly string[] }[];
    sectorMatrix: SectorMatrixCopy;
    thermographyProof: ThermographyProofCopy;
    processEyebrow: string;
    processTitle: string;
    processIntro: string;
    territoryEyebrow: string;
    territoryTitle: string;
    territoryIntro: string;
    trust: readonly string[];
  };
  process: readonly { title: string; description: string }[];
  regions: readonly RegionCopy[];
  regionNote: string;
  servicesSectionLabel: string;
  relatedServices: string;
  offeredWork: string;
  commonFaqTitle: string;
  contact: {
    office: string;
    emergency: string;
    email: string;
    territory: string;
    territoryValue: string;
    formTitle: string;
    formIntro: string;
    emergencyNote: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      service: string;
      location: string;
      message: string;
      chooseService: string;
    };
    prepare: string;
    formNotice: string;
    requiredError: string;
    replyError: string;
    errorSummary: string;
    emailSubject: string;
  };
  footer: {
    summary: string;
    credentials: string;
    navigation: string;
    services: string;
    contact: string;
    privacy: string;
    rights: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  pages: Record<PageId, LocalizedPage>;
}

const frenchServiceFaq: Record<ServicePageId, readonly FaqItem[]> = {
  residential: [
    {
      question: "Quels bâtiments résidentiels desservez-vous?",
      answer:
        "Nous discutons de travaux pour des maisons, des condos et des immeubles résidentiels dans le Grand Montréal, sur la Rive-Nord et sur la Rive-Sud.",
    },
    {
      question: "Pouvez-vous remplacer un panneau électrique?",
      answer:
        "Le remplacement et la mise à niveau de panneaux font partie des services résidentiels publiés. Communiquez avec nous pour décrire l’installation actuelle et les travaux envisagés.",
    },
    {
      question: "Comment démarrer une demande?",
      answer:
        "Appelez le bureau ou préparez un courriel en précisant le bâtiment, l’emplacement et la nature des travaux. Pour une situation urgente, utilisez la ligne d’urgence.",
    },
  ],
  commercial: [
    {
      question: "Quels espaces commerciaux desservez-vous?",
      answer:
        "Les services publiés couvrent notamment les bureaux, boutiques, restaurants et autres espaces commerciaux, pour des installations neuves, des rénovations et de l’entretien.",
    },
    {
      question: "Offrez-vous des travaux de câblage et de contrôle?",
      answer:
        "Oui. Le câblage de données, de téléphone, d’audio et de vidéo, ainsi que certains contrôles d’éclairage et systèmes de bâtiment, figurent dans l’offre commerciale publiée.",
    },
    {
      question: "Pouvez-vous discuter d’un entretien récurrent?",
      answer:
        "Présentez-nous le bâtiment, les équipements concernés et la fréquence recherchée afin que l’équipe puisse discuter de la demande avec vous.",
    },
  ],
  industrial: [
    {
      question: "Intervenez-vous sur des équipements industriels?",
      answer:
        "L’installation et le raccordement de machinerie font partie des services industriels publiés. Chaque demande doit être précisée selon le site et l’équipement.",
    },
    {
      question: "Offrez-vous du dépannage industriel?",
      answer:
        "Le diagnostic, le dépannage, la réparation et l’entretien font partie des capacités publiées. Appelez pour expliquer la situation et les équipements touchés.",
    },
    {
      question: "Dans quelles régions travaillez-vous?",
      answer:
        "L’entreprise publie une couverture du Grand Montréal, de la Rive-Nord et de la Rive-Sud. Confirmez toujours l’emplacement précis au moment de la demande.",
    },
  ],
  maintenance: [
    {
      question: "Comment joindre la ligne d’urgence?",
      answer:
        "Appelez directement le 514-717-9277. La suite est coordonnée selon la nature de la situation et les conditions au moment de l’appel.",
    },
    {
      question: "Le site garantit-il un délai d’arrivée?",
      answer:
        "Non. Aucun délai de réponse n’est promis en ligne. L’équipe recueille les renseignements nécessaires et discute des prochaines étapes selon la situation.",
    },
    {
      question: "Offrez-vous aussi de l’entretien non urgent?",
      answer:
        "Oui. Vous pouvez communiquer avec le bureau pour discuter d’inspection, de diagnostic, de réparation ou d’entretien électrique.",
    },
  ],
  generators: [
    {
      question: "Installez-vous et réparez-vous des génératrices?",
      answer:
        "Oui. L’installation et la réparation de génératrices font partie des services publiés d’Éclipse électrique inc.",
    },
    {
      question: "Quelles marques prenez-vous en charge?",
      answer:
        "Ce site ne publie aucune autorisation de fabricant. Indiquez la marque, le modèle et le besoin lorsque vous communiquez avec l’équipe.",
    },
    {
      question: "Quels renseignements fournir?",
      answer:
        "Précisez le type de bâtiment, l’emplacement, l’équipement existant et si la demande concerne une installation, un diagnostic ou une réparation.",
    },
  ],
  thermography: [
    {
      question: "Que permet une inspection par thermographie infrarouge?",
      answer:
        "Une lecture thermique non destructive aide à repérer des anomalies comme des échauffements, des surcharges ou des connexions à vérifier avant une panne.",
    },
    {
      question: "L’analyse doit-elle interrompre les activités?",
      answer:
        "L’analyse peut être planifiée dans les conditions normales d’utilisation de l’installation, selon le périmètre convenu avec l’équipe.",
    },
    {
      question: "Recevons-nous un rapport pour notre assureur?",
      answer:
        "Les livrables et les exigences de votre assureur sont confirmés avant l’intervention afin de définir le rapport technique approprié.",
    },
  ],
  security: [
    {
      question: "Quels systèmes de sécurité pouvez-vous raccorder?",
      answer:
        "Les capacités publiées comprennent des systèmes d’alarme, d’incendie et de surveillance. Décrivez le bâtiment et le système à raccorder pour confirmer la portée.",
    },
    {
      question: "Intervenez-vous en rénovation comme en construction neuve?",
      answer:
        "Les travaux de construction neuve et de rénovation figurent dans l’offre publiée. La compatibilité et les exigences du bâtiment sont vérifiées au moment de la demande.",
    },
    {
      question: "Comment démarrer une demande de sécurité?",
      answer:
        "Indiquez le type de bâtiment, le système existant et le besoin recherché. L’équipe pourra discuter des prochaines étapes avec vous.",
    },
  ],
};

const englishServiceFaq: Record<ServicePageId, readonly FaqItem[]> = {
  residential: [
    {
      question: "What residential properties do you serve?",
      answer:
        "We discuss work for houses, condos and residential buildings across Greater Montréal, the North Shore and the South Shore.",
    },
    {
      question: "Can you replace an electrical panel?",
      answer:
        "Panel replacement and service upgrades are among the published residential services. Contact us with details about the current installation and planned work.",
    },
    {
      question: "How do I start a request?",
      answer:
        "Call the office or prepare an email with the property type, location and work required. For an urgent situation, use the emergency line.",
    },
  ],
  commercial: [
    {
      question: "What commercial spaces do you serve?",
      answer:
        "Published services include offices, retail spaces, restaurants and other commercial properties for new installations, renovations and maintenance.",
    },
    {
      question: "Do you provide cabling and control work?",
      answer:
        "Yes. Published commercial services include data, telephone, audio and video cabling, along with selected lighting controls and building systems.",
    },
    {
      question: "Can we discuss recurring maintenance?",
      answer:
        "Tell us about the property, affected equipment and desired frequency so the team can discuss the request with you.",
    },
  ],
  industrial: [
    {
      question: "Do you work with industrial equipment?",
      answer:
        "Machinery installation and connection are among the published industrial services. Each request must be reviewed in the context of the site and equipment.",
    },
    {
      question: "Do you provide industrial troubleshooting?",
      answer:
        "Published capabilities include diagnosis, troubleshooting, repair and maintenance. Call with details about the condition and affected equipment.",
    },
    {
      question: "Which regions do you serve?",
      answer:
        "The company publishes coverage across Greater Montréal, the North Shore and the South Shore. Always confirm the exact location when requesting service.",
    },
  ],
  maintenance: [
    {
      question: "How do I reach the emergency line?",
      answer:
        "Call 514-717-9277 directly. Next steps are coordinated according to the situation and conditions at the time of the call.",
    },
    {
      question: "Does the website guarantee an arrival time?",
      answer:
        "No. The website does not promise a response time. The team gathers the necessary information and discusses the next steps based on the situation.",
    },
    {
      question: "Do you also provide non-urgent maintenance?",
      answer:
        "Yes. Contact the office to discuss electrical inspection, diagnosis, repair or maintenance needs.",
    },
  ],
  generators: [
    {
      question: "Do you install and repair generators?",
      answer:
        "Yes. Generator installation and repair are among the services published by Éclipse électrique inc.",
    },
    {
      question: "Which brands do you service?",
      answer:
        "This site does not claim manufacturer authorization. Include the brand, model and requested service when contacting the team.",
    },
    {
      question: "What information should I provide?",
      answer:
        "Include the property type, location, existing equipment and whether you need installation, diagnosis or repair.",
    },
  ],
  thermography: [
    {
      question: "What does infrared thermography inspection reveal?",
      answer:
        "A non-destructive thermal reading can help identify anomalies such as hot spots, overloads or connections that should be checked before a failure.",
    },
    {
      question: "Does the analysis require an interruption?",
      answer:
        "The analysis can be planned in the installation’s normal operating conditions, according to the scope agreed with the team.",
    },
    {
      question: "Can we receive a report for our insurer?",
      answer:
        "Deliverables and your insurer’s requirements are confirmed before the visit so the appropriate technical report can be defined.",
    },
  ],
  security: [
    {
      question: "Which security systems can you connect?",
      answer:
        "Published capabilities include alarm, fire and surveillance systems. Share the property and system details so the scope can be confirmed.",
    },
    {
      question: "Do you work on renovations and new construction?",
      answer:
        "New construction and renovation work are part of the published offer. Compatibility and building requirements are reviewed with each request.",
    },
    {
      question: "How do we start a security request?",
      answer:
        "Include the property type, existing system and requested outcome. The team can then discuss the next steps with you.",
    },
  ],
};

const frenchPages: Record<PageId, LocalizedPage> = {
  home: {
    seo: {
      title: "Électricien à Montréal | Éclipse électrique",
      description:
        "Services électriques résidentiels, commerciaux et industriels dans le Grand Montréal, avec entretien, thermographie infrarouge, alarmes et génératrices.",
    },
    eyebrow: "Entrepreneur électricien à Montréal",
    title:
      "Des services électriques fiables, du résidentiel à l’industriel",
    intro:
      "Éclipse électrique inc. dessert le Grand Montréal, la Rive-Nord et la Rive-Sud pour des travaux électriques, de l’entretien, des urgences, de la thermographie infrarouge et des systèmes de sécurité.",
  },
  services: {
    seo: {
      title: "Services électriques à Montréal | Éclipse électrique",
      description:
        "Explorez les services résidentiels, commerciaux, industriels, de thermographie, d’alarme, d’entretien, d’urgence et de génératrices dans le Grand Montréal.",
    },
    eyebrow: "Services électriques",
    title: "Un seul point de contact pour différents besoins électriques",
    intro:
      "Qu’il s’agisse d’une maison, d’un espace commercial ou d’une installation industrielle, présentez-nous les travaux à planifier ou la situation à corriger.",
  },
  residential: {
    seo: {
      title: "Électricien résidentiel à Montréal | Éclipse électrique",
      description:
        "Services électriques pour maisons, condos et immeubles résidentiels à Montréal, sur la Rive-Nord et sur la Rive-Sud.",
    },
    eyebrow: "Résidentiel",
    title: "Services électriques résidentiels dans le Grand Montréal",
    intro:
      "Éclipse électrique inc. accompagne les propriétaires et gestionnaires pour des travaux électriques dans les maisons, condos et immeubles résidentiels.",
    paragraphs: [
      "Décrivez l’installation actuelle, les travaux envisagés et l’emplacement. L’équipe pourra discuter de la portée de votre demande et des prochaines étapes.",
    ],
    items: [
      "Construction neuve et rénovations",
      "Entrées de service et panneaux électriques",
      "Éclairage intérieur et extérieur",
      "Chauffage électrique et planchers chauffants",
      "Domotique, contrôles et maison intelligente",
      "Câblage de données, téléphone, audio et vidéo",
      "Systèmes de sécurité, d’incendie et de surveillance",
      "Travaux électriques pour piscines, spas et aménagements extérieurs",
      "Installation et réparation de génératrices",
    ],
    faq: frenchServiceFaq.residential,
    related: ["generators", "maintenance"],
  },
  commercial: {
    seo: {
      title: "Électricien commercial à Montréal | Éclipse électrique",
      description:
        "Travaux électriques pour bureaux, commerces, restaurants et autres espaces commerciaux du Grand Montréal.",
    },
    eyebrow: "Commercial",
    title: "Des installations électriques adaptées aux espaces commerciaux",
    intro:
      "Nous discutons de projets électriques pour commerces, bureaux, restaurants et autres lieux à vocation commerciale dans le Grand Montréal.",
    paragraphs: [
      "Chaque demande est évaluée selon la nature des travaux, le bâtiment, les équipements concernés et les conditions du site.",
    ],
    items: [
      "Nouvelles installations et réaménagements",
      "Entrées de service et panneaux électriques",
      "Éclairage intérieur, extérieur et contrôles",
      "Mesures d’efficacité énergétique du bâtiment",
      "Câblage structuré de données, téléphone, audio et vidéo",
      "Éclairage d’urgence, alarmes incendie, interphone et accès",
      "Systèmes de sécurité et de surveillance",
      "UPS et génératrices",
    ],
    faq: frenchServiceFaq.commercial,
    related: ["maintenance", "industrial"],
  },
  industrial: {
    seo: {
      title: "Électricien industriel à Montréal | Éclipse électrique",
      description:
        "Services électriques, raccordement de machinerie, dépannage et entretien pour environnements industriels du Grand Montréal.",
    },
    eyebrow: "Industriel",
    title: "Services électriques pour les environnements industriels",
    intro:
      "Éclipse électrique inc. discute de travaux électriques, d’entretien et de dépannage pour les installations industrielles du Grand Montréal.",
    paragraphs: [
      "Précisez le site, les équipements concernés et la nature des travaux afin que la demande puisse être examinée dans son contexte.",
    ],
    items: [
      "Entrées et distribution électriques",
      "Panneaux, éclairage et contrôles",
      "Installation et raccordement de machinerie",
      "Câblage structuré et systèmes de bâtiment",
      "UPS et génératrices",
      "Diagnostic, réparation et entretien",
    ],
    faq: frenchServiceFaq.industrial,
    related: ["maintenance", "commercial"],
  },
  maintenance: {
    seo: {
      title: "Entretien et urgence électrique Montréal | Éclipse électrique",
      description:
        "Diagnostic, dépannage, réparation et entretien électrique, avec une ligne d’urgence accessible en tout temps au 514-717-9277.",
    },
    eyebrow: "Ligne d’urgence 24/7",
    title: "Une urgence électrique? Appelez-nous directement.",
    intro:
      "Pour une demande urgente, appelez Éclipse électrique inc. au 514-717-9277. Nous recueillerons les renseignements nécessaires afin de coordonner la suite selon la situation.",
    paragraphs: [
      "Pour un besoin non urgent, communiquez avec le bureau afin de discuter d’entretien, d’inspection, de diagnostic ou de réparation électrique.",
    ],
    items: [
      "Inspection et évaluation de la situation",
      "Diagnostic et dépannage",
      "Réparation électrique",
      "Entretien résidentiel, commercial et industriel",
      "Études d’éclairage et analyse énergétique",
      "Solutions adaptées au bâtiment et aux équipements",
    ],
    faq: frenchServiceFaq.maintenance,
    related: ["residential", "commercial", "industrial"],
  },
  generators: {
    seo: {
      title: "Installation et réparation de génératrices | Éclipse électrique",
      description:
        "Services d’installation, de diagnostic et de réparation de génératrices dans le Grand Montréal, sur la Rive-Nord et sur la Rive-Sud.",
    },
    eyebrow: "Alimentation de secours",
    title: "Installation et réparation de génératrices",
    intro:
      "Éclipse électrique inc. offre des services liés aux génératrices pour des besoins résidentiels, commerciaux et industriels.",
    paragraphs: [
      "Communiquez avec l’équipe en précisant l’équipement, le bâtiment, l’emplacement et si la demande concerne une installation ou une réparation.",
    ],
    items: [
      "Génératrices de secours et portatives",
      "Commutateurs de transfert et raccordements",
      "Diagnostic, entretien et réparation",
      "Équipement de secours commercial",
    ],
    faq: frenchServiceFaq.generators,
    related: ["residential", "maintenance"],
  },
  thermography: {
    seo: {
      title: "Thermographie infrarouge à Montréal | Éclipse électrique",
      description:
        "Inspection électrique par thermographie infrarouge pour repérer les échauffements, documenter les installations et prévenir les arrêts dans le Grand Montréal.",
    },
    eyebrow: "Thermographie infrarouge",
    title: "Prévenir les anomalies avant la panne",
    intro:
      "Une analyse thermique non destructive aide à cibler les points à vérifier sur vos installations électriques, dans leurs conditions normales d’utilisation.",
    paragraphs: [
      "Le périmètre de l’inspection, les conditions de mesure et les livrables attendus sont confirmés avec l’équipe avant l’intervention.",
    ],
    items: [
      "Détection préventive de points chauds et d’échauffements",
      "Analyse de panneaux de distribution sous charge normale",
      "Rapports techniques à préparer pour les dossiers d’assurance",
      "Repérage de surcharges, connexions desserrées et déséquilibres de phases",
      "Priorisation des vérifications pour réduire le risque d’arrêt de production",
    ],
    faq: frenchServiceFaq.thermography,
    related: ["industrial", "maintenance"],
  },
  security: {
    seo: {
      title: "Alarmes et sécurité électrique à Montréal | Éclipse électrique",
      description:
        "Raccordement électrique de systèmes d’alarme, de détection incendie et de surveillance pour bâtiments résidentiels, commerciaux et industriels.",
    },
    eyebrow: "Alarmes & sécurité",
    title: "Des systèmes de sécurité raccordés avec méthode",
    intro:
      "Présentez le bâtiment, le système existant et les travaux souhaités afin de discuter d’un raccordement électrique adapté au site.",
    paragraphs: [
      "Les exigences du bâtiment, du système et des intervenants concernés sont vérifiées avec l’équipe avant de confirmer la portée des travaux.",
    ],
    items: [
      "Systèmes d’alarme d’intrusion",
      "Détection et alarmes incendie",
      "Raccordement de systèmes de surveillance",
      "Interphones, contrôle d’accès et éclairage d’urgence",
      "Vérification de la compatibilité électrique du bâtiment",
    ],
    faq: frenchServiceFaq.security,
    related: ["commercial", "maintenance"],
  },
  serviceArea: {
    seo: {
      title: "Territoire desservi dans le Grand Montréal | Éclipse électrique",
      description:
        "Consultez les secteurs publiés à Montréal, sur la Rive-Nord et sur la Rive-Sud, puis confirmez l’emplacement de vos travaux avec l’équipe.",
    },
    eyebrow: "Territoire desservi",
    title: "Montréal, Rive-Nord et Rive-Sud",
    intro:
      "Éclipse électrique inc. publie une vaste couverture du Grand Montréal. La disponibilité dépend de la nature et de l’emplacement des travaux; confirmez toujours l’adresse de service avec l’équipe.",
  },
  about: {
    seo: {
      title: "À propos d’Éclipse électrique inc. | Entrepreneur électricien",
      description:
        "Découvrez un entrepreneur électricien montréalais titulaire de la licence RBQ 5582-0096-01 et actif depuis 2008.",
    },
    eyebrow: "À propos",
    title: "Une entreprise électrique établie à Montréal",
    intro:
      "Éclipse électrique inc. dessert le Grand Montréal avec des services résidentiels, commerciaux et industriels, de la thermographie infrarouge, des systèmes de sécurité, de l’entretien, une ligne d’urgence et des génératrices.",
    paragraphs: [
      "La licence RBQ 5582-0096-01 a été délivrée le 6 août 2008. Le numéro d’entreprise du Québec est 1165326209.",
      "Le site présente uniquement les renseignements publics vérifiés. Pour discuter d’un besoin précis, communiquez directement avec l’entreprise.",
    ],
  },
  faq: {
    seo: {
      title: "Questions fréquentes sur les services électriques | Éclipse",
      description:
        "Réponses sur les services résidentiels, commerciaux et industriels, la thermographie, les systèmes de sécurité, les urgences, le territoire et la licence RBQ.",
    },
    eyebrow: "Questions fréquentes",
    title: "Des réponses claires avant de communiquer avec nous",
    intro:
      "Retrouvez les renseignements essentiels sur les services, le territoire, la ligne d’urgence et les coordonnées d’Éclipse électrique inc.",
    faq: [
      {
        question: "Quels types de services offrez-vous?",
        answer:
          "Nous publions des services électriques résidentiels, commerciaux et industriels, de la thermographie infrarouge, des systèmes de sécurité, de l’entretien, une ligne d’urgence 24/7 et des services de génératrices.",
      },
      {
        question: "Quelles régions desservez-vous?",
        answer:
          "L’entreprise publie une couverture du Grand Montréal, de la Rive-Nord et de la Rive-Sud. Communiquez avec nous pour confirmer le lieu précis.",
      },
      {
        question: "Comment joindre la ligne d’urgence?",
        answer:
          "Appelez directement le 514-717-9277. Aucun délai d’arrivée n’est promis sur ce site; la suite dépend de la situation au moment de l’appel.",
      },
      {
        question: "Installez-vous et réparez-vous des génératrices?",
        answer:
          "Oui. Indiquez la marque, le modèle, le type de bâtiment et le service recherché lorsque vous communiquez avec l’équipe.",
      },
      {
        question: "Comment demander un service?",
        answer:
          "Appelez le bureau au 514-510-1112 ou écrivez à info@eclipseelectrique.com. Pour une urgence, appelez le 514-717-9277.",
      },
      {
        question: "Détenez-vous une licence RBQ?",
        answer:
          "Oui. Le numéro de licence RBQ est 5582-0096-01. La licence a été délivrée le 6 août 2008; le NEQ est 1165326209.",
      },
    ],
  },
  contact: {
    seo: {
      title: "Contacter Éclipse électrique inc. | Montréal",
      description:
        "Appelez le bureau, utilisez la ligne d’urgence ou préparez un courriel pour discuter de vos besoins électriques dans le Grand Montréal.",
    },
    eyebrow: "Contact",
    title: "Parlons de vos besoins électriques",
    intro:
      "Pour des travaux résidentiels, commerciaux ou industriels, une inspection par thermographie, un système de sécurité, de l’entretien ou une génératrice, communiquez avec Éclipse électrique inc.",
  },
  privacy: {
    seo: {
      title: "Confidentialité du site | Éclipse électrique inc.",
      description:
        "Comprenez le fonctionnement actuel du site d’Éclipse électrique inc., ses liens de contact et la préparation locale des demandes par courriel.",
    },
    eyebrow: "Confidentialité",
    title: "Une expérience simple, sans suivi publicitaire",
    intro:
      "Cette version du site n’installe aucun outil d’analytique, pixel publicitaire, carte intégrée ni témoin de préférence.",
    paragraphs: [
      "Le formulaire de contact prépare un courriel dans votre propre application. Le site ne transmet pas automatiquement les renseignements saisis et ne confirme jamais qu’un message a été envoyé.",
      "Si vous choisissez d’envoyer le courriel préparé, les renseignements sont transmis par votre service de messagerie à l’adresse publique d’Éclipse électrique inc. Évitez d’inclure des renseignements sensibles.",
      "Avant l’activation d’un formulaire hébergé, d’analytique ou de témoins non essentiels, l’entreprise devra publier une politique approuvée qui identifie le responsable de la protection des renseignements personnels, les finalités, les fournisseurs et les périodes de conservation.",
    ],
  },
};

const englishPages: Record<PageId, LocalizedPage> = {
  home: {
    seo: {
      title: "Electrician in Montréal | Éclipse électrique",
      description:
        "Residential, commercial and industrial electrical services across Greater Montréal, including maintenance, infrared thermography, alarms and generators.",
    },
    eyebrow: "Montréal electrical contractor",
    title: "Electrical services from residential to industrial",
    intro:
      "Éclipse électrique inc. serves Greater Montréal, the North Shore and the South Shore with electrical work, maintenance, emergencies, infrared thermography and security systems.",
  },
  services: {
    seo: {
      title: "Electrical services in Montréal | Éclipse électrique",
      description:
        "Explore residential, commercial and industrial work, infrared thermography, alarm systems, maintenance, emergency support and generator services across Greater Montréal.",
    },
    eyebrow: "Electrical services",
    title: "One point of contact for a range of electrical needs",
    intro:
      "Whether the work involves a home, commercial space or industrial facility, tell us about the project to plan or the condition that needs attention.",
  },
  residential: {
    seo: {
      title: "Residential electrician in Montréal | Éclipse électrique",
      description:
        "Electrical services for houses, condos and residential buildings in Montréal, the North Shore and the South Shore.",
    },
    eyebrow: "Residential",
    title: "Residential electrical services across Greater Montréal",
    intro:
      "Éclipse électrique inc. works with owners and property managers on electrical needs in houses, condos and residential buildings.",
    paragraphs: [
      "Describe the current installation, planned work and location. The team can discuss the scope of your request and the next steps.",
    ],
    items: [
      "New construction and renovations",
      "Service entrances and electrical panels",
      "Interior and exterior lighting",
      "Electric heating and heated floors",
      "Home automation, controls and smart-home systems",
      "Data, telephone, audio and video cabling",
      "Security, fire and surveillance systems",
      "Electrical work for pools, spas and outdoor spaces",
      "Generator installation and repair",
    ],
    faq: englishServiceFaq.residential,
    related: ["generators", "maintenance"],
  },
  commercial: {
    seo: {
      title: "Commercial electrician in Montréal | Éclipse électrique",
      description:
        "Electrical work for offices, retail spaces, restaurants and other commercial properties across Greater Montréal.",
    },
    eyebrow: "Commercial",
    title: "Electrical installations for commercial spaces",
    intro:
      "We discuss electrical projects for retail spaces, offices, restaurants and other commercial properties across Greater Montréal.",
    paragraphs: [
      "Each request is reviewed according to the work, property, affected equipment and conditions at the site.",
    ],
    items: [
      "New installations and space reconfiguration",
      "Service entrances and electrical panels",
      "Interior, exterior and controlled lighting",
      "Building energy-efficiency measures",
      "Structured data, telephone, audio and video cabling",
      "Emergency lighting, fire alarms, intercom and access",
      "Security and surveillance systems",
      "UPS units and generators",
    ],
    faq: englishServiceFaq.commercial,
    related: ["maintenance", "industrial"],
  },
  industrial: {
    seo: {
      title: "Industrial electrician in Montréal | Éclipse électrique",
      description:
        "Electrical service, machinery connection, troubleshooting and maintenance for industrial environments across Greater Montréal.",
    },
    eyebrow: "Industrial",
    title: "Electrical services for industrial environments",
    intro:
      "Éclipse électrique inc. discusses electrical work, maintenance and troubleshooting for industrial facilities across Greater Montréal.",
    paragraphs: [
      "Include the site, affected equipment and nature of the work so the request can be considered in its operating context.",
    ],
    items: [
      "Electrical entrances and distribution",
      "Panels, lighting and controls",
      "Machinery installation and connection",
      "Structured cabling and building systems",
      "UPS units and generators",
      "Diagnosis, repair and maintenance",
    ],
    faq: englishServiceFaq.industrial,
    related: ["maintenance", "commercial"],
  },
  maintenance: {
    seo: {
      title: "Electrical maintenance and emergency Montréal | Éclipse",
      description:
        "Electrical diagnosis, troubleshooting, repair and maintenance, with an emergency line available at all times at 514-717-9277.",
    },
    eyebrow: "24/7 emergency line",
    title: "Electrical emergency? Call us directly.",
    intro:
      "For an urgent request, call Éclipse électrique inc. at 514-717-9277. We will collect the information needed to coordinate the next steps based on the situation.",
    paragraphs: [
      "For non-urgent needs, contact the office to discuss electrical maintenance, inspection, diagnosis or repair.",
    ],
    items: [
      "Inspection and condition assessment",
      "Diagnosis and troubleshooting",
      "Electrical repairs",
      "Residential, commercial and industrial maintenance",
      "Lighting studies and energy analysis",
      "Solutions matched to the property and equipment",
    ],
    faq: englishServiceFaq.maintenance,
    related: ["residential", "commercial", "industrial"],
  },
  generators: {
    seo: {
      title: "Generator installation and repair | Éclipse électrique",
      description:
        "Generator installation, diagnosis and repair services across Greater Montréal, the North Shore and the South Shore.",
    },
    eyebrow: "Backup power",
    title: "Generator installation and repair",
    intro:
      "Éclipse électrique inc. provides generator-related services for residential, commercial and industrial needs.",
    paragraphs: [
      "Contact the team with the equipment, property, location and whether the request involves installation or repair.",
    ],
    items: [
      "Standby and portable generators",
      "Transfer switches and electrical connections",
      "Diagnosis, maintenance and repair",
      "Commercial backup equipment",
    ],
    faq: englishServiceFaq.generators,
    related: ["residential", "maintenance"],
  },
  thermography: {
    seo: {
      title: "Infrared thermography in Montréal | Éclipse électrique",
      description:
        "Electrical infrared thermography inspections to identify hot spots, document installations and help prevent downtime across Greater Montréal.",
    },
    eyebrow: "Infrared thermography",
    title: "Identify anomalies before a failure",
    intro:
      "A non-destructive thermal analysis helps target electrical conditions to review while installations are operating in their normal conditions.",
    paragraphs: [
      "The inspection scope, measurement conditions and expected deliverables are confirmed with the team before the visit.",
    ],
    items: [
      "Preventive detection of hot spots and abnormal heat",
      "Distribution-panel analysis under normal load",
      "Technical reports prepared for insurance files",
      "Identification of overloads, loose connections and phase imbalance",
      "Prioritized checks that can help reduce production downtime risk",
    ],
    faq: englishServiceFaq.thermography,
    related: ["industrial", "maintenance"],
  },
  security: {
    seo: {
      title: "Fire and security systems in Montréal | Éclipse électrique",
      description:
        "Electrical connections for intrusion alarms, fire detection and surveillance systems in residential, commercial and industrial buildings.",
    },
    eyebrow: "Fire & alarm systems",
    title: "Security systems connected with care",
    intro:
      "Share the property, existing system and requested work so the team can discuss an electrical connection suited to the site.",
    paragraphs: [
      "Building, system and stakeholder requirements are reviewed with the team before the work scope is confirmed.",
    ],
    items: [
      "Intrusion alarm systems",
      "Fire detection and alarm systems",
      "Surveillance-system connections",
      "Intercoms, access control and emergency lighting",
      "Review of the building’s electrical compatibility",
    ],
    faq: englishServiceFaq.security,
    related: ["commercial", "maintenance"],
  },
  serviceArea: {
    seo: {
      title: "Greater Montréal electrical service area | Éclipse électrique",
      description:
        "Review published coverage across Montréal, the North Shore and the South Shore, then confirm your exact work location with the team.",
    },
    eyebrow: "Service area",
    title: "Montréal, the North Shore and the South Shore",
    intro:
      "Éclipse électrique inc. publishes broad Greater Montréal coverage. Availability depends on the work and location, so always confirm the service address with the team.",
  },
  about: {
    seo: {
      title: "About Éclipse électrique inc. | Electrical contractor",
      description:
        "Learn about a Montréal electrical contractor holding RBQ licence 5582-0096-01 and operating since 2008.",
    },
    eyebrow: "About",
    title: "An established Montréal electrical contractor",
    intro:
      "Éclipse électrique inc. serves Greater Montréal with residential, commercial and industrial work, infrared thermography, security systems, maintenance, an emergency line and generator services.",
    paragraphs: [
      "RBQ licence 5582-0096-01 was issued on August 6, 2008. The Québec enterprise number is 1165326209.",
      "This website presents verified public information only. Contact the company directly to discuss a specific need.",
    ],
  },
  faq: {
    seo: {
      title: "Electrical service questions | Éclipse électrique",
      description:
        "Answers about residential, commercial and industrial services, thermography, security systems, emergency contact, territory and the RBQ licence.",
    },
    eyebrow: "Frequently asked questions",
    title: "Clear information before you contact us",
    intro:
      "Find essential information about services, territory, the emergency line and how to contact Éclipse électrique inc.",
    faq: [
      {
        question: "What services do you provide?",
        answer:
          "Published services include residential, commercial and industrial electrical work, infrared thermography, security systems, maintenance, a 24/7 emergency line, and generator installation or repair.",
      },
      {
        question: "Which areas do you serve?",
        answer:
          "The company publishes coverage across Greater Montréal, the North Shore and the South Shore. Contact us to confirm the exact location.",
      },
      {
        question: "How do I reach the emergency line?",
        answer:
          "Call 514-717-9277 directly. This website does not promise an arrival time; next steps depend on the situation at the time of the call.",
      },
      {
        question: "Do you install and repair generators?",
        answer:
          "Yes. Include the brand, model, property type and requested service when contacting the team.",
      },
      {
        question: "How do I request service?",
        answer:
          "Call the office at 514-510-1112 or email info@eclipseelectrique.com. For an emergency, call 514-717-9277.",
      },
      {
        question: "Do you hold an RBQ licence?",
        answer:
          "Yes. The RBQ licence number is 5582-0096-01. It was issued on August 6, 2008; the NEQ is 1165326209.",
      },
    ],
  },
  contact: {
    seo: {
      title: "Contact Éclipse électrique inc. | Montréal",
      description:
        "Call the office, use the emergency line or prepare an email to discuss electrical needs across Greater Montréal.",
    },
    eyebrow: "Contact",
    title: "Let’s discuss your electrical needs",
    intro:
      "For residential, commercial or industrial work, infrared thermography, security systems, maintenance, or generator service, contact Éclipse électrique inc.",
  },
  privacy: {
    seo: {
      title: "Website privacy | Éclipse électrique inc.",
      description:
        "Understand how the current Éclipse électrique inc. website handles contact links and locally prepares email enquiries.",
    },
    eyebrow: "Privacy",
    title: "A simple experience without advertising tracking",
    intro:
      "This version of the site does not install analytics, advertising pixels, embedded maps or preference cookies.",
    paragraphs: [
      "The contact form prepares an email in your own application. The website does not automatically transmit entered information and never confirms that a message was sent.",
      "If you choose to send the prepared email, your email provider transmits the information to Éclipse électrique inc.’s public address. Do not include sensitive information.",
      "Before a hosted form, analytics or non-essential cookies are activated, the company must publish an approved policy identifying its privacy officer, purposes, providers and retention periods.",
    ],
  },
};

export const content = {
  fr: {
    languageName: "Français",
    alternateLanguageName: "English",
    nav: {
      services: "Services",
      serviceArea: "Territoire",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      menu: "Menu",
    },
    actions: {
      quote: "Demander un service",
      emergency: "Urgence 24/7",
      office: "Appeler le bureau",
      email: "Envoyer un courriel",
      exploreServices: "Voir tous les services",
      learnMore: "En savoir plus",
      checkArea: "Consulter le territoire",
      allQuestions: "Voir toutes les questions",
    },
    home: {
      servicesEyebrow: "Expertise",
      servicesTitle: "Un service adapté à votre bâtiment",
      servicesIntro:
        "Sept parcours de services couvrent les besoins résidentiels, commerciaux et industriels, de l’installation à l’inspection spécialisée.",
      trustBadges: [
        { label: "Licence RBQ", value: "5582-0096-01" },
        { label: "Maître électricien", value: "Membre CMEQ" },
        { label: "Service d’urgence", value: "24 h / 7 jours" },
      ],
      capabilitiesEyebrow: "Lire votre besoin",
      capabilitiesTitle: "Une lecture claire de votre installation",
      capabilitiesIntro:
        "Les demandes électriques changent selon le bâtiment. Ces repères résument les travaux publiés par l’entreprise pour vous aider à formuler une demande précise.",
      capabilities: [
        {
          title: "Installation et mise à niveau",
          items: [
            "Entrées de service et panneaux",
            "Éclairage intérieur, extérieur et contrôles",
            "Chauffage électrique et planchers chauffants",
          ],
        },
        {
          title: "Réseaux et protection",
          items: [
            "Données, téléphone, audio et vidéo",
            "Sécurité, incendie et surveillance",
            "Interphone et contrôle d’accès",
          ],
        },
        {
          title: "Continuité et diagnostic",
          items: [
            "Inspection pour assurance",
            "Diagnostic, dépannage et réparation",
            "UPS et génératrices",
          ],
        },
      ],
      sectorMatrix: {
        eyebrow: "Architecture de services",
        title: "Une expertise ciblée pour chaque environnement",
        intro:
          "Choisissez un secteur pour voir les interventions prioritaires et accéder à la page détaillée correspondante.",
        tablistLabel: "Secteurs d’expertise",
        viewDetails: "Voir la page du service",
        secondaryLinkLabel: "Voir aussi",
        tabs: [
          {
            id: "residential",
            label: "Résidentiel",
            secondaryLabel: "Residential",
            title: "Résidentiel",
            intro:
              "Des améliorations électriques pensées pour les maisons, condos et immeubles résidentiels.",
            items: [
              "Remplacement et mise à niveau de panneaux 200 A",
              "Bornes de recharge pour véhicules électriques (VE)",
              "Éclairage encastré et scénarios lumineux",
              "Mise aux normes du câblage",
              "Dépannage rapide selon la situation",
            ],
            route: "residential",
          },
          {
            id: "commercialIndustrial",
            label: "Commercial & Industriel",
            secondaryLabel: "Commercial & Industrial",
            title: "Commercial & Industriel",
            intro:
              "Une approche structurée pour les espaces commerciaux, ateliers et environnements industriels.",
            items: [
              "Entrées électriques triphasées et distribution",
              "Transformateurs et raccordements d’équipements",
              "Maintenance préventive planifiée",
              "Éclairage d’entrepôt et contrôles",
              "Vérifications de conformité RBQ/CMEQ",
            ],
            route: "commercial",
            secondaryRoute: "industrial",
          },
          {
            id: "thermography",
            label: "Thermographie Infrarouge",
            secondaryLabel: "Infrared Thermography",
            title: "Thermographie Infrarouge",
            intro:
              "Une lecture thermique non destructive pour repérer les anomalies avant qu’elles ne deviennent une panne.",
            items: [
              "Détection préventive de points chauds",
              "Analyse de panneaux de distribution sous charge",
              "Rapports techniques pour les dossiers d’assurance",
              "Repérage des surcharges et connexions à vérifier",
              "Réduction du risque d’arrêt de production",
            ],
            route: "thermography",
          },
          {
            id: "security",
            label: "Systèmes d’Alarme & Sécurité",
            secondaryLabel: "Fire & Alarm Systems",
            title: "Systèmes d’Alarme & Sécurité",
            intro:
              "Des raccordements électriques coordonnés pour les systèmes de sécurité du bâtiment.",
            items: [
              "Systèmes d’alarme d’intrusion",
              "Détection et alarmes incendie",
              "Raccordement de systèmes de surveillance",
              "Interphones, contrôle d’accès et éclairage d’urgence",
            ],
            route: "security",
          },
        ],
      },
      thermographyProof: {
        eyebrow: "Preuve technique",
        title: "Inspection par thermographie infrarouge : Prévenir avant la panne",
        intro:
          "Une inspection thermique non destructive aide à repérer les anomalies électriques avant qu’elles ne deviennent une panne. Le périmètre et les livrables sont confirmés avec l’équipe.",
        pillarCountLabel: "piliers de prévention",
        cta: "Planifier une inspection thermique",
        ctaNote:
          "Décrivez le bâtiment, les équipements et l’objectif de l’inspection.",
        pillars: [
          {
            title: "Conformité & Assurances",
            secondaryTitle: "Insurance & Compliance",
            description:
              "Rapports techniques détaillés pour documenter vos installations et préparer un dossier d’assurance commerciale; les exigences de votre assureur sont confirmées avant l’intervention.",
            metric: "01",
            proof: "Dossier documenté",
          },
          {
            title: "Détection Sans Arrêt",
            secondaryTitle: "Zero Downtime",
            description:
              "Analyse thermique non destructive effectuée sur vos installations dans leurs conditions normales d’utilisation, selon le périmètre convenu.",
            metric: "02",
            proof: "Sous charge normale",
          },
          {
            title: "Prévention des Incendies",
            secondaryTitle: "Fire Prevention",
            description:
              "Repérage de surcharges, connexions desserrées ou déséquilibres de phases afin de prioriser les vérifications avant l’avarie.",
            metric: "03",
            proof: "Anomalies ciblées",
          },
        ],
      },
      processEyebrow: "Pour démarrer",
      processTitle: "Une demande claire, des prochaines étapes concrètes",
      processIntro:
        "Présentez le bâtiment, le besoin et l’emplacement. L’équipe pourra ensuite discuter de la suite avec vous.",
      territoryEyebrow: "Grand Montréal",
      territoryTitle: "Trois grandes zones desservies",
      territoryIntro:
        "La couverture publiée s’étend à Montréal, à la Rive-Nord et à la Rive-Sud. Confirmez toujours le lieu précis lors de votre demande.",
      trust: [
        "Licence délivrée en 2008",
        "RBQ 5582-0096-01",
        "Grand Montréal",
        "Ligne d’urgence 24/7",
      ],
    },
    process: [
      {
        title: "Communiquez avec nous",
        description:
          "Appelez le bureau ou préparez un courriel. Pour une urgence, utilisez la ligne dédiée.",
      },
      {
        title: "Précisez vos besoins",
        description:
          "Indiquez le type de bâtiment, la nature des travaux et l’emplacement.",
      },
      {
        title: "Planifiez la suite",
        description:
          "L’équipe discute avec vous des prochaines étapes selon les renseignements fournis.",
      },
    ],
    regions: [
      {
        name: "Montréal",
        description:
          "L’île de Montréal et les secteurs centraux publiés par l’entreprise.",
        cities: [
          "Ahuntsic",
          "Anjou",
          "Dorval",
          "Hochelaga",
          "Lachine",
          "LaSalle",
          "Montréal",
          "Mont-Royal",
          "Pointe-aux-Trembles",
          "Pointe-Claire",
          "Rosemont",
          "Saint-Léonard",
          "Verdun",
          "Villeray",
          "Westmount",
        ],
      },
      {
        name: "Rive-Nord",
        description:
          "Laval, les Laurentides et les municipalités au nord de Montréal figurant dans la couverture publiée.",
        cities: [
          "Blainville",
          "Boisbriand",
          "Deux-Montagnes",
          "Mirabel",
          "Prévost",
          "Sainte-Adèle",
          "Sainte-Thérèse",
          "Saint-Eustache",
          "Saint-Hippolyte",
          "Saint-Jérôme",
          "Saint-Sauveur",
        ],
      },
      {
        name: "Rive-Sud",
        description:
          "Longueuil, la Montérégie et les municipalités au sud de Montréal figurant dans la couverture publiée.",
        cities: [
          "Belœil",
          "Boucherville",
          "Brossard",
          "Candiac",
          "Carignan",
          "Chambly",
          "Châteauguay",
          "Delson",
          "La Prairie",
          "Longueuil",
          "Saint-Hubert et Vieux-Longueuil",
          "McMasterville",
          "Mont-Saint-Hilaire",
          "Otterburn Park",
          "Saint-Basile-le-Grand",
          "Saint-Bruno-de-Montarville",
          "Saint-Constant",
          "Sainte-Catherine",
          "Sainte-Julie",
          "Saint-Isidore",
          "Saint-Jean-sur-Richelieu",
          "Saint-Lambert",
          "Saint-Philippe",
          "Varennes",
        ],
      },
    ],
    regionNote:
      "La liste reflète le territoire publié par l’entreprise. Confirmez la disponibilité pour votre adresse et le type de travaux.",
    servicesSectionLabel: "Services connexes",
    relatedServices: "Explorer des services connexes",
    offeredWork: "Travaux publiés dans cette catégorie",
    commonFaqTitle: "Questions sur ce service",
    contact: {
      office: "Bureau",
      emergency: "Urgence 24/7",
      email: "Courriel",
      territory: "Territoire",
      territoryValue: "Grand Montréal, Rive-Nord et Rive-Sud",
      formTitle: "Préparer votre demande par courriel",
      formIntro:
        "Rassemblez les renseignements utiles; votre application de courriel s’ouvrira ensuite pour que vous puissiez vérifier et envoyer le message.",
      emergencyNote:
        "Pour une urgence, n’utilisez pas le formulaire : appelez directement le 514-717-9277.",
      fields: {
        name: "Nom",
        phone: "Téléphone",
        email: "Courriel",
        service: "Type de service",
        location: "Lieu des travaux",
        message: "Décrivez votre demande",
        chooseService: "Choisir un service",
      },
      prepare: "Préparer le courriel",
      formNotice:
        "Le site n’envoie pas ce formulaire. Vous devrez vérifier puis envoyer le courriel dans votre application.",
      requiredError: "Ce champ est requis.",
      replyError: "Indiquez un téléphone ou un courriel pour vous joindre.",
      errorSummary: "Vérifiez les champs indiqués.",
      emailSubject: "Demande de service électrique",
    },
    footer: {
      summary:
        "Services électriques résidentiels, commerciaux et industriels dans le Grand Montréal.",
      credentials: "Renseignements d’entreprise",
      navigation: "Navigation",
      services: "Services",
      contact: "Coordonnées",
      privacy: "Confidentialité",
      rights: "Tous droits réservés.",
    },
    notFound: {
      eyebrow: "Erreur 404",
      title: "Cette page n’existe pas",
      description:
        "Le lien est peut-être incomplet ou la page a été déplacée.",
      action: "Retour à l’accueil",
    },
    pages: frenchPages,
  },
  en: {
    languageName: "English",
    alternateLanguageName: "Français",
    nav: {
      services: "Services",
      serviceArea: "Service area",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      menu: "Menu",
    },
    actions: {
      quote: "Request service",
      emergency: "24/7 emergency",
      office: "Call the office",
      email: "Send an email",
      exploreServices: "Explore all services",
      learnMore: "Learn more",
      checkArea: "View the service area",
      allQuestions: "View all questions",
    },
    home: {
      servicesEyebrow: "Expertise",
      servicesTitle: "Service matched to your property",
      servicesIntro:
        "Seven service pathways cover residential, commercial and industrial needs, from installation through specialized inspection.",
      trustBadges: [
        { label: "RBQ licence", value: "5582-0096-01" },
        { label: "Master electrician", value: "CMEQ member" },
        { label: "Emergency service", value: "24 hours / 7 days" },
      ],
      capabilitiesEyebrow: "Make the need clear",
      capabilitiesTitle: "A clear view of your electrical system",
      capabilitiesIntro:
        "Electrical needs change with the property. These reference points summarize the work published by the company and help you prepare a useful request.",
      capabilities: [
        {
          title: "Installation and upgrades",
          items: [
            "Service entrances and panels",
            "Interior, exterior and controlled lighting",
            "Electric heating and heated floors",
          ],
        },
        {
          title: "Networks and protection",
          items: [
            "Data, telephone, audio and video",
            "Security, fire and surveillance systems",
            "Intercom and access control",
          ],
        },
        {
          title: "Continuity and diagnosis",
          items: [
            "Insurance-oriented inspections",
            "Diagnosis, troubleshooting and repairs",
            "UPS units and generators",
          ],
        },
      ],
      sectorMatrix: {
        eyebrow: "Service architecture",
        title: "Focused expertise for every environment",
        intro:
          "Choose a sector to see priority capabilities and open its dedicated service page.",
        tablistLabel: "Expertise sectors",
        viewDetails: "View the service page",
        secondaryLinkLabel: "Also explore",
        tabs: [
          {
            id: "residential",
            label: "Residential",
            secondaryLabel: "Résidentiel",
            title: "Residential",
            intro:
              "Electrical upgrades designed for houses, condos and residential buildings.",
            items: [
              "200A electrical panel replacement and upgrades",
              "Electric-vehicle (EV) charging stations",
              "Recessed lighting and lighting scenes",
              "Wiring updates to current requirements",
              "Rapid troubleshooting based on the situation",
            ],
            route: "residential",
          },
          {
            id: "commercialIndustrial",
            label: "Commercial & Industrial",
            secondaryLabel: "Commercial & Industriel",
            title: "Commercial & Industrial",
            intro:
              "A structured approach for commercial spaces, workshops and industrial environments.",
            items: [
              "Three-phase electrical entrances and distribution",
              "Transformers and equipment connections",
              "Planned preventive maintenance",
              "Warehouse lighting and controls",
              "RBQ/CMEQ compliance reviews",
            ],
            route: "commercial",
            secondaryRoute: "industrial",
          },
          {
            id: "thermography",
            label: "Infrared Thermography",
            secondaryLabel: "Thermographie Infrarouge",
            title: "Infrared Thermography",
            intro:
              "Non-destructive thermal reading to identify anomalies before they become a failure.",
            items: [
              "Preventive hot-spot detection",
              "Distribution-panel analysis under load",
              "Technical reports for insurance files",
              "Identification of overloads and connections to check",
              "Reduced risk of production downtime",
            ],
            route: "thermography",
          },
          {
            id: "security",
            label: "Fire & Alarm Systems",
            secondaryLabel: "Systèmes d’Alarme & Sécurité",
            title: "Fire & Alarm Systems",
            intro:
              "Coordinated electrical connections for building security systems.",
            items: [
              "Intrusion alarm systems",
              "Fire detection and alarm systems",
              "Surveillance-system connections",
              "Intercoms, access control and emergency lighting",
            ],
            route: "security",
          },
        ],
      },
      thermographyProof: {
        eyebrow: "Technical proof",
        title: "Infrared thermography inspection: prevent the failure",
        intro:
          "A non-destructive thermal inspection helps identify electrical anomalies before they become a failure. Scope and deliverables are confirmed with the team.",
        pillarCountLabel: "prevention pillars",
        cta: "Plan an infrared inspection",
        ctaNote:
          "Tell us about the property, equipment and inspection objective.",
        pillars: [
          {
            title: "Insurance & Compliance",
            secondaryTitle: "Conformité & Assurances",
            description:
              "Detailed technical reports help document installations and prepare a commercial insurance file; your insurer’s requirements are confirmed before the visit.",
            metric: "01",
            proof: "Documented file",
          },
          {
            title: "Zero Downtime",
            secondaryTitle: "Détection Sans Arrêt",
            description:
              "Non-destructive thermal analysis is performed in the installation’s normal operating conditions, according to the agreed scope.",
            metric: "02",
            proof: "Under normal load",
          },
          {
            title: "Fire Prevention",
            secondaryTitle: "Prévention des Incendies",
            description:
              "Overloads, loose connections and phase imbalance can be identified so checks are prioritized before a failure.",
            metric: "03",
            proof: "Targeted anomalies",
          },
        ],
      },
      processEyebrow: "Getting started",
      processTitle: "A clear request and practical next steps",
      processIntro:
        "Tell us about the property, need and location. The team can then discuss the next steps with you.",
      territoryEyebrow: "Greater Montréal",
      territoryTitle: "Three broad service regions",
      territoryIntro:
        "Published coverage spans Montréal, the North Shore and the South Shore. Always confirm the exact location when contacting us.",
      trust: [
        "Licence issued in 2008",
        "RBQ 5582-0096-01",
        "Greater Montréal",
        "24/7 emergency line",
      ],
    },
    process: [
      {
        title: "Contact us",
        description:
          "Call the office or prepare an email. For an emergency, use the dedicated line.",
      },
      {
        title: "Describe your needs",
        description:
          "Include the property type, nature of the work and location.",
      },
      {
        title: "Plan the next steps",
        description:
          "The team discusses what comes next based on the information provided.",
      },
    ],
    regions: [
      {
        name: "Montréal",
        description:
          "The island of Montréal and central sectors in the company’s published coverage.",
        cities: [
          "Ahuntsic",
          "Anjou",
          "Dorval",
          "Hochelaga",
          "Lachine",
          "LaSalle",
          "Montréal",
          "Mount Royal",
          "Pointe-aux-Trembles",
          "Pointe-Claire",
          "Rosemont",
          "Saint-Léonard",
          "Verdun",
          "Villeray",
          "Westmount",
        ],
      },
      {
        name: "North Shore",
        description:
          "Laval, the Laurentians and municipalities north of Montréal in the published coverage.",
        cities: [
          "Blainville",
          "Boisbriand",
          "Deux-Montagnes",
          "Mirabel",
          "Prévost",
          "Sainte-Adèle",
          "Sainte-Thérèse",
          "Saint-Eustache",
          "Saint-Hippolyte",
          "Saint-Jérôme",
          "Saint-Sauveur",
        ],
      },
      {
        name: "South Shore",
        description:
          "Longueuil, Montérégie and municipalities south of Montréal in the published coverage.",
        cities: [
          "Belœil",
          "Boucherville",
          "Brossard",
          "Candiac",
          "Carignan",
          "Chambly",
          "Châteauguay",
          "Delson",
          "La Prairie",
          "Longueuil",
          "Saint-Hubert and Old Longueuil",
          "McMasterville",
          "Mont-Saint-Hilaire",
          "Otterburn Park",
          "Saint-Basile-le-Grand",
          "Saint-Bruno-de-Montarville",
          "Saint-Constant",
          "Sainte-Catherine",
          "Sainte-Julie",
          "Saint-Isidore",
          "Saint-Jean-sur-Richelieu",
          "Saint-Lambert",
          "Saint-Philippe",
          "Varennes",
        ],
      },
    ],
    regionNote:
      "This list reflects the company’s published territory. Confirm availability for your address and type of work.",
    servicesSectionLabel: "Related services",
    relatedServices: "Explore related services",
    offeredWork: "Published work in this category",
    commonFaqTitle: "Questions about this service",
    contact: {
      office: "Office",
      emergency: "24/7 emergency",
      email: "Email",
      territory: "Service area",
      territoryValue: "Greater Montréal, North Shore and South Shore",
      formTitle: "Prepare your email request",
      formIntro:
        "Gather the useful details; your email application will then open so you can review and send the message.",
      emergencyNote:
        "For an emergency, do not use the form: call 514-717-9277 directly.",
      fields: {
        name: "Name",
        phone: "Phone",
        email: "Email",
        service: "Type of service",
        location: "Work location",
        message: "Describe your request",
        chooseService: "Choose a service",
      },
      prepare: "Prepare email request",
      formNotice:
        "This website does not send the form. You must review and send the email in your email application.",
      requiredError: "This field is required.",
      replyError: "Enter a phone number or email address where we can reach you.",
      errorSummary: "Review the indicated fields.",
      emailSubject: "Electrical service request",
    },
    footer: {
      summary:
        "Residential, commercial and industrial electrical services across Greater Montréal.",
      credentials: "Company information",
      navigation: "Navigation",
      services: "Services",
      contact: "Contact",
      privacy: "Privacy",
      rights: "All rights reserved.",
    },
    notFound: {
      eyebrow: "Error 404",
      title: "This page does not exist",
      description: "The link may be incomplete or the page may have moved.",
      action: "Return home",
    },
    pages: englishPages,
  },
} as const satisfies Record<Locale, LocaleContent>;
