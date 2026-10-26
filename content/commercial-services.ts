import type { Locale } from "@/lib/routes";
import type { ResidentialWorkItem } from "@/content/residential-services";

export const commercialServices: ResidentialWorkItem[] = [
 {id:"new-construction",number:"01",image:"/media/service-commercial-01.png",label:{en:"New construction",fr:"Construction neuve"},title:{en:"New construction of offices, shops, restaurants and stores",fr:"Construction neuve de bureaux, boutiques, restaurants et magasins"},description:{en:"Electrical installations planned around the layout, equipment and operational needs of new offices, shops, restaurants, stores and business facilities.",fr:"Des installations électriques planifiées selon l’aménagement, les équipements et les besoins d’exploitation des nouveaux bureaux, boutiques, restaurants, magasins et installations d’entreprise."},highlights:{en:["Electrical planning for the premises","Circuits and equipment requirements","Coordination with the construction project"],fr:["Planification électrique des locaux","Besoins des circuits et équipements","Coordination avec le chantier"]}},
 {id:"renovations",number:"02",image:"/media/service-commercial-02.png",label:{en:"Renovations & remodeling",fr:"Rénovations & réaménagements"},title:{en:"Commercial and industrial renovations and remodeling",fr:"Rénovations et réaménagements commerciaux et industriels"},description:{en:"Adapt the electrical installation when renovating, reconfiguring rooms or changing how your commercial or industrial space is used.",fr:"Adaptez l’installation électrique lors de rénovations, du réaménagement des locaux ou d’un changement d’usage de votre espace commercial ou industriel."},highlights:{en:["Review of existing installations","Circuits adapted to the new layout","Work planned around site access"],fr:["Vérification des installations existantes","Circuits adaptés au nouvel aménagement","Travaux planifiés selon l’accès au site"]}},
 {id:"service-entrances",number:"03",image:"/media/service-commercial-03.png",label:{en:"Service entrances & upgrades",fr:"Entrées électriques & mises à niveau"},title:{en:"Electrical service entrances: new installation and upgrades",fr:"Entrées électriques : nouvelles installations et mises à niveau"},description:{en:"Review the electrical supply and capacity required for a new installation or an update to your commercial or industrial service entrance.",fr:"Évaluez l’alimentation et la capacité nécessaires pour une nouvelle installation ou la mise à niveau de votre entrée électrique commerciale ou industrielle."},highlights:{en:["Supply and capacity review","New service entrance installations","Upgrades coordinated with site requirements"],fr:["Vérification de l’alimentation et de la capacité","Installation de nouvelles entrées électriques","Mises à niveau selon les besoins du site"]}},
 {
  id:"panels-distribution",number:"04",image:"/media/service-commercial-03.png",
  label:{en:"Panels & distribution",fr:"Panneaux & distribution"},
  title:{en:"Commercial and industrial electrical panels and distribution",fr:"Panneaux électriques et distribution commerciaux et industriels"},
  description:{en:"Panel upgrades, subpanels and electrical distribution adapted to your building, existing equipment and operating loads.",fr:"Mises à niveau de panneaux, sous-panneaux et distribution électrique adaptés au bâtiment, aux équipements existants et aux charges d’exploitation."},
  highlights:{en:["Load and panel capacity review","Subpanels and distribution circuits","Circuit identification and organization"],fr:["Vérification des charges et de la capacité du panneau","Sous-panneaux et circuits de distribution","Identification et organisation des circuits"]}
 },
 {
  id:"lighting-controls",number:"05",image:"/media/service-commercial-02.png",
  label:{en:"Lighting & controls",fr:"Éclairage & commandes"},
  title:{en:"Interior, exterior and controlled lighting for businesses and facilities",fr:"Éclairage intérieur, extérieur et commandes pour commerces et installations industrielles"},
  description:{en:"Lighting for work areas, customer spaces and exterior access, with controls matched to occupancy, daylight and operating schedules.",fr:"Éclairage des espaces de travail, des zones d’accueil et des accès extérieurs, avec des commandes adaptées à l’occupation, à la lumière naturelle et aux horaires."},
  highlights:{en:["Interior and exterior LED lighting","Occupancy sensors and lighting controls","Emergency and exit lighting"],fr:["Éclairage DEL intérieur et extérieur","Détecteurs de présence et commandes d’éclairage","Éclairage de secours et de sortie"]}
 },
 {
  id:"energy-efficiency",number:"06",image:"/media/service-commercial-07.png",
  label:{en:"Energy efficiency",fr:"Efficacité énergétique"},
  title:{en:"Building electrical energy-efficiency improvements",fr:"Amélioration de l’efficacité énergétique électrique du bâtiment"},
  description:{en:"Review lighting, controls and electrical usage to identify upgrades suited to your building and how the premises are operated.",fr:"Examinez l’éclairage, les commandes et l’usage de l’électricité pour repérer les améliorations adaptées au bâtiment et à son exploitation."},
  highlights:{en:["Lighting and usage review","LED retrofit opportunities","Controls matched to operating hours"],fr:["Vérification de l’éclairage et des usages","Possibilités de conversion à l’éclairage DEL","Commandes adaptées aux heures d’exploitation"]}
 },
 {
  id:"structured-cabling",number:"07",image:"/media/service-commercial-04.png",
  label:{en:"Data & media cabling",fr:"Câblage données & média"},
  title:{en:"Structured data, telephone, audio and video cabling",fr:"Câblage structuré de données, téléphonie, audio et vidéo"},
  description:{en:"Organized cable infrastructure for offices, retail premises and industrial facilities, planned around network, telephone and media connection needs.",fr:"Une infrastructure de câblage organisée pour bureaux, commerces et installations industrielles, selon les besoins de réseau, de téléphonie et de raccordements multimédias."},
  highlights:{en:["Data and telephone cabling","Audio and video connections","Racks and patch-panel organization"],fr:["Câblage de données et de téléphonie","Raccordements audio et vidéo","Organisation des baies et panneaux de brassage"]}
 },
 {
  id:"security-fire-access",number:"08",image:"/media/service-security.jpg",
  label:{en:"Security, fire & access",fr:"Sécurité, incendie & accès"},
  title:{en:"Security, fire alarm, surveillance and access-system connections",fr:"Raccordements de systèmes de sécurité, d’alarme incendie, de surveillance et d’accès"},
  description:{en:"Electrical connections for security and life-safety equipment, coordinated with the property’s existing systems and project requirements.",fr:"Des raccordements électriques pour les équipements de sécurité et de protection incendie, coordonnés avec les systèmes existants et les exigences du projet."},
  highlights:{en:["Fire alarm and emergency systems","Surveillance and intrusion-system connections","Intercom and access-control wiring"],fr:["Alarmes incendie et systèmes d’urgence","Raccordements de surveillance et d’alarme intrusion","Câblage d’interphone et de contrôle d’accès"]}
 },
 {
  id:"machinery-connections",number:"09",image:"/media/service-industrial-02.png",
  label:{en:"Machinery connections",fr:"Raccordement de machinerie"},
  title:{en:"Machinery installation and electrical connections",fr:"Installation et raccordements électriques de machinerie"},
  description:{en:"Electrical supply and connections for machinery and production equipment, reviewed against equipment specifications and site conditions.",fr:"Alimentation et raccordements électriques de machinerie et d’équipements de production, vérifiés selon les spécifications et les conditions du site."},
  highlights:{en:["Equipment supply requirements","Motor and machine connections","Coordination of access and planned shutdowns"],fr:["Besoins d’alimentation des équipements","Raccordements de moteurs et de machines","Coordination de l’accès et des arrêts planifiés"]}
 },
 {
  id:"ups-generators",number:"10",image:"/media/service-industrial-06.png",
  label:{en:"UPS & generators",fr:"Onduleurs & génératrices"},
  title:{en:"UPS, generator and backup power installations",fr:"Installation d’onduleurs, de génératrices et d’alimentation de secours"},
  description:{en:"Backup-power installations planned around critical equipment, available capacity and the transfer equipment required for your facility.",fr:"Des installations d’alimentation de secours planifiées selon les équipements critiques, la capacité disponible et les appareils de transfert nécessaires."},
  highlights:{en:["UPS and standby generator connections","Automatic transfer equipment","Critical load and capacity review"],fr:["Raccordements d’onduleurs et de génératrices de secours","Équipements de transfert automatique","Vérification des charges critiques et de la capacité"]}
 },
 {
  id:"diagnostics-maintenance",number:"11",image:"/media/service-commercial-08.png",
  label:{en:"Diagnostics & maintenance",fr:"Diagnostic & entretien"},
  title:{en:"Electrical diagnostics and preventive maintenance",fr:"Diagnostic électrique et entretien préventif"},
  description:{en:"Investigate electrical faults and plan inspections or maintenance for commercial and industrial installations, taking operational restrictions into account.",fr:"Recherchez les défauts électriques et planifiez les inspections ou l’entretien des installations commerciales et industrielles en tenant compte des contraintes d’exploitation."},
  highlights:{en:["Electrical fault investigation","Panel and connection checks","Preventive maintenance planning"],fr:["Recherche de défauts électriques","Vérification des panneaux et des connexions","Planification de l’entretien préventif"]}
 },
];
const frenchSlugs: Record<string,string>={"new-construction":"construction-neuve",renovations:"renovations-reamenagements","service-entrances":"entrees-electriques","panels-distribution":"panneaux-distribution","lighting-controls":"eclairage-commandes","energy-efficiency":"efficacite-energetique","structured-cabling":"cablage-structure","security-fire-access":"securite-incendie-acces","machinery-connections":"raccordement-machinerie","ups-generators":"onduleurs-generatrices","diagnostics-maintenance":"diagnostic-entretien"};
export function commercialServicePath(locale:Locale,id:string) {
 return locale==="fr"?"/fr/services/electricien-commercial/"+frenchSlugs[id]:"/en/services/commercial-electrician/"+id;
}
