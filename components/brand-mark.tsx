import { site } from "@/lib/site";

interface BrandMarkProps {
  inverse?: boolean;
  compact?: boolean;
}

export function BrandMark({ inverse = false, compact = false }: BrandMarkProps) {
  return (
    <span className="brand-lockup">
      <span className="brand-logo-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={site.legalName}
          className="brand-logo-dark"
          decoding="async"
          height="1402"
          src="/eclipse-logo-dark.png"
          width="1122"
        />
      </span>
      <span aria-hidden="true" className="brand-wordmark">
        <span className={inverse ? "text-white" : "text-ink"}>ÉCLIPSE</span>
        {!compact && (
          <span className={inverse ? "text-steel-light" : "text-steel"}>
            ÉLECTRIQUE
          </span>
        )}
      </span>
    </span>
  );
}
