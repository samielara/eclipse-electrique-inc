"use client";

import {
  ArrowRight,
  BatteryCharging,
  Building,
  Building2,
  Calendar,
  ChevronDown,
  Compass,
  Factory,
  HelpCircle,
  House,
  MapPin,
  Menu,
  PhoneCall,
  ScanSearch,
  Send,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const closeDropdowns = () => {
    if (servicesDropdownRef.current) servicesDropdownRef.current.open = false;
    if (areaDropdownRef.current) areaDropdownRef.current.open = false;
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
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
      if (
        mobileMenuRef.current?.open &&
        !mobileMenuRef.current.contains(target)
      ) {
        mobileMenuRef.current.open = false;
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
          <Link className="brand-link" href={pathFor("home", locale)}>
            <BrandMark />
          </Link>

          <nav className="desktop-nav" aria-label={isFrench ? "Navigation principale" : "Main navigation"}>
            <details
              className="header-dropdown header-dropdown-services"
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
                      <Link
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
                      </Link>
                    );
                  })}
                </div>
                <div className="dropdown-footer">
                  <Link className="dropdown-view-all" href={pathFor("services", locale)} onClick={closeDropdowns}>
                    <span>{copy.actions.exploreServices}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </details>

            <details
              className="header-dropdown area-dropdown header-dropdown-area"
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
                          <Link
                            href={cityPath(locale, city.slug)}
                            key={city.slug}
                            className="city-pill"
                            onClick={closeDropdowns}
                          >
                            <MapPin aria-hidden="true" className="city-pin-icon" />
                            <span>{city[locale]}</span>
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <div className="dropdown-footer">
                  <Link className="dropdown-view-all" href={pathFor("serviceArea", locale)} onClick={closeDropdowns}>
                    <span>{copy.actions.checkArea}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </details>

            {simpleLinks.map((link) => (
              <Link
                className={`nav-link-${link.pageId} ${pageId === link.pageId ? "is-current" : ""}`}
                href={pathFor(link.pageId, locale)}
                key={link.pageId}
                aria-current={pageId === link.pageId ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="desktop-actions">
            <ThemeToggle locale={locale} />
            <Link
              className="language-link language-toggle"
              href={languageHref}
              aria-label={languageLabel}
              title={languageLabel}
              scroll={false}
              prefetch={true}
            >
              <span aria-hidden="true" className="language-toggle-code">
                {isFrench ? "EN" : "FR"}
              </span>
              <span className="sr-only">{languageLabel}</span>
            </Link>

            <Button asChild size="lg" className="cta-button">
              <Link href={quotePath(locale)}>
                {quoteLabel}
              </Link>
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

          <details className="mobile-menu" ref={mobileMenuRef}>
            <summary aria-label={copy.nav.menu}>
              <Menu aria-hidden="true" className="menu-open-icon" />
              <X aria-hidden="true" className="menu-close-icon" />
              <span className="sr-only">{copy.nav.menu}</span>
            </summary>
            <div className="mobile-menu-panel">
              <div className="mobile-drawer-header">
                <BrandMark compact inverse={true} />
                <button
                  type="button"
                  className="mobile-drawer-close"
                  aria-label={isFrench ? "Fermer le menu" : "Close menu"}
                  onClick={closeMobileMenu}
                >
                  <X aria-hidden="true" />
                </button>
              </div>

              <nav className="mobile-nav-list" aria-label={isFrench ? "Navigation mobile" : "Mobile navigation"}>
                <Link
                  className={`mobile-nav-item ${pageId === "home" ? "is-active" : ""}`}
                  href={pathFor("home", locale)}
                  onClick={closeMobileMenu}
                  aria-current={pageId === "home" ? "page" : undefined}
                >
                  <span className="mobile-item-icon" aria-hidden="true">
                    <House />
                  </span>
                  <span className="mobile-item-text">{isFrench ? "Accueil" : "Home"}</span>
                </Link>

                <details
                  className="mobile-submenu mobile-nav-accordion"
                  open={pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number])}
                >
                  <summary
                    className={`mobile-nav-item mobile-nav-trigger ${
                      pageId === "services" || servicePageIds.includes(pageId as (typeof servicePageIds)[number])
                        ? "is-active"
                        : ""
                    }`}
                  >
                    <span className="mobile-item-icon" aria-hidden="true">
                      <Zap />
                    </span>
                    <span className="mobile-item-text">{copy.nav.services}</span>
                    <ChevronDown className="mobile-nav-arrow" aria-hidden="true" />
                  </summary>
                  <div className="mobile-submenu-panel">
                    <Link className="mobile-submenu-all" href={pathFor("services", locale)} onClick={closeMobileMenu}>
                      <span>{copy.actions.exploreServices}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                    {serviceLinks.map(({ serviceId, label }) => {
                      const ServiceIcon = serviceIcons[serviceId];
                      return (
                        <Link
                          href={pathFor(serviceId, locale)}
                          key={serviceId}
                          onClick={closeMobileMenu}
                          className={pageId === serviceId ? "is-current-service" : undefined}
                          aria-current={pageId === serviceId ? "page" : undefined}
                        >
                          <span className="mobile-subitem-icon" aria-hidden="true">
                            <ServiceIcon strokeWidth={1.8} />
                          </span>
                          <span>{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </details>

                <details
                  className="mobile-submenu mobile-area-submenu mobile-nav-accordion"
                  open={pageId === "serviceArea" || !!citySlug}
                >
                  <summary
                    className={`mobile-nav-item mobile-nav-trigger ${
                      pageId === "serviceArea" || !!citySlug ? "is-active" : ""
                    }`}
                  >
                    <span className="mobile-item-icon" aria-hidden="true">
                      <MapPin />
                    </span>
                    <span className="mobile-item-text">{copy.nav.serviceArea}</span>
                    <ChevronDown className="mobile-nav-arrow" aria-hidden="true" />
                  </summary>
                  <div className="mobile-submenu-panel">
                    <Link className="mobile-submenu-all" href={pathFor("serviceArea", locale)} onClick={closeMobileMenu}>
                      <span>{copy.actions.checkArea}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                    {regionOrder.map((region) => (
                      <div className="mobile-city-group" key={region}>
                        <strong>{regionLabels[region]}</strong>
                        <div className="mobile-city-chips">
                          {cityRoutes
                            .filter((city) => city.region === region)
                            .map((city) => (
                              <Link href={cityPath(locale, city.slug)} key={city.slug} onClick={closeMobileMenu}>
                                {city[locale]}
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>

                <Link
                  className={`mobile-nav-item ${pageId === "about" ? "is-active" : ""}`}
                  href={pathFor("about", locale)}
                  onClick={closeMobileMenu}
                  aria-current={pageId === "about" ? "page" : undefined}
                >
                  <span className="mobile-item-icon" aria-hidden="true">
                    <ShieldCheck />
                  </span>
                  <span className="mobile-item-text">{copy.nav.about}</span>
                </Link>

                <Link
                  className={`mobile-nav-item ${pageId === "faq" ? "is-active" : ""}`}
                  href={pathFor("faq", locale)}
                  onClick={closeMobileMenu}
                  aria-current={pageId === "faq" ? "page" : undefined}
                >
                  <span className="mobile-item-icon" aria-hidden="true">
                    <HelpCircle />
                  </span>
                  <span className="mobile-item-text">{copy.nav.faq}</span>
                </Link>

                <Link
                  className={`mobile-nav-item ${pageId === "contact" ? "is-active" : ""}`}
                  href={pathFor("contact", locale)}
                  onClick={closeMobileMenu}
                  aria-current={pageId === "contact" ? "page" : undefined}
                >
                  <span className="mobile-item-icon" aria-hidden="true">
                    <Send />
                  </span>
                  <span className="mobile-item-text">{copy.nav.contact}</span>
                </Link>
              </nav>

              <div className="mobile-drawer-bottom">
                <Link
                  className="mobile-drawer-cta mobile-quote"
                  href={quotePath(locale)}
                  onClick={closeMobileMenu}
                >
                  <Calendar aria-hidden="true" />
                  <span>{quoteLabel}</span>
                </Link>

                <a className="mobile-drawer-emergency mobile-emergency" href={site.emergencyPhoneHref}>
                  <PhoneCall aria-hidden="true" />
                  <span>{copy.actions.emergency}: {site.emergencyPhoneDisplay}</span>
                </a>

                <div className="mobile-drawer-actions">
                  <ThemeToggle locale={locale} />
                  <Link
                    className="mobile-drawer-lang"
                    href={languageHref}
                    scroll={false}
                    prefetch={true}
                    onClick={closeMobileMenu}
                  >
                    <span className="mobile-lang-code" aria-hidden="true">
                      {isFrench ? "EN" : "FR"}
                    </span>
                    <span>{languageLabel}</span>
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
