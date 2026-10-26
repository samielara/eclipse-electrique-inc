import { ServiceTile } from "@/components/service-tile";
import {
  ArrowUpRight,
  Building2,
  Factory,
  House,
  ScanSearch,
  Sun,
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
  solar: Sun,
  security: ShieldCheck,
} as const;

const serviceNumbers: Record<ServicePageId, string> = {
  residential: "01",
  commercial: "02",
  industrial: "03",
  maintenance: "03",
  generators: "04",
  solar: "05",
  security: "06",
};

const serviceMedia: Record<ServicePageId, { alt: string; src: string }> = {
  residential: {
    alt: "Installation domotique et éclairage résidentiel moderne",
    src: "/media/service-residential.jpg",
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
  solar: {
    alt: "Bâtiment résidentiel pour un projet d’énergie solaire",
    src: "/media/solar/solar-rooftop-v1.webp",
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

  return <ServiceTile serviceId={serviceId} icon={<Icon strokeWidth={1.8}/>} image={media.src} label={page.eyebrow} title={page.title} description={page.intro} highlights={page.items?.slice(0,3)} href={pathFor(serviceId,locale)} action={actionLabel}/>;
}
