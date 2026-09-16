export type ServiceWorkItem = {
  id: string;
  number: string;
  image: string;
  label: { en: string; fr: string };
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
};

export type ServiceWorkExplorerData = {
  serviceId: string;
  eyebrow: { en: string; fr: string };
  heading: { en: string; fr: string };
  lead: { en: string; fr: string };
  items: ServiceWorkItem[];
};

// ─── Residential ─────────────────────────────────────────────────────────────
const residential: ServiceWorkExplorerData = {
  serviceId: "residential",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the current installation, planned work and location. The team can discuss the scope of your request and the next steps.",
    fr: "Décrivez l'installation actuelle, les travaux prévus et l'emplacement. L'équipe pourra discuter de la portée de votre demande et des prochaines étapes.",
  },
  items: [
    {
      id: "new-construction",
      number: "01",
      image: "/media/residential-new-construction-renovations.png",
      label: { en: "Construction & renovations", fr: "Construction & rénovations" },
      title: { en: "New construction and renovations", fr: "Construction neuve et rénovations" },
      description: {
        en: "Electrical rough-in and finishing work planned around your home, renovation schedule and the way each room will be used.",
        fr: "Des travaux d'ébauche et de finition électrique planifiés selon votre maison, l'échéancier des rénovations et l'usage de chaque pièce.",
      },
      highlights: {
        en: ["Room-by-room circuit planning", "Renovation-ready rough-in work", "Clean coordination with your project"],
        fr: ["Planification des circuits pièce par pièce", "Travaux d'ébauche adaptés aux rénovations", "Coordination soignée avec votre projet"],
      },
    },
    {
      id: "service-entrances",
      number: "02",
      image: "/media/residential-service-entrances-panels.png",
      label: { en: "Entrances & panels", fr: "Entrées & panneaux" },
      title: { en: "Service entrances and electrical panels", fr: "Entrées de service et panneaux électriques" },
      description: {
        en: "A clear path for service upgrades, panel capacity and the circuits your home needs today and in the future.",
        fr: "Une approche claire pour les entrées de service, la capacité du panneau et les circuits dont votre maison a besoin aujourd'hui et demain.",
      },
      highlights: {
        en: ["Panel capacity review", "Organized circuit upgrades", "Service work coordinated with the project"],
        fr: ["Vérification de la capacité du panneau", "Mise à niveau organisée des circuits", "Travaux de service coordonnés au projet"],
      },
    },
    {
      id: "lighting",
      number: "03",
      image: "/media/residential-lighting.png",
      label: { en: "Lighting", fr: "Éclairage" },
      title: { en: "Interior and exterior lighting", fr: "Éclairage intérieur et extérieur" },
      description: {
        en: "Lighting that gives living spaces, entrances and exterior paths the comfort, visibility and finish they deserve.",
        fr: "Un éclairage qui offre aux espaces de vie, aux entrées et aux parcours extérieurs le confort, la visibilité et la finition souhaités.",
      },
      highlights: {
        en: ["Layered room lighting", "Exterior and landscape lighting", "Controls matched to daily routines"],
        fr: ["Éclairage adapté à chaque pièce", "Éclairage extérieur et paysager", "Commandes adaptées aux habitudes"],
      },
    },
    {
      id: "heating",
      number: "04",
      image: "/media/residential-heating-heated-floors.png",
      label: { en: "Heating & heated floors", fr: "Chauffage & planchers" },
      title: { en: "Electric heating and heated floors", fr: "Chauffage électrique et planchers chauffants" },
      description: {
        en: "Comfort-focused electrical heating and floor-warming installations for the rooms where it matters most.",
        fr: "Des installations de chauffage électrique et de planchers chauffants axées sur le confort, là où elles comptent le plus.",
      },
      highlights: {
        en: ["Heated-floor installation", "Dedicated thermostat controls", "Planning around flooring and finish work"],
        fr: ["Installation de planchers chauffants", "Commandes thermostatiques dédiées", "Planification avec les finis de plancher"],
      },
    },
    {
      id: "smart-home",
      number: "05",
      image: "/media/residential-smart-home-controls.png",
      label: { en: "Smart-home controls", fr: "Domotique" },
      title: { en: "Home automation, controls and smart-home systems", fr: "Domotique, commandes et systèmes intelligents" },
      description: {
        en: "Thoughtful controls for lighting, comfort and connected systems—configured around how your household actually lives.",
        fr: "Des commandes réfléchies pour l'éclairage, le confort et les systèmes connectés, configurées selon votre quotidien.",
      },
      highlights: {
        en: ["Lighting and comfort controls", "Tidy low-voltage integration", "Simple, practical system setup"],
        fr: ["Commandes d'éclairage et de confort", "Intégration soignée du basse tension", "Configuration simple et pratique"],
      },
    },
    {
      id: "cabling",
      number: "06",
      image: "/media/residential-data-audio-video-cabling.png",
      label: { en: "Data & media cabling", fr: "Câblage données & média" },
      title: { en: "Data, telephone, audio and video cabling", fr: "Câblage de données, téléphonie, audio et vidéo" },
      description: {
        en: "Organized infrastructure for reliable home networking, phone, audio and video connections without visible clutter.",
        fr: "Une infrastructure organisée pour des connexions fiables de données, téléphonie, audio et vidéo sans encombrement visuel.",
      },
      highlights: {
        en: ["Structured data cabling", "Audio and video connections", "Neat, accessible equipment layout"],
        fr: ["Câblage de données structuré", "Connexions audio et vidéo", "Disposition nette et accessible des équipements"],
      },
    },
    {
      id: "security",
      number: "07",
      image: "/media/residential-security-fire-surveillance.png",
      label: { en: "Security & surveillance", fr: "Sécurité & surveillance" },
      title: { en: "Security, fire and surveillance systems", fr: "Systèmes de sécurité, d'incendie et de surveillance" },
      description: {
        en: "Discreet, carefully installed protection systems that help you stay connected to what matters at home.",
        fr: "Des systèmes de protection discrets et soigneusement installés qui vous aident à rester connecté à ce qui compte à la maison.",
      },
      highlights: {
        en: ["Intrusion and monitoring connections", "Fire detection devices", "Considerate camera placement"],
        fr: ["Raccordements d'intrusion et de surveillance", "Dispositifs de détection d'incendie", "Positionnement réfléchi des caméras"],
      },
    },
    {
      id: "outdoor",
      number: "08",
      image: "/media/residential-pool-spa-outdoor.png",
      label: { en: "Pools, spas & outdoors", fr: "Piscines, spas & extérieur" },
      title: { en: "Electrical work for pools, spas and outdoor spaces", fr: "Travaux électriques pour piscines, spas et espaces extérieurs" },
      description: {
        en: "Outdoor electrical work designed around the spaces where your household gathers, relaxes and hosts.",
        fr: "Des travaux électriques extérieurs conçus autour des espaces où votre foyer se rassemble, se détend et reçoit.",
      },
      highlights: {
        en: ["Pool and spa connections", "Weather-conscious outdoor work", "Landscape and patio lighting"],
        fr: ["Raccordements de piscine et de spa", "Travaux extérieurs adaptés aux conditions", "Éclairage de patio et paysager"],
      },
    },
    {
      id: "generators",
      number: "09",
      image: "/media/residential-generators.png",
      label: { en: "Generators", fr: "Génératrices" },
      title: { en: "Generator installation and repair", fr: "Installation et réparation de génératrices" },
      description: {
        en: "Backup-power installations and repairs planned with the home, its transfer equipment and the systems you need to protect.",
        fr: "Des installations et réparations d'alimentation de secours planifiées selon la maison, l'équipement de transfert et les systèmes à protéger.",
      },
      highlights: {
        en: ["Backup-power planning", "Transfer equipment coordination", "Generator diagnostics and repairs"],
        fr: ["Planification de l'alimentation de secours", "Coordination de l'équipement de transfert", "Diagnostic et réparation de génératrices"],
      },
    },
  ],
};

// ─── Commercial ──────────────────────────────────────────────────────────────
const commercial: ServiceWorkExplorerData = {
  serviceId: "commercial",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the space, planned work and location. The team can discuss scope and next steps for your commercial project.",
    fr: "Décrivez l'espace, les travaux prévus et l'emplacement. L'équipe pourra discuter de la portée et des prochaines étapes pour votre projet commercial.",
  },
  items: [
    {
      id: "tenant-fit-out",
      number: "01",
      image: "/media/service-commercial-01.png",
      label: { en: "Tenant fit-out", fr: "Aménagement locatif" },
      title: { en: "Tenant fit-out and commercial build-out", fr: "Aménagement locatif et construction commerciale" },
      description: {
        en: "Electrical rough-in and finishing for new commercial tenants, planned around lease schedules, occupancy dates and space use.",
        fr: "Travaux d'ébauche et de finition électrique pour nouveaux locataires, planifiés selon les échéanciers de bail, dates d'occupation et usage des espaces.",
      },
      highlights: {
        en: ["Circuit planning by zone and use", "Code-compliant rough-in", "Coordinated with general contractor"],
        fr: ["Planification des circuits par zone et usage", "Travaux d'ébauche conformes au code", "Coordination avec l'entrepreneur général"],
      },
    },
    {
      id: "lighting",
      number: "02",
      image: "/media/service-commercial-02.png",
      label: { en: "Lighting & controls", fr: "Éclairage & commandes" },
      title: { en: "Commercial lighting and lighting controls", fr: "Éclairage commercial et commandes d'éclairage" },
      description: {
        en: "Architectural, ambient and task lighting designed for commercial spaces—with controls that match the operation.",
        fr: "Éclairage architectural, ambiant et fonctionnel conçu pour les espaces commerciaux—avec des commandes adaptées à l'exploitation.",
      },
      highlights: {
        en: ["LED and architectural lighting", "Occupancy and daylight controls", "Emergency and exit lighting"],
        fr: ["Éclairage DEL et architectural", "Commandes d'occupation et de lumière naturelle", "Éclairage de secours et de sortie"],
      },
    },
    {
      id: "panels-distribution",
      number: "03",
      image: "/media/service-commercial-03.png",
      label: { en: "Panels & distribution", fr: "Panneaux & distribution" },
      title: { en: "Electrical panels and power distribution", fr: "Panneaux électriques et distribution de puissance" },
      description: {
        en: "Panel upgrades, sub-panel additions and power distribution planned around the load demands of your commercial operation.",
        fr: "Mises à niveau de panneaux, ajouts de sous-panneaux et distribution de puissance planifiés en fonction des besoins en charge de votre exploitation.",
      },
      highlights: {
        en: ["Load analysis and panel sizing", "Sub-panel additions", "Organized circuit labelling"],
        fr: ["Analyse de charge et dimensionnement", "Ajouts de sous-panneaux", "Étiquetage organisé des circuits"],
      },
    },
    {
      id: "data-cabling",
      number: "04",
      image: "/media/service-commercial-04.png",
      label: { en: "Data & structured cabling", fr: "Données & câblage structuré" },
      title: { en: "Data networks and structured cabling", fr: "Réseaux de données et câblage structuré" },
      description: {
        en: "Reliable data and network infrastructure for offices, retail and commercial spaces, installed cleanly and documented clearly.",
        fr: "Infrastructure fiable de données et de réseau pour bureaux, commerces et espaces commerciaux, installée proprement et documentée clairement.",
      },
      highlights: {
        en: ["Cat6 and fibre cabling", "Clean rack and patch panel work", "Network infrastructure planning"],
        fr: ["Câblage Cat6 et fibre", "Travaux propres de baie et de panneau de brassage", "Planification d'infrastructure réseau"],
      },
    },
    {
      id: "ev-charging",
      number: "05",
      image: "/media/service-commercial-05.png",
      label: { en: "EV charging stations", fr: "Bornes de recharge VE" },
      title: { en: "Commercial EV charging station installation", fr: "Installation de bornes de recharge VE commerciales" },
      description: {
        en: "Level 2 and DC fast-charge station installation for parking facilities, retail and office properties, with load management.",
        fr: "Installation de bornes de niveau 2 et de recharge rapide CC pour stationnements, commerces et immeubles de bureaux, avec gestion de charge.",
      },
      highlights: {
        en: ["Load management and capacity review", "Level 2 and DC fast-charge", "Roulez vert rebate support"],
        fr: ["Gestion de charge et vérification de capacité", "Niveau 2 et recharge rapide CC", "Soutien aux remboursements Roulez vert"],
      },
    },
    {
      id: "hvac-equipment",
      number: "06",
      image: "/media/service-commercial-06.png",
      label: { en: "HVAC & equipment", fr: "CVC & équipements" },
      title: { en: "HVAC and mechanical equipment connections", fr: "Raccordements CVC et équipements mécaniques" },
      description: {
        en: "Electrical connections for heating, cooling and ventilation equipment, coordinated with mechanical contractors.",
        fr: "Raccordements électriques pour équipements de chauffage, climatisation et ventilation, coordonnés avec les entrepreneurs mécaniques.",
      },
      highlights: {
        en: ["Dedicated circuits for equipment", "Coordinated with mechanical trades", "Code-compliant connections"],
        fr: ["Circuits dédiés aux équipements", "Coordination avec les corps de métier mécaniques", "Raccordements conformes au code"],
      },
    },
    {
      id: "signage-displays",
      number: "07",
      image: "/media/service-commercial-07.png",
      label: { en: "Signage & displays", fr: "Affichage & présentoirs" },
      title: { en: "Commercial signage and display electrical work", fr: "Travaux électriques pour affichage et présentoirs commerciaux" },
      description: {
        en: "Electrical supply and connections for illuminated signs, display cases, digital screens and retail fixtures.",
        fr: "Alimentation et raccordements électriques pour enseignes lumineuses, vitrines, écrans numériques et présentoirs commerciaux.",
      },
      highlights: {
        en: ["Dedicated sign circuits", "Display and showcase connections", "Clean concealed wiring"],
        fr: ["Circuits dédiés aux enseignes", "Raccordements de vitrines et présentoirs", "Câblage dissimulé et propre"],
      },
    },
    {
      id: "preventive-maintenance",
      number: "08",
      image: "/media/service-commercial-08.png",
      label: { en: "Preventive maintenance", fr: "Entretien préventif" },
      title: { en: "Preventive electrical maintenance for commercial properties", fr: "Entretien électrique préventif pour immeubles commerciaux" },
      description: {
        en: "Scheduled inspection and maintenance programs that keep commercial electrical systems operating safely and efficiently.",
        fr: "Programmes d'inspection et d'entretien planifiés qui maintiennent les systèmes électriques commerciaux en sécurité et efficacement.",
      },
      highlights: {
        en: ["Scheduled inspection programs", "Panel and connection testing", "Maintenance reporting"],
        fr: ["Programmes d'inspection planifiés", "Tests de panneaux et connexions", "Rapports d'entretien"],
      },
    },
  ],
};

// ─── Industrial ──────────────────────────────────────────────────────────────
const industrial: ServiceWorkExplorerData = {
  serviceId: "industrial",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the facility, equipment and work required. The team can discuss scope, shutdown planning and next steps.",
    fr: "Décrivez l'installation, l'équipement et les travaux requis. L'équipe pourra discuter de la portée, de la planification des arrêts et des prochaines étapes.",
  },
  items: [
    {
      id: "service-entrances",
      number: "01",
      image: "/media/service-industrial-01.png",
      label: { en: "Service entrances & panels", fr: "Entrées de service & panneaux" },
      title: { en: "Industrial service entrances and main distribution panels", fr: "Entrées de service industrielles et panneaux de distribution principaux" },
      description: {
        en: "High-capacity service entrances, main distribution panels and switchgear for manufacturing plants and industrial facilities.",
        fr: "Entrées de service haute capacité, panneaux de distribution principaux et appareillage de commutation pour usines et installations industrielles.",
      },
      highlights: {
        en: ["600V service and distribution", "Main switchgear coordination", "Utility and hydro-Québec coordination"],
        fr: ["Service et distribution 600V", "Coordination de l'appareillage principal", "Coordination avec Hydro-Québec"],
      },
    },
    {
      id: "three-phase-wiring",
      number: "02",
      image: "/media/service-industrial-02.png",
      label: { en: "Three-phase wiring", fr: "Câblage triphasé" },
      title: { en: "Three-phase power wiring and conduit installation", fr: "Câblage d'alimentation triphasée et installation de conduits" },
      description: {
        en: "Conduit, tray and three-phase wiring systems for manufacturing and process equipment, planned around production schedules.",
        fr: "Conduits, chemins de câbles et systèmes de câblage triphasé pour équipements de fabrication et de procédé, planifiés autour des calendriers de production.",
      },
      highlights: {
        en: ["EMT, rigid and tray systems", "Production schedule coordination", "Clean, organized routing"],
        fr: ["Systèmes EMT, rigide et chemin de câbles", "Coordination avec le calendrier de production", "Acheminement propre et organisé"],
      },
    },
    {
      id: "mcc-controls",
      number: "03",
      image: "/media/service-industrial-03.png",
      label: { en: "Motor control centers", fr: "Centres de commande moteurs" },
      title: { en: "Motor control centers and industrial controls", fr: "Centres de commande moteurs et commandes industrielles" },
      description: {
        en: "MCC installation, starter and drive connections, and control panel work for industrial machinery and process equipment.",
        fr: "Installation de CCM, raccordements de démarreurs et de variateurs, et travaux de panneaux de commande pour machinerie industrielle et équipements de procédé.",
      },
      highlights: {
        en: ["MCC installation and wiring", "VFD and starter connections", "Control panel fabrication support"],
        fr: ["Installation et câblage de CCM", "Raccordements de variateurs et démarreurs", "Soutien à la fabrication de panneaux de commande"],
      },
    },
    {
      id: "thermography",
      number: "04",
      image: "/media/service-industrial-04.png",
      label: { en: "Thermographic inspection", fr: "Inspection thermographique" },
      title: { en: "Industrial infrared thermographic inspection", fr: "Inspection thermographique infrarouge industrielle" },
      description: {
        en: "Scheduled thermographic inspections of industrial electrical equipment to identify hot spots before they cause failures or fires.",
        fr: "Inspections thermographiques planifiées des équipements électriques industriels pour identifier les points chauds avant qu'ils ne causent des pannes ou incendies.",
      },
      highlights: {
        en: ["FLIR-certified scanning", "Written inspection report", "Corrective action recommendations"],
        fr: ["Balayage certifié FLIR", "Rapport d'inspection écrit", "Recommandations de mesures correctives"],
      },
    },
    {
      id: "service-entrance-upgrade",
      number: "05",
      image: "/media/service-industrial-05.png",
      label: { en: "Transformer & metering", fr: "Transformateur & comptage" },
      title: { en: "Industrial transformer and metering installations", fr: "Installations de transformateurs et de comptage industriels" },
      description: {
        en: "Transformer sizing, installation and metering for industrial loads, coordinated with the utility and project timeline.",
        fr: "Dimensionnement, installation et comptage de transformateurs pour charges industrielles, coordonnés avec le distributeur et l'échéancier du projet.",
      },
      highlights: {
        en: ["Transformer sizing and installation", "Utility metering coordination", "Load growth planning"],
        fr: ["Dimensionnement et installation de transformateurs", "Coordination du comptage avec le distributeur", "Planification de la croissance de charge"],
      },
    },
    {
      id: "emergency-power",
      number: "06",
      image: "/media/service-industrial-06.png",
      label: { en: "Emergency & backup power", fr: "Alimentation de secours" },
      title: { en: "Industrial emergency and backup power systems", fr: "Systèmes d'alimentation de secours industriels" },
      description: {
        en: "Generator, UPS and automatic transfer switch installations for industrial facilities requiring continuous or critical power.",
        fr: "Installations de génératrices, onduleurs et commutateurs de transfert automatique pour installations industrielles nécessitant une alimentation continue ou critique.",
      },
      highlights: {
        en: ["Standby generator installation", "ATS and transfer switching", "Critical load identification"],
        fr: ["Installation de génératrice de secours", "Commutateurs ATS et de transfert", "Identification des charges critiques"],
      },
    },
  ],
};

// ─── Maintenance & Emergency ──────────────────────────────────────────────────
const maintenance: ServiceWorkExplorerData = {
  serviceId: "maintenance",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the issue, building and location. For emergencies, call 514-717-9277 directly for immediate response.",
    fr: "Décrivez le problème, le bâtiment et l'emplacement. Pour les urgences, appelez le 514-717-9277 directement pour une réponse immédiate.",
  },
  items: [
    {
      id: "planned-maintenance",
      number: "01",
      image: "/media/service-maintenance-01.png",
      label: { en: "Planned maintenance", fr: "Entretien planifié" },
      title: { en: "Scheduled electrical maintenance programs", fr: "Programmes d'entretien électrique planifiés" },
      description: {
        en: "Structured inspection and maintenance programs that identify issues before they become failures, with written reports after each visit.",
        fr: "Programmes d'inspection et d'entretien structurés qui identifient les problèmes avant qu'ils ne deviennent des pannes, avec rapports écrits après chaque visite.",
      },
      highlights: {
        en: ["Custom maintenance schedules", "Panel and connection inspection", "Written condition reports"],
        fr: ["Calendriers d'entretien personnalisés", "Inspection de panneaux et connexions", "Rapports d'état écrits"],
      },
    },
    {
      id: "emergency-response",
      number: "02",
      image: "/media/service-maintenance-02.png",
      label: { en: "Emergency response", fr: "Intervention d'urgence" },
      title: { en: "24/7 electrical emergency response", fr: "Intervention électrique d'urgence 24/7" },
      description: {
        en: "Rapid on-site response for power outages, electrical faults and urgent safety hazards—available around the clock.",
        fr: "Intervention rapide sur site pour pannes de courant, défauts électriques et dangers urgents pour la sécurité—disponible en tout temps.",
      },
      highlights: {
        en: ["24/7 direct emergency line", "Rapid on-site response", "Hazard isolation and safe restoration"],
        fr: ["Ligne d'urgence directe 24/7", "Intervention rapide sur site", "Isolation du danger et restauration sécurisée"],
      },
    },
    {
      id: "troubleshooting",
      number: "03",
      image: "/media/service-maintenance-03.png",
      label: { en: "Troubleshooting & diagnosis", fr: "Dépannage & diagnostic" },
      title: { en: "Electrical troubleshooting and fault diagnosis", fr: "Dépannage électrique et diagnostic de pannes" },
      description: {
        en: "Systematic fault-finding for intermittent problems, tripping breakers, partial outages and unexplained electrical issues.",
        fr: "Recherche systématique de pannes pour problèmes intermittents, disjoncteurs qui sautent, pannes partielles et problèmes électriques inexpliqués.",
      },
      highlights: {
        en: ["Systematic fault isolation", "Partial and intermittent outage diagnosis", "Clear explanation of findings"],
        fr: ["Isolation systématique des pannes", "Diagnostic de pannes partielles et intermittentes", "Explication claire des constatations"],
      },
    },
    {
      id: "preventive-maintenance",
      number: "04",
      image: "/media/service-maintenance-04.png",
      label: { en: "Preventive maintenance", fr: "Maintenance préventive" },
      title: { en: "Preventive maintenance for equipment and systems", fr: "Maintenance préventive des équipements et systèmes" },
      description: {
        en: "Condition-based maintenance on motors, starters, panels and connections to extend service life and reduce unplanned downtime.",
        fr: "Maintenance basée sur l'état des moteurs, démarreurs, panneaux et connexions pour prolonger la durée de vie et réduire les arrêts non planifiés.",
      },
      highlights: {
        en: ["Motor and starter servicing", "Connection tightening and cleaning", "Predictive condition monitoring"],
        fr: ["Entretien de moteurs et démarreurs", "Serrage et nettoyage des connexions", "Surveillance prédictive de l'état"],
      },
    },
    {
      id: "power-quality",
      number: "05",
      image: "/media/service-maintenance-05.png",
      label: { en: "Power quality", fr: "Qualité d'énergie" },
      title: { en: "Power quality monitoring and correction", fr: "Surveillance et correction de la qualité d'énergie" },
      description: {
        en: "Monitoring and analysis of voltage, harmonic distortion and power factor to protect sensitive equipment and reduce energy waste.",
        fr: "Surveillance et analyse de la tension, de la distorsion harmonique et du facteur de puissance pour protéger les équipements sensibles et réduire le gaspillage d'énergie.",
      },
      highlights: {
        en: ["Power quality analysis", "Harmonic and voltage monitoring", "Corrective equipment recommendations"],
        fr: ["Analyse de la qualité d'énergie", "Surveillance des harmoniques et de la tension", "Recommandations d'équipement correctif"],
      },
    },
    {
      id: "repairs",
      number: "06",
      image: "/media/service-maintenance-06.png",
      label: { en: "Repairs & restoration", fr: "Réparations & restauration" },
      title: { en: "Electrical repairs and system restoration", fr: "Réparations électriques et restauration des systèmes" },
      description: {
        en: "Targeted repairs to restore safe, reliable electrical operation after faults, damage or equipment failure.",
        fr: "Réparations ciblées pour rétablir un fonctionnement électrique sûr et fiable après des pannes, dommages ou défaillances d'équipement.",
      },
      highlights: {
        en: ["Breaker and panel repairs", "Wiring and connection restoration", "Post-repair inspection and testing"],
        fr: ["Réparations de disjoncteurs et panneaux", "Restauration du câblage et des connexions", "Inspection et essais après réparation"],
      },
    },
  ],
};

// ─── Generators ──────────────────────────────────────────────────────────────
const generators: ServiceWorkExplorerData = {
  serviceId: "generators",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the property, power requirements and existing electrical setup. The team can discuss backup power options and next steps.",
    fr: "Décrivez la propriété, les besoins en alimentation et l'installation électrique existante. L'équipe pourra discuter des options d'alimentation de secours et des prochaines étapes.",
  },
  items: [
    {
      id: "residential-generator",
      number: "01",
      image: "/media/service-generator-01.png",
      label: { en: "Residential standby", fr: "Secours résidentiel" },
      title: { en: "Residential standby generator installation", fr: "Installation de génératrice de secours résidentielle" },
      description: {
        en: "Standby generator installation for homes, with automatic transfer switching and connection to natural gas or propane supply.",
        fr: "Installation de génératrice de secours pour résidences, avec commutation de transfert automatique et raccordement au gaz naturel ou au propane.",
      },
      highlights: {
        en: ["Automatic transfer switch installation", "Natural gas and propane connections", "Load calculation and sizing"],
        fr: ["Installation de commutateur de transfert automatique", "Raccordements gaz naturel et propane", "Calcul de charge et dimensionnement"],
      },
    },
    {
      id: "transfer-switch",
      number: "02",
      image: "/media/service-generator-02.png",
      label: { en: "Transfer switches", fr: "Commutateurs de transfert" },
      title: { en: "Automatic transfer switch installation", fr: "Installation de commutateur de transfert automatique" },
      description: {
        en: "ATS installation for seamless, automatic switching between utility power and generator supply when an outage occurs.",
        fr: "Installation de commutateur ATS pour une commutation automatique et transparente entre l'alimentation du réseau et la génératrice lors d'une panne.",
      },
      highlights: {
        en: ["Automatic and manual transfer options", "Critical load selection", "Code-compliant installation"],
        fr: ["Options de transfert automatique et manuel", "Sélection des charges critiques", "Installation conforme au code"],
      },
    },
    {
      id: "maintenance-testing",
      number: "03",
      image: "/media/service-generator-03.png",
      label: { en: "Maintenance & testing", fr: "Entretien & essais" },
      title: { en: "Generator maintenance and load testing", fr: "Entretien et essais en charge des génératrices" },
      description: {
        en: "Scheduled maintenance and load-bank testing to ensure generators are ready to perform when utility power fails.",
        fr: "Entretien planifié et essais en charge pour s'assurer que les génératrices sont prêtes à fonctionner lors d'une panne du réseau.",
      },
      highlights: {
        en: ["Scheduled maintenance programs", "Load-bank testing", "Performance documentation"],
        fr: ["Programmes d'entretien planifiés", "Essais en charge", "Documentation de performance"],
      },
    },
    {
      id: "commercial-generator",
      number: "04",
      image: "/media/service-generator-04.png",
      label: { en: "Commercial & industrial", fr: "Commercial & industriel" },
      title: { en: "Commercial and industrial generator systems", fr: "Systèmes de génératrices commerciaux et industriels" },
      description: {
        en: "Large-format generator installations for commercial and industrial facilities requiring continuous or critical backup power.",
        fr: "Installations de génératrices grand format pour installations commerciales et industrielles nécessitant une alimentation de secours continue ou critique.",
      },
      highlights: {
        en: ["High-capacity generator sizing", "Paralleling and redundancy options", "Fuel system coordination"],
        fr: ["Dimensionnement de génératrices haute capacité", "Options de mise en parallèle et redondance", "Coordination des systèmes de carburant"],
      },
    },
  ],
};

// ─── Infrared Thermography ────────────────────────────────────────────────────
const thermography: ServiceWorkExplorerData = {
  serviceId: "thermography",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the facility and electrical equipment to be inspected. The team can discuss scheduling, report format and next steps.",
    fr: "Décrivez l'installation et les équipements électriques à inspecter. L'équipe pourra discuter de la planification, du format du rapport et des prochaines étapes.",
  },
  items: [
    {
      id: "panel-scanning",
      number: "01",
      image: "/media/service-thermography-01.png",
      label: { en: "Panel scanning", fr: "Balayage de panneaux" },
      title: { en: "Electrical panel infrared scanning", fr: "Balayage infrarouge de panneaux électriques" },
      description: {
        en: "Thermal scanning of electrical panels and distribution equipment to detect overloaded circuits, loose connections and failing components.",
        fr: "Balayage thermique des panneaux électriques et équipements de distribution pour détecter les circuits surchargés, connexions desserrées et composants défaillants.",
      },
      highlights: {
        en: ["Full panel thermal scan", "Hot spot identification and grading", "Written report with thermal images"],
        fr: ["Balayage thermique complet du panneau", "Identification et classification des points chauds", "Rapport écrit avec images thermiques"],
      },
    },
    {
      id: "inspection-report",
      number: "02",
      image: "/media/service-thermography-02.png",
      label: { en: "Inspection reports", fr: "Rapports d'inspection" },
      title: { en: "Thermographic inspection reports", fr: "Rapports d'inspection thermographique" },
      description: {
        en: "Detailed written reports with thermal and visual images, severity grading, and corrective action recommendations for each finding.",
        fr: "Rapports écrits détaillés avec images thermiques et visuelles, classification de la gravité et recommandations de mesures correctives pour chaque constatation.",
      },
      highlights: {
        en: ["Thermal and visual image pairs", "Severity grading by finding", "Priority corrective action list"],
        fr: ["Paires d'images thermiques et visuelles", "Classification de gravité par constatation", "Liste des mesures correctives prioritaires"],
      },
    },
    {
      id: "switchgear-inspection",
      number: "03",
      image: "/media/service-thermography-03.png",
      label: { en: "Switchgear inspection", fr: "Inspection d'appareillage" },
      title: { en: "Industrial switchgear thermographic inspection", fr: "Inspection thermographique d'appareillage industriel" },
      description: {
        en: "Thermal inspection of industrial switchgear, bus bars, disconnects and high-voltage equipment during normal operation.",
        fr: "Inspection thermique des appareillages industriels, jeux de barres, sectionnneurs et équipements haute tension pendant le fonctionnement normal.",
      },
      highlights: {
        en: ["Switchgear and bus bar scanning", "High-voltage equipment inspection", "Shutdown planning for follow-up repairs"],
        fr: ["Balayage d'appareillage et jeux de barres", "Inspection d'équipements haute tension", "Planification d'arrêt pour réparations"],
      },
    },
    {
      id: "motor-drives",
      number: "04",
      image: "/media/service-thermography-04.png",
      label: { en: "Motors & drives", fr: "Moteurs & variateurs" },
      title: { en: "Motor and drive connection thermographic inspection", fr: "Inspection thermographique des connexions de moteurs et variateurs" },
      description: {
        en: "Thermal scanning of motor control centers, variable frequency drives and motor connections to identify issues under load.",
        fr: "Balayage thermique des centres de commande moteurs, variateurs de fréquence et connexions de moteurs pour identifier les problèmes sous charge.",
      },
      highlights: {
        en: ["MCC and drive thermal scanning", "Under-load condition inspection", "Bearing and winding temperature review"],
        fr: ["Balayage thermique de CCM et variateurs", "Inspection sous conditions de charge", "Révision de température des roulements et enroulements"],
      },
    },
    {
      id: "reporting-compliance",
      number: "05",
      image: "/media/service-thermography-05.png",
      label: { en: "Compliance reporting", fr: "Rapports de conformité" },
      title: { en: "Insurance and compliance thermography reporting", fr: "Rapports thermographiques d'assurance et de conformité" },
      description: {
        en: "Certified inspection reports formatted for insurance requirements, building compliance and regulatory submissions.",
        fr: "Rapports d'inspection certifiés formatés pour les exigences d'assurance, la conformité du bâtiment et les soumissions réglementaires.",
      },
      highlights: {
        en: ["Insurance-accepted report format", "Certification and sign-off included", "Follow-up inspection scheduling"],
        fr: ["Format de rapport accepté par les assureurs", "Certification et signature incluses", "Planification des inspections de suivi"],
      },
    },
  ],
};

// ─── Fire & Security ──────────────────────────────────────────────────────────
const security: ServiceWorkExplorerData = {
  serviceId: "security",
  eyebrow: { en: "Published work in this category", fr: "Travaux offerts dans cette catégorie" },
  heading: { en: "An overview of available work", fr: "Un aperçu des travaux offerts" },
  lead: {
    en: "Describe the building, existing systems and scope of work. The team can discuss installation options and next steps.",
    fr: "Décrivez le bâtiment, les systèmes existants et la portée des travaux. L'équipe pourra discuter des options d'installation et des prochaines étapes.",
  },
  items: [
    {
      id: "intrusion-alarms",
      number: "01",
      image: "/media/security-intrusion-alarm-systems.png",
      label: { en: "Intrusion alarm systems", fr: "Systèmes d'alarme d'intrusion" },
      title: { en: "Intrusion alarm system electrical connections", fr: "Raccordements électriques de systèmes d'alarme d'intrusion" },
      description: {
        en: "Electrical wiring and connections for intrusion detection systems, motion sensors and alarm panels in residential and commercial buildings.",
        fr: "Câblage électrique et raccordements pour systèmes de détection d'intrusion, détecteurs de mouvement et panneaux d'alarme dans les bâtiments résidentiels et commerciaux.",
      },
      highlights: {
        en: ["Sensor and detector wiring", "Control panel connections", "Discreet concealed installation"],
        fr: ["Câblage de capteurs et détecteurs", "Raccordements de panneaux de commande", "Installation discrète et dissimulée"],
      },
    },
    {
      id: "fire-detection",
      number: "02",
      image: "/media/security-fire-detection-systems.png",
      label: { en: "Fire detection", fr: "Détection incendie" },
      title: { en: "Fire detection and alarm system wiring", fr: "Câblage de systèmes de détection et d'alarme incendie" },
      description: {
        en: "Electrical installation for fire detectors, smoke alarms, heat sensors and fire alarm panels—meeting code and building requirements.",
        fr: "Installation électrique des détecteurs d'incendie, avertisseurs de fumée, détecteurs de chaleur et panneaux d'alarme incendie—conformément au code et aux exigences du bâtiment.",
      },
      highlights: {
        en: ["Smoke and heat detector wiring", "Fire alarm panel connections", "Code and building permit compliance"],
        fr: ["Câblage de détecteurs de fumée et de chaleur", "Raccordements de panneaux d'alarme incendie", "Conformité au code et aux permis de construction"],
      },
    },
    {
      id: "surveillance",
      number: "03",
      image: "/media/security-surveillance-connections.png",
      label: { en: "Surveillance & cameras", fr: "Surveillance & caméras" },
      title: { en: "Surveillance camera system electrical connections", fr: "Raccordements électriques de systèmes de caméras de surveillance" },
      description: {
        en: "Power and data cabling for CCTV and IP camera systems, NVR and DVR connections, and PoE network infrastructure.",
        fr: "Câblage d'alimentation et de données pour systèmes CCTV et caméras IP, raccordements NVR et DVR, et infrastructure réseau PoE.",
      },
      highlights: {
        en: ["Camera power and data cabling", "NVR and DVR connections", "PoE network infrastructure"],
        fr: ["Câblage d'alimentation et de données pour caméras", "Raccordements NVR et DVR", "Infrastructure réseau PoE"],
      },
    },
    {
      id: "access-intercom",
      number: "04",
      image: "/media/service-security-04.png",
      label: { en: "Access & intercom", fr: "Accès & interphonie" },
      title: { en: "Access control and intercom system installation", fr: "Installation de systèmes de contrôle d'accès et d'interphonie" },
      description: {
        en: "Electrical connections for access control readers, door strikes, intercom panels and emergency lighting at building entrances.",
        fr: "Raccordements électriques pour lecteurs de contrôle d'accès, gâches électriques, panneaux d'interphonie et éclairage de secours aux entrées de bâtiment.",
      },
      highlights: {
        en: ["Access control reader wiring", "Door strike and lock connections", "Emergency exit lighting integration"],
        fr: ["Câblage de lecteurs de contrôle d'accès", "Raccordements de gâches et serrures", "Intégration de l'éclairage de sortie de secours"],
      },
    },
    {
      id: "electrical-review",
      number: "05",
      image: "/media/service-security-05.png",
      label: { en: "Electrical review", fr: "Révision électrique" },
      title: { en: "Electrical compatibility review for security systems", fr: "Révision de compatibilité électrique pour systèmes de sécurité" },
      description: {
        en: "Assessment of existing electrical infrastructure to confirm capacity, grounding and circuit compatibility for new security system integration.",
        fr: "Évaluation de l'infrastructure électrique existante pour confirmer la capacité, la mise à la terre et la compatibilité des circuits pour l'intégration de nouveaux systèmes de sécurité.",
      },
      highlights: {
        en: ["Capacity and grounding review", "Circuit compatibility assessment", "Integration planning report"],
        fr: ["Révision de capacité et de mise à la terre", "Évaluation de compatibilité des circuits", "Rapport de planification d'intégration"],
      },
    },
  ],
};

// ─── Lookup map ───────────────────────────────────────────────────────────────
export const serviceWorkExplorerData: Record<string, ServiceWorkExplorerData> = {
  residential,
  commercial,
  industrial,
  maintenance,
  generators,
  thermography,
  security,
};
