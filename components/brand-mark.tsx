import { site } from "@/lib/site";

interface BrandMarkProps {
  inverse?: boolean;
  compact?: boolean;
}

export function BrandMark({ inverse = false, compact = false }: BrandMarkProps) {
  return (
    <span className="brand-lockup">
      <span className="brand-logo-frame" aria-hidden="true">
        {/* Owner-supplied logo asset. The accessible name remains in the sr-only text below. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          decoding="async"
          height="1008"
          src="/eclipse-logo.jpg"
          width="1044"
        />
      </span>
      <span className="brand-wordmark">
        <span className={inverse ? "text-white" : "text-ink"}>ÉCLIPSE</span>
        {!compact && (
          <span className={inverse ? "text-steel-light" : "text-steel"}>
            ÉLECTRIQUE
          </span>
        )}
      </span>
      <span className="sr-only">{site.legalName}</span>
    </span>
  );
}
