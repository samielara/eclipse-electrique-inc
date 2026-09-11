import {
  ArrowUpRight,
  Building2,
  Factory,
  House,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Unplug,
} from "lucide-react";

import type { LocalizedPage } from "@/content/site-content";
import { pathFor, type Locale, type ServicePageId } from "@/lib/routes";

const serviceIcons = {
  residential: House,
  commercial: Building2,
  industrial: Factory,
  maintenance: ShieldAlert,
  generators: Unplug,
  thermography: ScanSearch,
  security: ShieldCheck,
} as const;

const serviceNumbers: Record<ServicePageId, string> = {
  residential: "01",
  commercial: "02",
  industrial: "03",
  maintenance: "04",
  generators: "05",
  thermography: "06",
  security: "07",
};

const serviceMedia: Record<ServicePageId, { alt: string; src: string }> = {
  residential: {
    alt: "Installation domotique et éclairage résidentiel moderne",
    src: "/media/eclipse-residential-electrician-v1.png",
  },
  commercial: {
    alt: "Câblage structuré et éclairage architectural commercial",
    src: "/media/service-commercial.jpg",
  },
  industrial: {
    alt: "Appareillage de distribution haute tension et machinerie industrielle",
    src: "/media/service-industrial.jpg",
  },
  maintenance: {
    alt: "Camion d'intervention officiel Éclipse et électricien d'urgence 24/7",
    src: "/media/service-emergency.jpg",
  },
  generators: {
    alt: "Installation extérieure de génératrice de secours et commutateur ATS",
    src: "/media/service-generators.jpg",
  },
  thermography: {
    alt: "Inspection thermographique infrarouge par caméra thermique FLIR",
    src: "/media/service-thermography.jpg",
  },
  security: {
    alt: "Système de contrôle d'accès, alarme incendie et sécurité électrique",
    src: "/media/service-security.jpg",
  },
};

interface ServiceCardProps {
  locale: Locale;
  serviceId: ServicePageId;
  page: LocalizedPage;
  actionLabel: string;
}

export function ServiceCard({
  locale,
  serviceId,
  page,
  actionLabel,
}: ServiceCardProps) {
  const Icon = serviceIcons[serviceId];
  const media = serviceMedia[serviceId];

  return (
    <article data-service-id={serviceId} data-testid="service-card" className={`service-card${serviceId === "residential" ? " service-card-featured" : ""}`}>
      <div className="service-card-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={media.alt} decoding="async" height="720" loading="lazy" src={media.src} width="1280" />
      </div>
      <div className="service-card-top">
        <span className="service-icon" aria-hidden="true">
          <Icon strokeWidth={1.8} />
        </span>
        <span className="service-number" aria-hidden="true">
          {serviceNumbers[serviceId]}
        </span>
      </div>
      <p className="service-eyebrow">{page.eyebrow}</p>
      <h3 data-testid="service-card-title">{page.title}</h3>
      <p>{page.intro}</p>
      {page.items && (
        <ul className="service-card-highlights">
          {page.items.slice(0, 3).map((highlight) => (
            <li key={highlight}>
              <span className="service-highlight-bullet" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
      <a data-testid="service-card-link" className="service-card-link" href={pathFor(serviceId, locale)}>
        {actionLabel}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
