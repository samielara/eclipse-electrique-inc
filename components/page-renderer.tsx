import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleCheckBig,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import { CinematicHero } from "@/components/motion/cinematic-hero";
import { HeroVideo } from "@/components/motion/hero-video";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AiAssistant } from "@/components/ai-assistant";
import { ServiceCard } from "@/components/service-card";
import { SectorMatrix } from "@/components/sector-matrix";
import { ThermographyProof } from "@/components/thermography-proof";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { QuoteIntakeWizard } from "@/components/quote-intake-wizard";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { content, type FaqItem } from "@/content/site-content";
import { cityBySlug, cityPath, cityRoutes } from "@/lib/city-routes";
import {
  pathFor,
  quotePath,
  servicePageIds,
  type Locale,
  type PageId,
  type ServicePageId,
} from "@/lib/routes";
import { site } from "@/lib/site";

interface PageRendererProps {
  locale: Locale;
  pageId: PageId;
  citySlug?: string;
}

function ActionPair({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const copy = content[locale];

  return (
    <div className="action-pair">
      <Button asChild size="lg" className="primary-action">
        <a href={quotePath(locale)}>
          {copy.actions.quote}
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className={dark ? "secondary-action secondary-action-dark" : "secondary-action"}
      >
        <a href={site.emergencyPhoneHref}>
          <PhoneCall aria-hidden="true" />
          {copy.actions.emergency}
        </a>
      </Button>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " is-centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

function ServicesGrid({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const copy = content[locale];

  return (
    <div className={`services-grid${compact ? " is-compact" : ""}`}>
      {servicePageIds.map((serviceId) => (
        <ServiceCard
          actionLabel={copy.actions.learnMore}
          key={serviceId}
          locale={locale}
          page={copy.pages[serviceId]}
          serviceId={serviceId}
        />
      ))}
    </div>
  );
}

function CapabilitiesGrid({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <div className="capabilities-grid">
      {copy.home.capabilities.map((capability, index) => (
        <article className="capability-card" key={capability.title}>
          <span className="capability-index">0{index + 1}</span>
          <h3>{capability.title}</h3>
          <ul>
            {capability.items.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item.includes("2008") ? <>{item.split("2008")[0]}<NumberTicker value={2008} />{item.split("2008")[1]}</> : item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>
            <span>{item.question}</span>
            <span className="faq-marker" aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}

function InnerHero({ locale, pageId }: PageRendererProps) {
  const page = content[locale].pages[pageId];
  const isFrench = locale === "fr";

  return (
    <section className="inner-hero">
      <div className="technical-grid" aria-hidden="true" />
      <div className="site-container inner-hero-layout">
        <div>
          <p className="eyebrow eyebrow-light">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="inner-hero-intro">{page.intro}</p>
          {pageId !== "privacy" && <ActionPair locale={locale} dark />}
        </div>
        <aside className="hero-credential" aria-label={isFrench ? "Licence" : "Licence information"}>
          <ShieldCheck aria-hidden="true" />
          <span>{isFrench ? "Licence d’entrepreneur" : "Contractor licence"}</span>
          <strong>RBQ {site.rbq}</strong>
          <small>{isFrench ? "Délivrée en 2008" : "Issued in 2008"}</small>
        </aside>
      </div>
    </section>
  );
}

function CtaBand({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";
  return (
    <section className="cta-band">
      <div className="site-container cta-band-inner">
        <div>
          <p className="eyebrow eyebrow-light">
            {isFrench ? "Votre projet" : "Your project"}
          </p>
          <h2>{isFrench ? "Parlons de vos besoins électriques" : "Let’s discuss your electrical needs"}</h2>
        </div>
        <ActionPair locale={locale} dark />
      </div>
    </section>
  );
}

function ProjectGallery({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";
  const projects = isFrench
    ? [
        {
          src: "/media/industrial-panel.webp",
          eyebrow: "Distribution industrielle",
          title: "Câblage structuré. Accès clair. Maintenance simplifiée.",
          description: "Une installation ordonnée facilite l’entretien et soutient la continuité des opérations.",
          alt: "Panneau de contrôle industriel avec câblage et composants électriques",
        },
        {
          src: "/media/electrical-testing.webp",
          eyebrow: "Mesure et vérification",
          title: "Les décisions reposent sur des données, pas des suppositions",
          description: "Essais, thermographie et validation avant la remise en service.",
          alt: "Technicien testant un panneau électrique avec un multimètre",
        },
        {
          src: "/eclipse-electrical-grid.webp",
          eyebrow: "Environnements connectés",
          title: "L’électricité intégrée à l’architecture moderne",
          description: "Distribution, contrôle et éclairage pensés comme un système cohérent.",
          alt: "Architecture moderne avec distribution électrique et éclairage intégrés",
        },
      ]
    : [
        {
          src: "/media/industrial-panel.webp",
          eyebrow: "Industrial distribution",
          title: "Structured wiring. Clear access. Simpler maintenance.",
          description: "An orderly installation supports safer service and operational continuity.",
          alt: "Industrial control panel with electrical wiring and components",
        },
        {
          src: "/media/electrical-testing.webp",
          eyebrow: "Testing and verification",
          title: "Decisions grounded in measurements, not assumptions",
          description: "Testing, thermography and validation before equipment returns to service.",
          alt: "Technician testing an electrical panel with a multimeter",
        },
        {
          src: "/eclipse-electrical-grid.webp",
          eyebrow: "Connected environments",
          title: "Electrical systems integrated into modern architecture",
          description: "Distribution, controls and lighting designed as one coherent system.",
          alt: "Modern architecture with integrated electrical distribution and lighting",
        },
      ];

  return (
    <section className="project-gallery-section section-pad" data-testid="project-gallery">
      <div className="site-container">
        <div className="project-gallery-heading">
          <SectionHeading
            eyebrow={isFrench ? "L’expertise, en détail" : "Expertise, in detail"}
            title={isFrench ? "La précision électrique en action" : "Electrical precision in action"}
            intro={isFrench
              ? "Du diagnostic à la mise en service, chaque détail doit inspirer confiance."
              : "From diagnosis to commissioning, every detail should earn your confidence."}
          />
          <span aria-hidden="true" className="project-gallery-index">02 / 06</span>
        </div>
        <div className="project-gallery-grid">
          {projects.map((project, index) => (
            <article className={`project-story${index === 0 ? " project-story-featured" : ""}`} key={project.src}>
              <div className="project-story-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={project.alt}
                  decoding="async"
                  height="1067"
                  loading="lazy"
                  src={project.src}
                  width="1600"
                />
                <span className="project-story-number" aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="project-story-copy">
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceVisualPanel({ locale, pageId }: { locale: Locale; pageId: ServicePageId }) {
  const page = content[locale].pages[pageId];
  const isFrench = locale === "fr";
  const mediaByService: Record<ServicePageId, { src: string; position: string }> = {
    residential: { src: "/eclipse-electrical-grid.webp", position: "center" },
    commercial: { src: "/media/electrical-testing.webp", position: "center" },
    industrial: { src: "/media/industrial-panel.webp", position: "center" },
    maintenance: { src: "/media/electrical-testing.webp", position: "center" },
    generators: { src: "/media/industrial-panel.webp", position: "center" },
    thermography: { src: "/media/electrical-testing.webp", position: "center" },
    security: { src: "/eclipse-electrical-grid.webp", position: "70% center" },
  };
  const media = mediaByService[pageId];

  return (
    <section className="service-visual-panel" data-testid="service-visual-panel">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" decoding="async" height="900" loading="eager" src={media.src}
        style={{ objectPosition: media.position }} width="1600" />
      <div className="service-visual-shade" />
      <div className="service-visual-content">
        <div>
          <p className="eyebrow eyebrow-amber">{isFrench ? "L’expertise en contexte" : "Expertise in context"}</p>
          <h2>{page.title}</h2>
        </div>
        <ol aria-label={isFrench ? "Points clés du service" : "Service highlights"}>
          {page.items?.slice(0, 3).map((item, index) => (
            <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const page = copy.pages.home;
  const isFrench = locale === "fr";

  const trustBadgeIcon = (index: number) => {
    if (index === 0) return <ShieldCheck aria-hidden="true" />;
    if (index === 1) return <BadgeCheck aria-hidden="true" />;
    return <PhoneCall aria-hidden="true" />;
  };

  return (
    <>
      <CinematicHero
        actions={<ActionPair locale={locale} dark />}
        background={
          <>
            {/* Decorative motion background; the image remains the no-motion fallback. */}
            <HeroVideo />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="home-hero-image"
              decoding="async"
              fetchPriority="high"
              height="941"
              src="/eclipse-electrical-grid.webp"
              width="1672"
            />
            <div className="home-hero-overlay" />
            <AnimatedGridPattern />
          </>
        }
        eyebrow={<p className="eyebrow eyebrow-amber">{page.eyebrow}</p>}
        heading={<h1>{page.title}</h1>}
        intro={<p>{page.intro}</p>}
        sideNote={
          <div className="hero-side-note" aria-hidden="true">
            <span>MTL</span>
            <span>45.5019° N</span>
          </div>
        }
        trustMarkers={
          <div
            aria-label={isFrench ? "Repères de confiance" : "Trust markers"}
            className="hero-trust-badges"
          >
            {copy.home.trustBadges.map((badge, index) => (
              <div className="hero-trust-badge" key={badge.label}>
                <span className="hero-trust-badge-icon">
                  {trustBadgeIcon(index)}
                </span>
                <span>
                  <small>{badge.label}</small>
                  <strong>{badge.value}</strong>
                </span>
              </div>
            ))}
          </div>
        }
      />

      <section className="trust-strip" aria-label={isFrench ? "Renseignements vérifiés" : "Verified information"}>
        <div className="site-container trust-grid trust-badge-bar">
          {copy.home.trust.map((item, index) => (
            <div key={item}>
              <CircleCheckBig aria-hidden="true" />
              <span>{item}</span>
              <small>0{index + 1}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad services-section">
        <div className="site-container">
          <SectionHeading
            eyebrow={copy.home.servicesEyebrow}
            title={copy.home.servicesTitle}
            intro={copy.home.servicesIntro}
          />
          <ServicesGrid locale={locale} />
          <div className="section-link-row">
            <a className="arrow-link" href={pathFor("services", locale)}>
              {copy.actions.exploreServices}<ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <ProjectGallery locale={locale} />

      <section className="section-pad capabilities-section">
        <div className="site-container">
          <SectionHeading
            eyebrow={copy.home.capabilitiesEyebrow}
            title={copy.home.capabilitiesTitle}
            intro={copy.home.capabilitiesIntro}
          />
          <CapabilitiesGrid locale={locale} />
        </div>
      </section>

      <SectorMatrix locale={locale} copy={copy.home.sectorMatrix} />
      <ThermographyProof locale={locale} copy={copy.home.thermographyProof} />

      <section className="section-pad process-section">
        <div className="site-container split-heading">
          <SectionHeading
            eyebrow={copy.home.processEyebrow}
            title={copy.home.processTitle}
            intro={copy.home.processIntro}
          />
          <div className="process-grid">
            {copy.process.map((step, index) => (
              <article key={step.title}>
                <span>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad territory-preview">
        <div className="site-container territory-layout">
          <div>
            <SectionHeading
              eyebrow={copy.home.territoryEyebrow}
              title={copy.home.territoryTitle}
              intro={copy.home.territoryIntro}
            />
            <a className="arrow-link" href={pathFor("serviceArea", locale)}>
              {copy.actions.checkArea}<ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="region-preview-grid">
            {copy.regions.map((region, index) => (
              <article key={region.name}>
                <span>0{index + 1}</span>
                <MapPin aria-hidden="true" />
                <h3>{region.name}</h3>
                <p>{region.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}

function ServicesPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <>
      <InnerHero locale={locale} pageId="services" />
      <section className="section-pad">
        <div className="site-container">
          <ServicesGrid locale={locale} />
        </div>
      </section>
      <section className="section-pad process-section">
        <div className="site-container">
          <SectionHeading
            eyebrow={copy.home.processEyebrow}
            title={copy.home.processTitle}
            intro={copy.home.processIntro}
          />
          <div className="process-grid horizontal-process">
            {copy.process.map((step, index) => (
              <article key={step.title}>
                <span>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

function ServiceDetailPage({ locale, pageId }: { locale: Locale; pageId: ServicePageId }) {
  const copy = content[locale];
  const page = copy.pages[pageId];
  const isFrench = locale === "fr";

  return (
    <>
      <InnerHero locale={locale} pageId={pageId} />
      <div className="site-container service-visual-wrap">
        <ServiceVisualPanel locale={locale} pageId={pageId} />
      </div>
      <section className="section-pad service-detail-section">
        <div className="site-container service-detail-grid">
          <div>
            <p className="eyebrow">{copy.offeredWork}</p>
            <h2>{isFrench ? "Un aperçu des travaux offerts" : "An overview of available work"}</h2>
            {page.paragraphs?.map((paragraph) => <p className="body-lead" key={paragraph}>{paragraph}</p>)}
            <ul className="work-list">
              {page.items?.map((item) => (
                <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <aside className="contact-rail">
            <span className="rail-icon"><Phone aria-hidden="true" /></span>
            <p className="eyebrow">{isFrench ? "Discutons-en" : "Let’s talk"}</p>
            <h2>{isFrench ? "Un accès direct à l’équipe" : "Direct access to the team"}</h2>
            <p>{isFrench ? "Décrivez le bâtiment, les travaux et l’emplacement au moment de communiquer avec nous." : "Include the property, work and location when you contact us."}</p>
            <a href={site.officePhoneHref}><strong>{copy.actions.office}</strong><span>{site.officePhoneDisplay}</span></a>
            <a href={site.emailHref}><strong>{copy.actions.email}</strong><span>{site.email}</span></a>
            <a href={pathFor("serviceArea", locale)}><strong>{copy.actions.checkArea}</strong><ArrowRight aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      {pageId === "thermography" && (
        <ThermographyProof locale={locale} copy={copy.home.thermographyProof} />
      )}

      {page.faq && (
        <section className="section-pad faq-section">
          <div className="site-container narrow-container">
            <SectionHeading eyebrow="FAQ" title={copy.commonFaqTitle} />
            <FaqList items={page.faq} />
          </div>
        </section>
      )}

      {page.related && (
        <section className="section-pad related-section">
          <div className="site-container">
            <SectionHeading eyebrow={copy.servicesSectionLabel} title={copy.relatedServices} />
            <div className="services-grid is-compact">
              {page.related.map((relatedId) => (
                <ServiceCard
                  actionLabel={copy.actions.learnMore}
                  key={relatedId}
                  locale={locale}
                  page={copy.pages[relatedId]}
                  serviceId={relatedId}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand locale={locale} />
    </>
  );
}

function ServiceAreaPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <>
      <InnerHero locale={locale} pageId="serviceArea" />
      <section className="section-pad">
        <div className="site-container region-list">
          {copy.regions.map((region, index) => (
            <article key={region.name}>
              <header><span>0{index + 1}</span><MapPin aria-hidden="true" /><h2>{region.name}</h2></header>
              <p>{region.description}</p>
              <ul>
                {region.cities.map((cityName) => {
                  const city = cityRoutes.find((route) => route[locale] === cityName);
                  return (
                    <li key={cityName}>
                      {city ? <a href={cityPath(locale, city.slug)}>{cityName}</a> : cityName}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
          <p className="region-note"><BadgeCheck aria-hidden="true" />{copy.regionNote}</p>
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

function CityPage({ locale, citySlug }: { locale: Locale; citySlug: string }) {
  const copy = content[locale];
  const city = cityBySlug(citySlug);
  const isFrench = locale === "fr";

  if (!city) return null;

  const cityName = city[locale];
  const regionName = isFrench
    ? { montreal: "Montréal", northShore: "Rive-Nord", southShore: "Rive-Sud" }[city.region]
    : { montreal: "Montréal", northShore: "North Shore", southShore: "South Shore" }[city.region];

  return (
    <>
      <section className="inner-hero city-hero">
        <div className="technical-grid" aria-hidden="true" />
        <div className="site-container inner-hero-layout">
          <div>
            <p className="eyebrow eyebrow-light">
              {isFrench ? `${regionName} · Territoire desservi` : `${regionName} · Service area`}
            </p>
            <h1>{isFrench ? `Électricien à ${cityName}` : `Electrician services in ${cityName}`}</h1>
            <p className="inner-hero-intro">
              {isFrench
                ? `Cette page rassemble les services électriques publiés pour une demande située à ${cityName}. La disponibilité dépend de la nature et de l’emplacement des travaux; confirmez toujours l’adresse avec l’équipe.`
                : `This page brings together the electrical services published for a request in ${cityName}. Availability depends on the work and exact location; always confirm the service address with the team.`}
            </p>
            <ActionPair locale={locale} dark />
          </div>
          <aside className="hero-credential" aria-label={isFrench ? "Licence" : "Licence information"}>
            <MapPin aria-hidden="true" />
            <span>{isFrench ? "Ville publiée" : "Published city"}</span>
            <strong>{cityName}</strong>
            <small>RBQ {site.rbq}</small>
          </aside>
        </div>
      </section>

      <section className="section-pad city-service-section">
        <div className="site-container service-detail-grid">
          <div>
            <SectionHeading
              eyebrow={isFrench ? "Services publiés" : "Published services"}
              title={isFrench ? `Travaux électriques à ${cityName}` : `Electrical work in ${cityName}`}
              intro={
                isFrench
                  ? "Explorez nos sept parcours de services et indiquez le bâtiment, les travaux envisagés et l'emplacement dans votre demande."
                  : "Explore our seven service pathways and include the property, work planned and location in your request."
              }
            />
            <ServicesGrid locale={locale} />
          </div>
          <aside className="contact-rail city-contact-rail">
            <span className="rail-icon"><Phone aria-hidden="true" /></span>
            <p className="eyebrow">{isFrench ? "Votre projet" : "Your project"}</p>
            <h2>{isFrench ? `Parlons de votre projet à ${cityName}` : `Let’s discuss your ${cityName} project`}</h2>
            <p>
              {isFrench
                ? "Confirmez le lieu précis et la nature des travaux afin que l'équipe puisse discuter des prochaines étapes."
                : "Confirm the exact location and work required so the team can discuss the next steps."}
            </p>
            <a href={site.officePhoneHref}><strong>{copy.actions.office}</strong><span>{site.officePhoneDisplay}</span></a>
            <a href={site.emailHref}><strong>{copy.actions.email}</strong><span>{site.email}</span></a>
            <a href={cityPath(locale === "fr" ? "en" : "fr", city.slug)}>
              <strong>{isFrench ? "English" : "Français"}</strong><ArrowRight aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const page = copy.pages.about;
  const isFrench = locale === "fr";
  return (
    <>
      <InnerHero locale={locale} pageId="about" />
      <section className="section-pad about-section">
        <div className="site-container about-grid">
          <div className="about-copy">
            <p className="eyebrow">{isFrench ? "Profil vérifié" : "Verified profile"}</p>
            <h2>{isFrench ? "Une présence établie depuis 2008" : "Established since 2008"}</h2>
            {page.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="licence-card">
            <ShieldCheck aria-hidden="true" />
            <p>{isFrench ? "Licence RBQ" : "RBQ licence"}</p>
            <strong>{site.rbq}</strong>
            <span>{isFrench ? "Numéro d’entreprise du Québec" : "Québec enterprise number"}</span>
            <b>{site.neq}</b>
            <a href={site.cmeqUrl} rel="noreferrer" target="_blank">
              {isFrench ? "Consulter la fiche CMEQ" : "View the CMEQ listing"}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="section-pad services-section">
        <div className="site-container">
          <SectionHeading eyebrow={copy.home.servicesEyebrow} title={copy.home.servicesTitle} />
          <ServicesGrid locale={locale} compact />
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

function FaqPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const page = copy.pages.faq;
  return (
    <>
      <InnerHero locale={locale} pageId="faq" />
      <section className="section-pad faq-section">
        <div className="site-container narrow-container">
          {page.faq && <FaqList items={page.faq} />}
          <div className="faq-contact-note">
            <Phone aria-hidden="true" />
            <p>{locale === "fr" ? "Vous avez une autre question? Appelez le bureau." : "Have another question? Call the office."}</p>
            <a href={site.officePhoneHref}>{site.officePhoneDisplay}</a>
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const isFrench = locale === "fr";
  return (
    <>
      <InnerHero locale={locale} pageId="contact" />
      <section className="section-pad contact-section">
        <div className="site-container contact-layout">
          <div className="contact-methods">
            <article><Phone aria-hidden="true" /><div><p>{copy.contact.office}</p><a href={site.officePhoneHref}>{site.officePhoneDisplay}</a><span>{isFrench ? "Demandes générales et planification" : "General requests and planning"}</span></div></article>
            <article className="emergency-card"><PhoneCall aria-hidden="true" /><div><p>{copy.contact.emergency}</p><a href={site.emergencyPhoneHref}>{site.emergencyPhoneDisplay}</a><span>{copy.contact.emergencyNote}</span></div></article>
            <article><Mail aria-hidden="true" /><div><p>{copy.contact.email}</p><a href={site.emailHref}>{site.email}</a><span>{isFrench ? "Écrivez-nous depuis votre application de courriel" : "Write from your preferred email application"}</span></div></article>
            <article><MapPin aria-hidden="true" /><div><p>{copy.contact.territory}</p><strong>{copy.contact.territoryValue}</strong><a href={pathFor("serviceArea", locale)}>{copy.actions.checkArea}</a></div></article>
          </div>
          <QuoteIntakeWizard locale={locale} />
        </div>
      </section>
    </>
  );
}

function PrivacyPage({ locale }: { locale: Locale }) {
  const page = content[locale].pages.privacy;
  const isFrench = locale === "fr";
  return (
    <>
      <InnerHero locale={locale} pageId="privacy" />
      <section className="section-pad privacy-section">
        <article className="site-container prose-card">
          <div className="privacy-status"><ShieldCheck aria-hidden="true" /><span>{isFrench ? "Version de pré-lancement" : "Pre-launch version"}</span></div>
          {page.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>{isFrench ? "Communiquer avec l’entreprise" : "Contact the company"}</h2>
          <p>{isFrench ? "Pour toute question liée à cette version du site, écrivez à l’adresse publique de l’entreprise." : "For questions about this version of the website, write to the company’s public email address."}</p>
          <a className="arrow-link" href={site.emailHref}>{site.email}<ArrowRight aria-hidden="true" /></a>
        </article>
      </section>
    </>
  );
}

export function PageRenderer({ locale, pageId, citySlug }: PageRendererProps) {
  let page;

  if (citySlug) page = <CityPage locale={locale} citySlug={citySlug} />;
  else if (pageId === "home") page = <HomePage locale={locale} />;
  else if (pageId === "services") page = <ServicesPage locale={locale} />;
  else if (servicePageIds.includes(pageId as ServicePageId)) {
    page = <ServiceDetailPage locale={locale} pageId={pageId as ServicePageId} />;
  } else if (pageId === "serviceArea") page = <ServiceAreaPage locale={locale} />;
  else if (pageId === "about") page = <AboutPage locale={locale} />;
  else if (pageId === "faq") page = <FaqPage locale={locale} />;
  else if (pageId === "contact") page = <ContactPage locale={locale} />;
  else page = <PrivacyPage locale={locale} />;

  return (
    <div lang={locale === "fr" ? "fr-CA" : "en-CA"}>
      <SiteHeader locale={locale} pageId={pageId} citySlug={citySlug} />
      <MobileActionBar locale={locale} />
      <main id="contenu">{page}</main>
      <SiteFooter locale={locale} />
      <AiAssistant locale={locale} />
    </div>
  );
}
