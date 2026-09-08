import { Activity, ArrowRight, FileCheck2, ShieldAlert } from "lucide-react";

import type { ThermographyProofCopy } from "@/content/site-content";
import { quotePath, type Locale } from "@/lib/routes";

interface ThermographyProofProps {
  locale: Locale;
  copy: ThermographyProofCopy;
}

const pillarIcons = [FileCheck2, Activity, ShieldAlert] as const;

export function ThermographyProof({ locale, copy }: ThermographyProofProps) {
  const isFrench = locale === "fr";

  return (
    <section
      aria-labelledby="thermography-proof-title"
      className="thermography-proof-section section-pad"
      id="thermography-proof"
    >
      <div className="site-container thermography-proof-layout">
        <div className="thermography-proof-intro">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="thermography-proof-title">{copy.title}</h2>
          <p className="section-intro">{copy.intro}</p>
          <div className="thermography-proof-callout">
            <strong>{copy.pillars.length}</strong>
            <span>{copy.pillarCountLabel}</span>
          </div>
          <a className="thermography-proof-cta" href={quotePath(locale)}>
            <span>{copy.cta}</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <p className="thermography-proof-note">{copy.ctaNote}</p>
        </div>

        <div className="thermography-pillars">
          {copy.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? ShieldAlert;

            return (
              <article className="thermography-pillar" key={pillar.title}>
                <div className="thermography-pillar-top">
                  <span className="thermography-pillar-icon" aria-hidden="true">
                    <Icon strokeWidth={1.8} />
                  </span>
                  <span className="thermography-pillar-metric" aria-hidden="true">
                    {pillar.metric}
                  </span>
                </div>
                <p className="eyebrow">{pillar.secondaryTitle}</p>
                <h3>{pillar.title}</h3>
                <p className="thermography-pillar-description">{pillar.description}</p>
                <div className="thermography-pillar-proof">
                  <span aria-hidden="true">●</span>
                  <span>{pillar.proof}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <p className="sr-only">
        {isFrench
          ? "Les renseignements techniques sont à confirmer avec Éclipse électrique avant publication ou intervention."
          : "Technical details are confirmed with Éclipse électrique before publication or service."}
      </p>
    </section>
  );
}
