"use client";

import {
  ArrowRight,
  BatteryCharging,
  Building,
  Building2,
  ChevronDown,
  Compass,
  Factory,
  House,
  MapPin,
  Menu,
  PhoneCall,
  ScanSearch,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import { alternatePath, pathFor, quotePath, servicePageIds, type Locale, type PageId, type ServicePageId } from "@/lib/routes";
import { site } from "@/lib/site";

interface SiteHeaderProps {
  locale: Locale;
  pageId: PageId;
  citySlug?: string;
}

const regionOrder: readonly CityRegion[] = ["montreal", "northShore", "southShore"];

const serviceIcons: Record<ServicePageId, typeof House> = {
  residential: House,
  commercial: Building2,
  industrial: Factory,
  maintenance: Zap,
  generators: BatteryCharging,
  thermography: ScanSearch,
  security: ShieldCheck,
};

const serviceBadges: Partial<Record<ServicePageId, string>> = {
  maintenance: "24/7",
  thermography: "FLIR",
};

const regionIcons: Record<CityRegion, typeof MapPin> = {
  montreal: MapPin,
  northShore: Compass,
  southShore: Building,
};

const serviceMicroCopy: Record<Locale, Record<ServicePageId, string>> = {
  fr: {
    residential: "Panneaux, filage & réno",
    commercial: "Bureaux, commerces & conformité",
    industrial: "Équipements, moteurs & 600V",
    maintenance: "Urgence 24/7 & entretien",
    generators: "Alimentation de secours",
    thermography: "Diagnostic infrarouge FLIR",
    security: "Alarmes, caméras & accès",
  },
  en: {
    residential: "Panels, wiring & renovations",
    commercial: "Offices, retail & compliance",
    industrial: "Machinery, motors & 600V",
    maintenance: "24/7 emergency & maintenance",
    generators: "Backup power & transfer",
    thermography: "FLIR thermal diagnostics",
    security: "Fire alarms, access & cameras",
  },
};

export function SiteHeader({ locale, pageId, citySlug }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesDropdownRef = useRef<HTMLDetailsElement>(null);
  const areaDropdownRef = useRef<HTMLDetailsElement>(null);

  const [selectedRegion, setSelectedRegion] = useState<CityRegion>("montreal");

  const closeDropdowns = () => {
    if (servicesDropdownRef.current) servicesDropdownRef.current.open = false;
    if (areaDropdownRef.current) areaDropdownRef.current.open = false;
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleServicesMouseEnter = () => {
    if (areaDropdownRef.current) areaDropdownRef.current.open = false;
  };

  const handleServicesMouseLeave = () => {
    if (servicesDropdownRef.current) {
      servicesDropdownRef.current.open = false;
    }
    if (
      typeof document !== "undefined" &&
      servicesDropdownRef.current?.contains(document.activeElement)
    ) {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const handleAreaMouseEnter = () => {
    if (servicesDropdownRef.current) servicesDropdownRef.current.open = false;
  };

  const handleAreaMouseLeave = () => {
    if (areaDropdownRef.current) {
      areaDropdownRef.current.open = false;
    }
    if (
      typeof document !== "undefined" &&
      areaDropdownRef.current?.contains(document.activeElement)
    ) {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const handleServicesToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open && areaDropdownRef.current) {
      areaDropdownRef.current.open = false;
    }
  };

  const handleAreaToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open && servicesDropdownRef.current) {
      servicesDropdownRef.current.open = false;
    }
  };
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
    description: serviceMicroCopy[locale][serviceId],
  }));

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 16);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        servicesDropdownRef.current?.open &&
        !servicesDropdownRef.current.contains(target)
      ) {
        servicesDropdownRef.current.open = false;
      }
      if (
        areaDropdownRef.current?.open &&
        !areaDropdownRef.current.contains(target)
      ) {
        areaDropdownRef.current.open = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdowns();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenu">
        {skipLabel}
      </a>
      <header
        className="site-header"
        data-home={pageId === "home" ? "true" : "false"}
        data-scroll-state={isScrolled ? "scrolled" : "top"}
      >
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
            <details
              className="header-dropdown"
              ref={servicesDropdownRef}
              name="site-nav-dropdown"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
              onToggle={handleServicesToggle}
            >
              <summary
                className={pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number]) ? "is-current" : undefined}
                aria-current={pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number]) ? "page" : undefined}
              >
                <span>{copy.nav.services}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="header-dropdown-panel services-dropdown-panel">
                <div className="services-dropdown-list">
                  {serviceLinks.map(({ serviceId, label, description }) => {
                    const Icon = serviceIcons[serviceId];
                    const badge = serviceBadges[serviceId];
                    return (
                      <a
                        className="dropdown-option"
                        href={pathFor(serviceId, locale)}
                        key={serviceId}
                        onClick={closeDropdowns}
                      >
                        <span className="dropdown-option-icon" aria-hidden="true">
                          <Icon strokeWidth={1.8} />
                        </span>
                        <div className="dropdown-option-body">
                          <div className="dropdown-option-heading">
                            <span>{label}</span>
                            {badge && <span className="dropdown-badge">{badge}</span>}
                          </div>
                          <small>{description}</small>
                        </div>
                        <ArrowRight aria-hidden="true" className="dropdown-option-arrow" />
                      </a>
                    );
                  })}
                </div>
                <div className="dropdown-footer">
                  <a className="dropdown-view-all" href={pathFor("services", locale)} onClick={closeDropdowns}>
                    <span>{copy.actions.exploreServices}</span>
                    <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </details>

            <details
              className="header-dropdown area-dropdown"
              ref={areaDropdownRef}
              name="site-nav-dropdown"
              onMouseEnter={handleAreaMouseEnter}
              onMouseLeave={handleAreaMouseLeave}
              onToggle={handleAreaToggle}
            >
              <summary
                className={pageId === "serviceArea" ? "is-current" : undefined}
                aria-current={pageId === "serviceArea" ? "page" : undefined}
              >
                <span>{copy.nav.serviceArea}</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="header-dropdown-panel area-dropdown-panel">
                <div className="area-region-tabs" role="tablist" aria-label={isFrench ? "Régions desservies" : "Service regions"}>
                  {regionOrder.map((region) => {
                    const RegionIcon = regionIcons[region];
                    const cities = cityRoutes.filter((city) => city.region === region);
                    const isSelected = selectedRegion === region;
                    return (
                      <button
                        type="button"
                        key={region}
                        role="tab"
                        aria-selected={isSelected}
                        data-active={isSelected ? "true" : "false"}
                        className="area-region-tab"
                        onClick={() => setSelectedRegion(region)}
                        onMouseEnter={() => setSelectedRegion(region)}
                        onFocus={() => setSelectedRegion(region)}
                      >
                        <span className="area-tab-title">
                          <RegionIcon aria-hidden="true" />
                          <span>{regionLabels[region]}</span>
                        </span>
                        <span className="area-tab-count">{cities.length} {locale === "fr" ? "villes" : "cities"}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="area-city-panels">
                  {regionOrder.map((region) => {
                    const cities = cityRoutes.filter((city) => city.region === region);
                    const isSelected = selectedRegion === region;
                    return (
                      <div
                        key={region}
                        role="tabpanel"
                        data-active={isSelected ? "true" : "false"}
                        className="area-city-panel"
                      >
                        {cities.map((city) => (
                          <a
                            href={cityPath(locale, city.slug)}
                            key={city.slug}
                            className="city-pill"
                            onClick={closeDropdowns}
                          >
                            <MapPin aria-hidden="true" className="city-pin-icon" />
                            <span>{city[locale]}</span>
                          </a>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <div className="dropdown-footer">
                  <a className="dropdown-view-all" href={pathFor("serviceArea", locale)} onClick={closeDropdowns}>
                    <span>{copy.actions.checkArea}</span>
                    <ArrowRight aria-hidden="true" />
                  </a>
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
            <a
              className="language-link language-toggle"
              href={languageHref}
              aria-label={languageLabel}
              title={languageLabel}
            >
              <span aria-hidden="true" className="language-toggle-code">
                {isFrench ? "EN" : "FR"}
              </span>
              <span className="sr-only">{languageLabel}</span>
            </a>

            <Button asChild size="lg" className="cta-button">
              <a href={quotePath(locale)}>
                {quoteLabel}
              </a>
            </Button>

            <a
              className="nav-emergency-cta"
              href={site.emergencyPhoneHref}
              aria-label={`${copy.actions.emergency}: ${site.emergencyPhoneDisplay}`}
            >
              <span className="nav-emergency-icon" aria-hidden="true">
                <PhoneCall />
              </span>
              <span className="nav-emergency-copy">
                <small>{copy.actions.emergency}</small>
                <strong>{site.emergencyPhoneDisplay}</strong>
              </span>
            </a>
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
