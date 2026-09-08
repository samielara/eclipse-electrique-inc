import { Mail, Phone, PhoneCall } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { content } from "@/content/site-content";
import { pathFor, servicePageIds, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const isFrench = locale === "fr";

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-intro">
          <a href={pathFor("home", locale)} aria-label={site.legalName}>
            <BrandMark inverse />
          </a>
          <p>{copy.footer.summary}</p>
          <p className="credential-line">
            RBQ {site.rbq} <span aria-hidden="true">•</span> NEQ {site.neq}
          </p>
        </div>

        <div>
          <h2>{copy.footer.services}</h2>
          <ul>
            {servicePageIds.map((serviceId) => (
              <li key={serviceId}>
                <a href={pathFor(serviceId, locale)}>
                  {copy.pages[serviceId].title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>{copy.footer.navigation}</h2>
          <ul>
            <li><a href={pathFor("serviceArea", locale)}>{copy.nav.serviceArea}</a></li>
            <li><a href={pathFor("about", locale)}>{copy.nav.about}</a></li>
            <li><a href={pathFor("faq", locale)}>{copy.nav.faq}</a></li>
            <li><a href={pathFor("privacy", locale)}>{copy.footer.privacy}</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h2>{copy.footer.contact}</h2>
          <a href={site.officePhoneHref}>
            <Phone aria-hidden="true" />
            <span>{copy.actions.office}<strong>{site.officePhoneDisplay}</strong></span>
          </a>
          <a href={site.emergencyPhoneHref}>
            <PhoneCall aria-hidden="true" />
            <span>{copy.actions.emergency}<strong>{site.emergencyPhoneDisplay}</strong></span>
          </a>
          <a href={site.emailHref}>
            <Mail aria-hidden="true" />
            <span>{copy.actions.email}<strong>{site.email}</strong></span>
          </a>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} {site.legalName} {copy.footer.rights}</p>
        <p>{isFrench ? "Français (Canada)" : "English (Canada)"}</p>
      </div>
    </footer>
  );
}
