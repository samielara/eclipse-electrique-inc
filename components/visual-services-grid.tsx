import React from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/routes";
import { pathFor } from "@/lib/routes";

// ============================================================================
// 12 Bespoke Vector Electrical Icons (matching the brainstorming reference)
// ============================================================================

export function SmokeAlarmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Ceiling base plate */}
      <path d="M16 16h32" />
      {/* Sensor housing dome with grill slots */}
      <path d="M18 16c0 8 6 14 14 14s14-6 14-14" />
      <path d="M23 21h18" />
      <path d="M26 25h12" />
      <circle cx="32" cy="23" r="1.5" fill="currentColor" />
      {/* 3 Rising wavy smoke trails */}
      <path d="M24 36c-2.5 3 2.5 5 0 9" />
      <path d="M32 34c-2.5 4 2.5 6 0 12" />
      <path d="M40 36c-2.5 3 2.5 5 0 9" />
    </svg>
  );
}

export function SmartHomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* House outline */}
      <path d="M18 28l14-12 14 12" />
      <path d="M38 20v-5h5v9" />
      <path d="M21 28v22h22V28" />
      {/* Wi-Fi broadcast signal above roof */}
      <path d="M22 10c5.5-4.5 14.5-4.5 20 0" />
      <path d="M26 14c3.5-3 8.5-3 12 0" />
      <circle cx="32" cy="18" r="1.5" fill="currentColor" />
      {/* Power/Standby symbol */}
      <path d="M27 40a6 6 0 1 0 10 0" />
      <path d="M32 34v6" />
    </svg>
  );
}

export function EvChargerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Electric vehicle profile */}
      <path d="M11 38c0-3.5 2.5-6.5 6.5-8l5-7c2-2.5 5-3.5 9-3.5h7c4 0 7 1.5 8.5 4l4.5 6.5c3.5 1.5 5.5 4.5 5.5 8v4H11v-4z" />
      {/* Wheels */}
      <circle cx="20" cy="42" r="5" />
      <circle cx="43" cy="42" r="5" />
      <circle cx="20" cy="42" r="2" fill="currentColor" />
      <circle cx="43" cy="42" r="2" fill="currentColor" />
      {/* EV Charging plug symbol inside */}
      <path d="M29 27v3" />
      <path d="M33 27v3" />
      <path d="M27 30h8v3a4 4 0 0 1-8 0z" />
      <path d="M31 34v5" />
    </svg>
  );
}

export function PowerpointsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Wall plate with rounded corners */}
      <rect x="12" y="14" width="40" height="36" rx="6" />
      {/* Left outlet socket */}
      <line x1="22" y1="24" x2="22" y2="32" />
      <line x1="28" y1="24" x2="28" y2="32" />
      <circle cx="25" cy="37" r="2" />
      {/* Right outlet with plug inserted and curved flexible cord */}
      <rect x="36" y="24" width="12" height="12" rx="3" />
      <path d="M48 30c5 0 8 4 6 9s-6 7-3 12" />
    </svg>
  );
}

export function SafetySwitchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Breaker module casing */}
      <rect x="18" y="10" width="28" height="44" rx="5" />
      {/* Switch toggle handle on right side */}
      <rect x="46" y="22" width="5" height="16" rx="2.5" />
      {/* Test button */}
      <rect x="22" y="14" width="6" height="4" rx="1" fill="currentColor" />
      {/* Central lightning bolt */}
      <path d="M33 21l-8 13h8l-3 13 11-15h-7z" />
    </svg>
  );
}

export function LedLightingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Ceiling rail track */}
      <path d="M10 16h44" />
      <path d="M18 10v6" />
      <path d="M46 10v6" />
      {/* Fixture 1 (Left) */}
      <path d="M18 16v8" />
      <rect x="14" y="24" width="8" height="7" rx="1.5" />
      <path d="M15 35l-3 8" />
      <path d="M18 35v9" />
      <path d="M21 35l3 8" />
      {/* Fixture 2 (Center) */}
      <path d="M32 16v8" />
      <rect x="28" y="24" width="8" height="7" rx="1.5" />
      <path d="M29 35l-3 8" />
      <path d="M32 35v9" />
      <path d="M35 35l3 8" />
      {/* Fixture 3 (Right) */}
      <path d="M46 16v8" />
      <rect x="42" y="24" width="8" height="7" rx="1.5" />
      <path d="M43 35l-3 8" />
      <path d="M46 35v9" />
      <path d="M49 35l3 8" />
    </svg>
  );
}

export function SwitchboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Enclosure cabinet */}
      <rect x="16" y="10" width="32" height="44" rx="4" />
      {/* Hinges */}
      <rect x="12" y="16" width="4" height="6" rx="1" />
      <rect x="12" y="38" width="4" height="6" rx="1" />
      {/* Danger warning triangle with lightning */}
      <polygon points="32,16 23,30 41,30" />
      <path d="M32 19l-2 5h4l-2 4" />
      {/* Breaker busbars */}
      <line x1="22" y1="36" x2="42" y2="36" />
      <line x1="22" y1="41" x2="42" y2="41" />
      <line x1="22" y1="46" x2="42" y2="46" />
    </svg>
  );
}

export function ApplianceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Oven / Cooktop unit */}
      <rect x="14" y="12" width="36" height="40" rx="6" />
      {/* Control panel */}
      <circle cx="21" cy="18" r="2.5" />
      <circle cx="43" cy="18" r="2.5" />
      <rect x="27" y="16" width="10" height="4" rx="1" />
      {/* Oven window door */}
      <rect x="19" y="26" width="26" height="20" rx="3" />
      <line x1="24" y1="29" x2="40" y2="29" />
    </svg>
  );
}

export function FanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Circular fan cage */}
      <circle cx="32" cy="32" r="22" />
      {/* Center hub */}
      <circle cx="32" cy="32" r="4.5" />
      {/* 3 Curved aerodynamic fan blades */}
      <path d="M32 27.5c-3-9 4-15 10-10c3 3-1 9-6 10" />
      <path d="M28 34c-9 2-13-5-8-11c3-3 8 0 8 7" />
      <path d="M35 34c4 8 12 7 12 1c0-4-6-6-9-4" />
    </svg>
  );
}

export function SecurityLightingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Outdoor security floodlight lamp head */}
      <polygon points="14,37 30,23 26,47" />
      <path d="M12 43l8-6" />
      {/* Light rays spreading */}
      <path d="M32 28l8-4" />
      <path d="M33 35l10 0" />
      <path d="M30 42l8 5" />
      {/* Padlock security badge */}
      <rect x="36" y="16" width="16" height="13" rx="3" />
      <path d="M40 16v-4a4 4 0 0 1 8 0v4" />
      <circle cx="44" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ElectricalRewiringIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* House silhouette */}
      <path d="M18 28l14-12 14 12v22H38v-8H26v8H18z" />
      {/* Heavy gauge power cable wrapping from house */}
      <path d="M32 40c0 6 12 6 12 12c0 5-6 6-12 6" />
      {/* Electric plug head with prongs */}
      <rect x="27" y="30" width="10" height="9" rx="2" />
      <line x1="29" y1="26" x2="29" y2="30" />
      <line x1="35" y1="26" x2="35" y2="30" />
    </svg>
  );
}

export function SwitchesDimmersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Dual rocker wall switch faceplate */}
      <rect x="16" y="12" width="32" height="40" rx="4" />
      {/* Left rocker paddle */}
      <rect x="21" y="17" width="9" height="30" rx="2" />
      <line x1="21" y1="32" x2="30" y2="32" />
      {/* Right rocker paddle */}
      <rect x="34" y="17" width="9" height="30" rx="2" />
      <line x1="34" y1="32" x2="43" y2="32" />
    </svg>
  );
}

// ============================================================================
// Service Data Model (12 items matching reference screenshot)
// ============================================================================

export interface VisualServiceItem {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  category: {
    fr: string;
    en: string;
  };
  linkId: "residential" | "commercial" | "generators" | "security" | "maintenance";
}

export const VISUAL_SERVICES: VisualServiceItem[] = [
  {
    id: "smoke-alarms",
    icon: SmokeAlarmIcon,
    title: {
      fr: "Détecteurs de fumée & CO",
      en: "Smoke Alarms",
    },
    description: {
      fr: "Sécurisez votre foyer avec une installation certifiée de détecteurs de fumée et monoxyde interconnectés.",
      en: "Make your home safe with hard wired smoke alarm installation.",
    },
    category: {
      fr: "Sécurité résidentielle",
      en: "Home Safety",
    },
    linkId: "residential",
  },
  {
    id: "smart-home",
    icon: SmartHomeIcon,
    title: {
      fr: "Domotique & Câblage intelligent",
      en: "Smart Home Wiring",
    },
    description: {
      fr: "Modernisez votre résidence avec les dernières commandes intelligentes, thermostats et gestion d'énergie.",
      en: "Upgrade your home to the latest economical smart systems.",
    },
    category: {
      fr: "Éco-énergie & confort",
      en: "Automation",
    },
    linkId: "residential",
  },
  {
    id: "ev-chargers",
    icon: EvChargerIcon,
    title: {
      fr: "Bornes de recharge VÉ",
      en: "EV Chargers",
    },
    description: {
      fr: "Rechargez votre véhicule électrique à domicile rapidement et en toute sécurité (admissible aux subventions).",
      en: "Conveniently charge your EV from home.",
    },
    category: {
      fr: "Subvention Roulez vert",
      en: "Clean Energy",
    },
    linkId: "residential",
  },
  {
    id: "powerpoints",
    icon: PowerpointsIcon,
    title: {
      fr: "Prises de courant & Circuits",
      en: "Powerpoints",
    },
    description: {
      fr: "Ajoutez, déplacez et réparez des prises de courant et circuits dédiés partout dans votre résidence.",
      en: "Move, add and repair powerpoints anywhere in your home.",
    },
    category: {
      fr: "Circuits 120V / 240V",
      en: "Power & Outlets",
    },
    linkId: "residential",
  },
  {
    id: "safety-switches",
    icon: SafetySwitchIcon,
    title: {
      fr: "Disjoncteurs DDFT & AFCI",
      en: "RCD Safety Switches",
    },
    description: {
      fr: "Protégez votre famille et vos employés contre les arcs électriques avec des disjoncteurs certifiés.",
      en: "Protect your family and employees with proper RCD safety switches.",
    },
    category: {
      fr: "Protection incendie & choc",
      en: "Safety & Code",
    },
    linkId: "residential",
  },
  {
    id: "led-lighting",
    icon: LedLightingIcon,
    title: {
      fr: "Éclairage DEL encastré",
      en: "LED Lighting",
    },
    description: {
      fr: "Économisez l'énergie et sublimez vos espaces de vie avec des solutions d'éclairage DEL architectural.",
      en: "Make your home economical with aesthetic LED Lighting solutions.",
    },
    category: {
      fr: "Design & Économie",
      en: "Architectural",
    },
    linkId: "residential",
  },
  {
    id: "switchboard-upgrades",
    icon: SwitchboardIcon,
    title: {
      fr: "Surclassement de panneau (200A)",
      en: "Switchboard Upgrades",
    },
    description: {
      fr: "Assurez la sécurité de votre demeure et alimentez tous vos appareils modernes sans risque de surcharge.",
      en: "Ensure your home is safe and able to run multiple appliances.",
    },
    category: {
      fr: "Entrée électrique Hydro-QC",
      en: "Panel Upgrades",
    },
    linkId: "residential",
  },
  {
    id: "appliance-installation",
    icon: ApplianceIcon,
    title: {
      fr: "Raccordement d'appareils",
      en: "Appliance Installation",
    },
    description: {
      fr: "Branchement professionnel de plaques de cuisson, fours, spas, chauffe-eau et thermopompes.",
      en: "Get your electrical hot plates and ovens installed professionally.",
    },
    category: {
      fr: "Câblage lourd & 240V",
      en: "Appliances",
    },
    linkId: "residential",
  },
  {
    id: "fan-installation",
    icon: FanIcon,
    title: {
      fr: "Ventilation & Ventilateurs",
      en: "Fan Installation",
    },
    description: {
      fr: "De l'extraction d'air silencieuse de salle de bain jusqu'aux ventilateurs de plafond grand format.",
      en: "From exhaust fan installation to big as ceiling fan installation.",
    },
    category: {
      fr: "Qualité d'air & aération",
      en: "Ventilation",
    },
    linkId: "residential",
  },
  {
    id: "security-lighting",
    icon: SecurityLightingIcon,
    title: {
      fr: "Éclairage de sécurité",
      en: "Security Lighting",
    },
    description: {
      fr: "Gardez votre propriété en sécurité avec des projecteurs DEL puissants et détecteurs de mouvement.",
      en: "Keep your premises secure with bright security lighting.",
    },
    category: {
      fr: "Détecteurs & surveillance",
      en: "Perimeter Security",
    },
    linkId: "security",
  },
  {
    id: "electrical-rewiring",
    icon: ElectricalRewiringIcon,
    title: {
      fr: "Remise aux normes du filage",
      en: "Electrical Rewiring",
    },
    description: {
      fr: "Remplacement sécurisé de filage ancien en aluminium ou bouton et tube pour conformité d'assurance.",
      en: "Upgrade old home wiring for safety and to handle multiple appliances.",
    },
    category: {
      fr: "Certification d'assurance",
      en: "Code Compliance",
    },
    linkId: "residential",
  },
  {
    id: "switches-dimmers",
    icon: SwitchesDimmersIcon,
    title: {
      fr: "Interrupteurs & Gradateurs",
      en: "Switches & Dimmers",
    },
    description: {
      fr: "Des ambiances tamisées aux gradateurs tactiles et interrupteurs intelligents connectés.",
      en: "From mood lighting and dimmers to touch sense switches.",
    },
    category: {
      fr: "Contrôles d'ambiance",
      en: "Controls & Lighting",
    },
    linkId: "residential",
  },
];

// ============================================================================
// Visual Services Showcase Component
// ============================================================================

interface VisualServicesGridProps {
  locale: Locale;
  showHeading?: boolean;
  className?: string;
}

export function VisualServicesGrid({
  locale,
  showHeading = true,
  className = "",
}: VisualServicesGridProps) {
  const isFrench = locale === "fr";

  return (
    <section className={`visual-services-showcase ${className}`} data-testid="visual-services-showcase">
      {showHeading && (
        <div className="visual-services-header text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="visual-services-pill">
            {isFrench ? "SOLUTIONS ÉLECTRIQUES COURANTES" : "COMMON ELECTRICAL SERVICES"}
          </span>
          <h2 className="visual-services-title">
            {isFrench
              ? "Tous Vos Besoins Électriques Expliqués Visuellement."
              : "All Your Electrical Needs, Visualized at a Glance."}
          </h2>
          <p className="visual-services-intro">
            {isFrench
              ? "Des interventions rapides, soignées et conformes aux normes les plus strictes du Code de construction du Québec (RBQ)."
              : "Clean, professional installations compliant with the highest standards of the Quebec Construction Code (RBQ)."}
          </p>
        </div>
      )}

      <div className="visual-services-grid">
        {VISUAL_SERVICES.map((item) => {
          const Icon = item.icon;
          const title = item.title[locale];
          const description = item.description[locale];
          const category = item.category[locale];
          const href = pathFor(item.linkId, locale);

          return (
            <article
              key={item.id}
              className="visual-service-card group"
              data-service-item={item.id}
            >
              <div className="visual-service-icon-container" aria-hidden="true">
                <Icon className="visual-service-svg" />
              </div>

              <span className="visual-service-badge">{category}</span>

              <h3 className="visual-service-card-title">{title}</h3>

              <p className="visual-service-card-desc">{description}</p>

              <a
                href={href}
                className="visual-service-action"
                aria-label={`${title} - ${isFrench ? "En savoir plus" : "Learn more"}`}
              >
                <span>{isFrench ? "En savoir plus" : "Learn more"}</span>
                <ArrowUpRight className="visual-service-arrow" aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
