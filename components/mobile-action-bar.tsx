import { Phone, PhoneCall } from "lucide-react";

import { content } from "@/content/site-content";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/routes";

export function MobileActionBar({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";

  return (
    <nav
      aria-label={isFrench ? "Actions rapides" : "Quick actions"}
      className="mobile-action-bar"
    >
      <a className="mobile-action-link mobile-action-emergency" href={site.emergencyPhoneHref}>
        <span className="mobile-action-icon" aria-hidden="true">
          <PhoneCall />
        </span>
        <span className="mobile-action-copy">
          <small>{content[locale].actions.emergency}</small>
          <strong>{site.emergencyPhoneDisplay}</strong>
        </span>
      </a>
      <a className="mobile-action-link mobile-action-office" href={site.officePhoneHref}>
        <span className="mobile-action-icon" aria-hidden="true">
          <Phone />
        </span>
        <span className="mobile-action-copy">
          <small>{content[locale].actions.office}</small>
          <strong>{site.officePhoneDisplay}</strong>
        </span>
      </a>
    </nav>
  );
}
