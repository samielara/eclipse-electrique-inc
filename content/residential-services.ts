import type { Locale } from "@/lib/routes";

export type ResidentialWorkItem = {
  id: string;
  number: string;
  image: string;
  label: { en: string; fr: string };
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
};

export const residentialServices: ResidentialWorkItem[] = [
  {
    id: "new-construction",
    number: "01",
    image: "/media/residential-consistent/new-construction.webp",
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
    image: "/media/residential-consistent/service-entrances.webp",
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
    image: "/media/residential-consistent/heating.webp",
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
    image: "/media/residential-consistent/smart-home.webp",
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
    image: "/media/residential-consistent/cabling.webp",
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
    image: "/media/residential-consistent/security.webp",
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
    image: "/media/residential-consistent/outdoor.webp",
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
    image: "/media/residential-consistent/generators.webp",
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
  {id:"troubleshooting",number:"10",image:"/media/service-residential-master.jpg",label:{en:"Troubleshooting & repairs",fr:"Diagnostic & réparations"},title:{en:"Residential electrical troubleshooting and repairs",fr:"Diagnostic et réparations électriques résidentiels"},description:{en:"Investigate flickering lights, tripping breakers and electrical faults with work suited to your home's existing installation.",fr:"Faites vérifier les lumières qui clignotent, les disjoncteurs qui déclenchent et les défauts de votre installation électrique."},highlights:{en:["Circuit and breaker diagnosis","Fault investigation","Repairs based on the inspection"],fr:["Diagnostic des circuits et disjoncteurs","Recherche de défauts","Réparations selon la vérification"]}},
  {id:"inspections",number:"11",image:"/media/residential-consistent/inspections.webp",label:{en:"Electrical inspections",fr:"Inspections électriques"},title:{en:"Residential electrical inspections",fr:"Inspections électriques résidentielles"},description:{en:"Review the condition of your electrical installation before renovations, a property project or an insurance-related request. Confirm the inspection scope and any reporting requirements with the team.",fr:"Vérifiez l'état de votre installation avant des rénovations, un projet immobilier ou une demande liée aux assurances. Confirmez la portée de l'inspection et les exigences de rapport avec l'équipe."},highlights:{en:["Existing installation review","Panels and visible circuit conditions","Findings and next steps"],fr:["Vérification de l'installation existante","État du panneau et des circuits visibles","Constats et prochaines étapes"]}},

];
export type ResidentialSeason = "winter" | "spring" | "summer" | "autumn";
// Set to a season to override the automatic Montréal calendar.
export const residentialSeasonOverride: ResidentialSeason | undefined = undefined;
const orders: Record<ResidentialSeason,string[]> = {
winter:["heating","troubleshooting","generators","service-entrances","new-construction","lighting","security","smart-home","inspections","cabling","outdoor"],
spring:["outdoor","inspections","new-construction","lighting","service-entrances","generators","troubleshooting","security","smart-home","heating","cabling"],
summer:["outdoor","lighting","new-construction","service-entrances","generators","troubleshooting","security","inspections","smart-home","cabling","heating"],
autumn:["heating","generators","inspections","lighting","service-entrances","troubleshooting","new-construction","security","smart-home","cabling","outdoor"]};
export function getResidentialSeason(date = new Date(), override = residentialSeasonOverride): ResidentialSeason {
 if(override && Object.hasOwn(orders,override)) return override;
 const month=Number(new Intl.DateTimeFormat("en",{timeZone:"America/Toronto",month:"numeric"}).format(date));
 return month===12 || month<=2 ? "winter" : month<=5 ? "spring" : month<=8 ? "summer" : "autumn";
}
export function getOrderedResidentialServices(season: ResidentialSeason) {
 return orders[season].map(id=>residentialServices.find(s=>s.id===id)!);
}
const frenchSlugs: Record<string,string> = {"new-construction":"construction-renovations","service-entrances":"entrees-panneaux","lighting":"eclairage","heating":"chauffage-planchers-chauffants","smart-home":"domotique","cabling":"cablage","security":"securite-surveillance","outdoor":"piscines-spas-exterieur","generators":"generatrices","troubleshooting":"diagnostic-reparations","inspections":"inspections"};
export function residentialServicePath(locale: Locale,id: string) {
 return locale==="fr" ? "/fr/services/electricien-residentiel/"+frenchSlugs[id] : "/en/services/residential-electrician/"+id;
}
