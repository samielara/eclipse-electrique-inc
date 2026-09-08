import { ArrowRight, ChevronDown, Menu, PhoneCall } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { content } from "@/content/site-content";
import {
  alternateCityPath,
  cityPath,
  cityRoutes,
  type CityRegion,
} from "@/lib/city-routes";
import { alternatePath, pathFor, quotePath, servicePageIds, type Locale, type PageId } from "@/lib/routes";
import { site } from "@/lib/site";

interface SiteHeaderProps {
  locale: Locale;
  pageId: PageId;
  citySlug?: string;
}

const regionOrder: readonly CityRegion[] = ["montreal", "northShore", "southShore"];

export function SiteHeader({ locale, pageId, citySlug }: SiteHeaderProps) {
  const copy = content[locale];
  const isFrench = locale === "fr";
  const skipLabel = isFrench ? "Aller au contenu" : "Skip to content";
  const quoteLabel = copy.actions.quote;
  const languageLabel = copy.alternateLanguageName;
  const languageHref = citySlug
    ? alternateCityPath(locale, citySlug)
    : alternatePath(pageId, locale);
  const regionLabels: Record<CityRegion, string> = isFrench
    ? { montreal: "Montréal", northShore: "Rive-Nord", southShore: "Rive-Sud" }
    : { montreal: "Montréal", northShore: "North Shore", southShore: "South Shore" };

  const simpleLinks = [
    { pageId: "about" as const, label: copy.nav.about },
    { pageId: "faq" as const, label: copy.nav.faq },
    { pageId: "contact" as const, label: copy.nav.contact },
  ];

  const serviceLinks = servicePageIds.map((serviceId) => ({
    serviceId,
    label: copy.pages[serviceId].eyebrow,
    description: copy.pages[serviceId].title,
  }));

  return (
    <>
      <a className="skip-link" href="#contenu">
        {skipLabel}
      </a>
      <header className="site-header">
        <div className="utility-bar">
          <div className="site-container utility-inner">
            <div className="utility-actions">
              <a className="emergency-link" href={site.emergencyPhoneHref}>
                <PhoneCall aria-hidden="true" />
                {copy.actions.emergency}: {site.emergencyPhoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="site-container nav-shell">
          <a className="brand-link" href={pathFor("home", locale)}>
            <BrandMark />
          </a>

          <nav className="desktop-nav" aria-label={isFrench ? "Navigation principale" : "Main navigation"}>
            <details className="header-dropdown">
              <summary
                className={pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number]) ? "is-current" : undefined}
                aria-current={pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number]) ? "page" : undefined}
              >
                <span>{copy.nav.services}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="header-dropdown-panel services-dropdown-panel">
                <a className="dropdown-view-all" href={pathFor("services", locale)}>
                  <span>{copy.actions.exploreServices}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
                {serviceLinks.map(({ serviceId, label, description }) => (
                  <a className="dropdown-option" href={pathFor(serviceId, locale)} key={serviceId}>
                    <span>{label}</span>
                    <small>{description}</small>
                    <ArrowRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </details>

            <details className="header-dropdown area-dropdown">
              <summary
                className={pageId === "serviceArea" ? "is-current" : undefined}
                aria-current={pageId === "serviceArea" ? "page" : undefined}
              >
                <span>{copy.nav.serviceArea}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="header-dropdown-panel area-dropdown-panel">
                <a className="dropdown-view-all" href={pathFor("serviceArea", locale)}>
                  <span>{copy.actions.checkArea}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
                <div className="city-groups">
                  {regionOrder.map((region) => (
                    <section className="city-group" key={region}>
                      <h3>{regionLabels[region]}</h3>
                      <div className="city-links">
                        {cityRoutes
                          .filter((city) => city.region === region)
                          .map((city) => (
                            <a href={cityPath(locale, city.slug)} key={city.slug}>
                              {city[locale]}
                            </a>
                          ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </details>

            {simpleLinks.map((link) => (
              <a
                className={pageId === link.pageId ? "is-current" : undefined}
                href={pathFor(link.pageId, locale)}
                key={link.pageId}
                aria-current={pageId === link.pageId ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="desktop-actions">
            <ThemeToggle locale={locale} />
            <a className="language-link" href={languageHref}>
              {languageLabel}
            </a>
            <Button asChild size="lg" className="cta-button">
              <a href={quotePath(locale)}>
                {quoteLabel}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <details className="mobile-menu">
            <summary>
              <Menu aria-hidden="true" />
              <span>{copy.nav.menu}</span>
              <ChevronDown className="menu-chevron" aria-hidden="true" />
            </summary>
            <div className="mobile-menu-panel">
              <nav aria-label={isFrench ? "Navigation mobile" : "Mobile navigation"}>
                <details className="mobile-submenu">
                  <summary>
                    <span>{copy.nav.services}</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="mobile-submenu-panel">
                    <a className="mobile-submenu-all" href={pathFor("services", locale)}>
                      {copy.actions.exploreServices}
                    </a>
                    {serviceLinks.map(({ serviceId, label }) => (
                      <a href={pathFor(serviceId, locale)} key={serviceId}>
                        {label}
                      </a>
                    ))}
                  </div>
                </details>

                <details className="mobile-submenu mobile-area-submenu">
                  <summary>
                    <span>{copy.nav.serviceArea}</span>
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="mobile-submenu-panel">
                    <a className="mobile-submenu-all" href={pathFor("serviceArea", locale)}>
                      {copy.actions.checkArea}
                    </a>
                    {regionOrder.map((region) => (
                      <div className="mobile-city-group" key={region}>
                        <strong>{regionLabels[region]}</strong>
                        {cityRoutes
                          .filter((city) => city.region === region)
                          .map((city) => (
                            <a href={cityPath(locale, city.slug)} key={city.slug}>
                              {city[locale]}
                            </a>
                          ))}
                      </div>
                    ))}
                  </div>
                </details>

                {simpleLinks.map((link) => (
                  <a
                    href={pathFor(link.pageId, locale)}
                    key={link.pageId}
                    aria-current={pageId === link.pageId ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mobile-menu-actions">
                <ThemeToggle locale={locale} />
                <a href={languageHref}>{languageLabel}</a>
                <a className="mobile-quote" href={quotePath(locale)}>
                  {quoteLabel}
                </a>
                <a className="mobile-emergency" href={site.emergencyPhoneHref}>
                  {copy.actions.emergency}: {site.emergencyPhoneDisplay}
                </a>
              </div>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
