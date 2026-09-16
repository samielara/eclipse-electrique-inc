import type { Locale } from "@/lib/routes";

// Shared by the homepage teaser and full FAQ page to keep answers consistent.
export const customerFaq = {
  "en": [
    {
      "id": "services",
      "question": "What electrical services do you provide?",
      "answer": "Éclipse électrique inc. handles residential, commercial and industrial electrical work, lighting, panel work, maintenance, infrared thermography, security systems and generator installation or repair. Describe your property and project so we can confirm the right service."
    },
    {
      "id": "coverage",
      "question": "Do you serve Montréal, Laval and the South Shore?",
      "answer": "Our service area covers Greater Montréal, including Laval, the North Shore and the South Shore. Check the service-area page and provide your municipality, postal code and address when requesting an appointment so we can confirm coverage."
    },
    {
      "id": "cost",
      "question": "How much does an electrician visit or electrical project cost?",
      "answer": "Cost depends on the diagnosis, scope, materials, access and whether the request is urgent. Contact the office at 514-510-1112 with a description and photos for an assessment. Ask which visit, diagnostic or emergency fees apply and what the estimate includes before authorizing work."
    },
    {
      "id": "request",
      "question": "How do I request service or an estimate?",
      "answer": "Use Request service to prepare your enquiry, call 514-510-1112 or email yasser@eclipseelectrique.com. Include your address, property type, description, preferred timing and accessible photos. An online enquiry is not an emergency dispatch request; call 514-717-9277 for urgent help."
    },
    {
      "id": "emergency",
      "question": "How do I reach your 24/7 electrical emergency line?",
      "answer": "Call 514-717-9277 directly and describe the location and symptoms. The team can confirm availability and next steps based on the situation; arrival times are not guaranteed. For fire, smoke or immediate danger, move to safety and call 911."
    },
    {
      "id": "outage",
      "question": "Should I call Hydro-Québec or an electrician during a power outage?",
      "answer": "Check Hydro-Québec’s outage information to see whether your area is affected. If only part of your property has lost power or the problem persists after service is restored, contact an electrician. Stay away from damaged equipment and fallen wires; report immediate danger to 911."
    },
    {
      "id": "panel",
      "question": "Do I need to replace my electrical panel or upgrade to 200A?",
      "answer": "An assessment is appropriate for recurring breaker trips, an aging installation or planned additions such as an EV charger, heat pump or spa. These do not automatically require a 200A upgrade. The electrician checks the installation’s condition and calculates demand before recommending repairs, load management or a capacity upgrade."
    },
    {
      "id": "charging",
      "question": "Can I install an EV charger without replacing my electrical panel?",
      "answer": "Sometimes. Available capacity, charging requirements and the existing installation determine the options. A suitable load-management system may allow charging without a service upgrade. Provide your charger model, parking location and panel information so the installation can be assessed before equipment is purchased."
    },
    {
      "id": "renovation",
      "question": "Can you help with electrical work for renovations and additions?",
      "answer": "Yes. Residential work includes wiring, circuits, panels and interior or exterior lighting. Share your plans and the equipment you intend to add early, ideally before walls are closed, so the electrical scope and coordination with other trades can be discussed."
    },
    {
      "id": "business",
      "question": "Do you handle commercial and industrial electrical maintenance?",
      "answer": "Yes. Contact us about electrical distribution, lighting, equipment connections, diagnosis and maintenance for your facility. Include equipment details, operating hours and any shutdown restrictions so access and scheduling can be assessed."
    },
    {
      "id": "thermography",
      "question": "What is infrared thermography used for in an electrical installation?",
      "answer": "Thermography helps identify unusual heat patterns in electrical equipment for further investigation and preventive maintenance. Tell us which equipment must be examined and whether the request comes from an insurer or a maintenance plan. Confirm the inspection scope and report requirements with the team."
    },
    {
      "id": "generators",
      "question": "Do you install and repair backup generators?",
      "answer": "Yes. Give us the generator brand, model, fuel type, property type and the installation or repair needed. For an existing fault, describe any error message and when it occurs. The team will confirm whether the equipment and requested work are within scope."
    },
    {
      "id": "sizing",
      "question": "What size generator do I need, and how is it connected safely?",
      "answer": "Sizing depends on the circuits you want to support and their starting and running loads. Have the installation assessed for appropriate transfer equipment that isolates it from the utility grid. Never plug a generator into a wall outlet. Fuel-powered generators must operate outdoors, away from openings, following the manufacturer’s instructions."
    },
    {
      "id": "security",
      "question": "What information should I provide for security-system electrical work?",
      "answer": "Describe the building, existing equipment and whether you need work on alarms, cameras or access controls. Include available plans and system references. Confirm the electrical scope, compatibility and any separate monitoring or specialist requirements with the team."
    },
    {
      "id": "licence",
      "question": "What is your RBQ licence number?",
      "answer": "Éclipse électrique inc.’s RBQ licence number is 5582-0096-01 and its Québec enterprise number is 1165326209. You can use the RBQ register and CMEQ contractor directory to verify current information before awarding a project."
    },
    {
      "id": "prepare",
      "question": "How should I prepare for the electrician’s visit?",
      "answer": "List the symptoms and affected equipment, arrange access to the work area and gather relevant plans or previous reports. Photograph only equipment that is safely accessible; do not remove panel covers. Tell the team about access restrictions and equipment that cannot be interrupted."
    }
  ],
  "fr": [
    {
      "id": "services",
      "question": "Quels services électriques offrez-vous?",
      "answer": "Éclipse électrique inc. réalise des travaux électriques résidentiels, commerciaux et industriels, d’éclairage, de panneaux, d’entretien, de thermographie infrarouge, de systèmes de sécurité et de génératrices. Décrivez votre bâtiment et votre projet pour confirmer le service approprié."
    },
    {
      "id": "coverage",
      "question": "Desservez-vous Montréal, Laval et la Rive-Sud?",
      "answer": "Notre territoire couvre le Grand Montréal, notamment Laval, la Rive-Nord et la Rive-Sud. Consultez la page du territoire desservi et indiquez votre municipalité, votre code postal et votre adresse pour confirmer la couverture."
    },
    {
      "id": "cost",
      "question": "Combien coûte une visite ou un projet électrique?",
      "answer": "Le coût dépend du diagnostic, des travaux, des matériaux, de l’accès et du caractère urgent de la demande. Appelez le bureau au 514-510-1112 avec une description et des photos pour une évaluation. Confirmez les frais de visite, de diagnostic ou d’urgence et le contenu de la soumission avant d’autoriser les travaux."
    },
    {
      "id": "request",
      "question": "Comment demander un service ou une soumission?",
      "answer": "Utilisez Demander un service pour préparer votre demande, appelez le 514-510-1112 ou écrivez à yasser@eclipseelectrique.com. Indiquez l’adresse, le type de bâtiment, les travaux, l’échéancier et joignez des photos accessibles. Une demande en ligne ne déclenche pas une intervention d’urgence : appelez le 514-717-9277."
    },
    {
      "id": "emergency",
      "question": "Comment joindre votre ligne d’urgence électrique 24/7?",
      "answer": "Appelez directement le 514-717-9277 et décrivez le lieu et les symptômes. L’équipe pourra confirmer la disponibilité et la suite selon la situation; aucun délai d’arrivée n’est garanti. En cas d’incendie, de fumée ou de danger immédiat, mettez-vous à l’abri et appelez le 911."
    },
    {
      "id": "outage",
      "question": "Dois-je appeler Hydro-Québec ou un électricien lors d’une panne?",
      "answer": "Consultez Info-pannes d’Hydro-Québec pour vérifier si votre secteur est touché. Si une partie seulement du bâtiment est privée de courant ou si le problème persiste après le rétablissement, contactez un électricien. Éloignez-vous des équipements endommagés et des fils tombés; signalez un danger immédiat au 911."
    },
    {
      "id": "panel",
      "question": "Dois-je remplacer mon panneau électrique ou passer à 200 A?",
      "answer": "Une évaluation est utile lorsque des disjoncteurs déclenchent souvent, que l’installation vieillit ou qu’une borne, une thermopompe ou un spa est prévu. Cela n’exige pas automatiquement un passage à 200 A. L’électricien vérifie l’état de l’installation et calcule la demande avant de proposer une réparation, une gestion de charge ou une augmentation de capacité."
    },
    {
      "id": "charging",
      "question": "Puis-je installer une borne de recharge sans remplacer mon panneau?",
      "answer": "C’est parfois possible. La capacité disponible, les besoins de recharge et l’installation existante déterminent les options. Un système de gestion de charge approprié peut permettre la recharge sans augmentation de l’entrée électrique. Fournissez le modèle de borne, l’emplacement du stationnement et les renseignements du panneau avant d’acheter l’équipement."
    },
    {
      "id": "renovation",
      "question": "Pouvez-vous réaliser les travaux électriques d’une rénovation ou d’un agrandissement?",
      "answer": "Oui. Les travaux résidentiels comprennent le câblage, les circuits, les panneaux et l’éclairage intérieur ou extérieur. Transmettez vos plans et les appareils prévus dès le début, idéalement avant la fermeture des murs, pour discuter des travaux électriques et de la coordination avec les autres corps de métier."
    },
    {
      "id": "business",
      "question": "Offrez-vous l’entretien électrique commercial et industriel?",
      "answer": "Oui. Communiquez avec nous pour la distribution électrique, l’éclairage, le raccordement d’équipements, le diagnostic et l’entretien de vos installations. Précisez les équipements, les heures d’exploitation et les contraintes d’arrêt pour évaluer l’accès et la planification."
    },
    {
      "id": "thermography",
      "question": "À quoi sert la thermographie infrarouge d’une installation électrique?",
      "answer": "La thermographie aide à repérer des échauffements inhabituels dans les équipements électriques pour orienter le diagnostic et l’entretien préventif. Précisez les équipements à examiner et si la demande vient d’un assureur ou d’un plan d’entretien. Confirmez la portée de l’inspection et les exigences du rapport avec l’équipe."
    },
    {
      "id": "generators",
      "question": "Installez-vous et réparez-vous les génératrices de secours?",
      "answer": "Oui. Indiquez la marque, le modèle, le combustible, le type de bâtiment et l’installation ou la réparation souhaitée. Pour une panne, décrivez le message d’erreur et le moment où il apparaît. L’équipe confirmera la prise en charge de l’équipement et des travaux."
    },
    {
      "id": "sizing",
      "question": "Quelle puissance de génératrice faut-il et comment la raccorder de façon sécuritaire?",
      "answer": "La puissance dépend des circuits à alimenter et de leur demande au démarrage et en fonctionnement. Faites évaluer le raccordement et le dispositif de transfert qui isole l’installation du réseau. Ne branchez jamais une génératrice dans une prise murale. Une génératrice à combustible doit fonctionner dehors, loin des ouvertures, selon les instructions du fabricant."
    },
    {
      "id": "security",
      "question": "Quels renseignements fournir pour des travaux électriques de systèmes de sécurité?",
      "answer": "Décrivez le bâtiment, les équipements existants et les travaux concernant les alarmes, caméras ou contrôles d’accès. Joignez les plans et références disponibles. Confirmez avec l’équipe la portée électrique, la compatibilité et les besoins distincts de surveillance ou de spécialistes."
    },
    {
      "id": "licence",
      "question": "Quel est votre numéro de licence RBQ?",
      "answer": "Le numéro de licence RBQ d’Éclipse électrique inc. est 5582-0096-01 et son numéro d’entreprise du Québec est 1165326209. Consultez le registre de la RBQ et le répertoire de la CMEQ pour vérifier les renseignements actuels avant de confier un projet."
    },
    {
      "id": "prepare",
      "question": "Comment préparer la visite de l’électricien?",
      "answer": "Notez les symptômes et les appareils touchés, prévoyez l’accès à la zone de travail et rassemblez les plans ou rapports utiles. Photographiez uniquement les équipements accessibles sans danger; ne retirez pas les couvercles des panneaux. Signalez les restrictions d’accès et les équipements qui ne peuvent être interrompus."
    }
  ]
} satisfies Record<Locale, readonly { id: string; question: string; answer: string }[]>;

export const homeFaqIds = ["cost", "emergency", "panel"];
