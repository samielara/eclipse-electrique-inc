"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/routes";

type ResidentialWorkItem = {
  id: string;
  number: string;
  image: string;
  label: { en: string; fr: string };
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
};

const RESIDENTIAL_WORK: ResidentialWorkItem[] = [
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
];

export function ResidentialWorkExplorer({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState(RESIDENTIAL_WORK[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const shouldFollowActiveTab = useRef(false);
  const isFrench = locale === "fr";
  const activeIndex = Math.max(0, RESIDENTIAL_WORK.findIndex((item) => item.id === activeId));
  const activeItem = RESIDENTIAL_WORK[activeIndex];
  const selectRelativeItem = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + RESIDENTIAL_WORK.length) % RESIDENTIAL_WORK.length;
    shouldFollowActiveTab.current = true;
    setActiveId(RESIDENTIAL_WORK[nextIndex].id);
  };

  useEffect(() => {
    if (!shouldFollowActiveTab.current) return;
    tabRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    shouldFollowActiveTab.current = false;
  }, [activeId]);

  return (
    <section className="residential-work-explorer" data-testid="residential-work-explorer">
      <div className="site-container">
        <header className="residential-work-explorer-heading">
          <p className="eyebrow">{isFrench ? "Travaux offerts dans cette catégorie" : "Published work in this category"}</p>
          <h2>{isFrench ? "Un aperçu des travaux offerts" : "An overview of available work"}</h2>
          <p>{isFrench ? "Décrivez l'installation actuelle, les travaux prévus et l'emplacement. L'équipe pourra discuter de la portée de votre demande et des prochaines étapes." : "Describe the current installation, planned work and location. The team can discuss the scope of your request and the next steps."}</p>
        </header>

        <div className="residential-work-tabs" role="tablist" aria-label={isFrench ? "Travaux résidentiels" : "Residential work"}>
          {RESIDENTIAL_WORK.map((item) => {
            const active = item.id === activeId;
            return (
              <button ref={(element) => { tabRefs.current[item.id] = element; }} key={item.id} type="button" role="tab" aria-selected={active} aria-controls="residential-work-panel" onClick={() => setActiveId(item.id)} className={active ? "is-active" : undefined}>
                <span>{item.number}</span><strong>{item.label[locale]}</strong>
              </button>
            );
          })}
        </div>

        <div className="residential-work-stage" id="residential-work-panel" role="tabpanel">
          <div className="residential-work-image-shell">
            <div className="residential-work-image-wrap">
              <img key={activeItem.id} data-testid="residential-work-image" src={activeItem.image} alt={activeItem.title[locale]} />
            </div>
          </div>
          <div className="residential-work-copy" key={`${activeItem.id}-copy`}>
            <p className="eyebrow">{activeItem.label[locale]}</p>
            <h3>{activeItem.title[locale]}</h3>
            <p>{activeItem.description[locale]}</p>
            <ul>
              {activeItem.highlights[locale].map((highlight) => <li key={highlight}><Check aria-hidden="true" />{highlight}</li>)}
            </ul>
            <a href="#quote-intake">{isFrench ? "Demander ce service" : "Request this service"}<ArrowRight aria-hidden="true" /></a>
          </div>
          <button className="residential-image-control is-previous" type="button" onClick={() => selectRelativeItem(-1)} aria-label={isFrench ? "Service résidentiel précédent" : "Previous residential service"}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button className="residential-image-control is-next" type="button" onClick={() => selectRelativeItem(1)} aria-label={isFrench ? "Service résidentiel suivant" : "Next residential service"}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
