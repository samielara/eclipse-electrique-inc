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

  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon" aria-hidden="true">
          <Icon strokeWidth={1.8} />
        </span>
        <span className="service-number" aria-hidden="true">
          {serviceNumbers[serviceId]}
        </span>
      </div>
      <p className="service-eyebrow">{page.eyebrow}</p>
      <h3>{page.title}</h3>
      <p>{page.intro}</p>
      <a className="service-card-link" href={pathFor(serviceId, locale)}>
        {actionLabel}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
