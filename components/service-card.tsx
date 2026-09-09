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
    <article data-service-id={serviceId} data-testid="service-card" className={`service-card${serviceId === "residential" ? " service-card-featured" : ""}`}>
      {serviceId === "residential" && (
        <div className="service-card-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" decoding="async" height="720" loading="lazy" src="/media/electrical-testing.webp" width="1080" />
        </div>
      )}
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
      <a data-testid="service-card-link" className="service-card-link" href={pathFor(serviceId, locale)}>
        {actionLabel}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
