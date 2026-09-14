import {
  ArrowRight,
  BadgeCheck,
  Check,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import { CinematicHero } from "@/components/motion/cinematic-hero";
import { HeroVideo } from "@/components/motion/hero-video";
import { Interactive3DScene } from "@/components/motion/interactive-3d-scene";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { FullPageScroll } from "@/components/motion/full-page-scroll";
import { ServiceCarousel } from "@/components/motion/service-carousel";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AiAssistant } from "@/components/ai-assistant";
import { HomeContextSelector } from "@/components/home/home-context-selector";
import { PopularServicesSlider } from "@/components/home/popular-services-slider";
import { ProblemIntentGrid } from "@/components/home/problem-intent-grid";
import { VisualProcessStepper } from "@/components/home/visual-process-stepper";
import { TrustProofBand } from "@/components/home/trust-proof-band";
import { TechnicalExpertiseTabs } from "@/components/home/technical-expertise-tabs";
import { VisualCoverageHub } from "@/components/home/visual-coverage-hub";
import { HomeFaqTeaser } from "@/components/home/home-faq-teaser";
import { DispatchCoverageConsole } from "@/components/motion/dispatch-coverage-console";
import { HeroMediaTransition } from "@/components/motion/hero-media-transition";
import { ServiceCard } from "@/components/service-card";
import { VisualServicesGrid } from "@/components/visual-services-grid";
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
      <Button asChild size="lg" className="primary-action hero-primary-cta">
        <a href={quotePath(locale)}>
          {copy.actions.quote}
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className={dark ? "secondary-action secondary-action-dark hero-emergency-cta" : "secondary-action hero-emergency-cta"}
      >
        <a href={site.emergencyPhoneHref}>
          <span className="emergency-action-icon" aria-hidden="true">
            <PhoneCall />
          </span>
          <span><small>{copy.actions.emergency}</small><strong>{site.emergencyPhoneDisplay}</strong></span>
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

function ServicesGrid({ locale, compact = false, homepage = false }: { locale: Locale; compact?: boolean; homepage?: boolean }) {
  const copy = content[locale];
  const ids = homepage ? servicePageIds.slice(0, 3) : servicePageIds;

  return (
    <div className={`services-grid${compact ? " is-compact" : ""}`}>
      {ids.map((serviceId) => (
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

function BentoServicesSection({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";
  return (
    <div className="bento-services-grid mb-12">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
          {isFrench ? "Pôles d'Ingénierie & Services" : "Engineering & Service Hubs"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
          {isFrench ? "Une Expertise Technique Sans Équivalent." : "Unrivaled Technical Electrical Expertise."}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          {isFrench 
            ? "Chaque projet bénéficie d'une rigueur absolue : plans certifiés, pièces homologuées CSA et conformité intégrale au Code de construction du Québec."
            : "Every project meets absolute engineering rigor: certified schematics, CSA-approved equipment, and 100% Quebec Construction Code compliance."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tile 1: 200A Panel Upgrade */}
        <div className="md:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden group">
          <div className="relative z-10 max-w-md space-y-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">01 // {isFrench ? "RÉSIDENTIEL & COMMERCIAL" : "RESIDENTIAL & COMMERCIAL"}</span>
            <h3 className="text-2xl font-bold font-display text-white">{isFrench ? "Surclassement de Panneaux 100A ➔ 200A" : "100A ➔ 200A Electrical Panel Upgrade"}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {isFrench 
                ? "Préparez votre résidence pour bornes VE, thermopompes et génératrices. Remplacement complet avec mise à la terre certifiée et approbation Hydro-Québec."
                : "Equip your home for EV chargers, heat pumps, and backup power. Complete replacement with master grounding and Hydro-Québec sign-off."}
            </p>
            <ul className="text-xs font-mono space-y-2 text-slate-400 pt-2">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> {isFrench ? "Coupure et rebranchement Hydro-Québec coordonnés" : "Seamless Hydro-Québec disconnection and reconnection"}</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> {isFrench ? "Protection de surtension intégrée pour toute la maison" : "Whole-home integrated surge suppression system"}</li>
            </ul>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-35 group-hover:opacity-60 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/style-lock-master.jpg" alt="Panneau 200A" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Tile 2: Urgence 24/7 */}
        <div className="glass-card rounded-2xl p-8 space-y-4 border-red-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold">02 // {isFrench ? "DÉPÊCHE RAPIDE" : "RAPID DISPATCH"}</span>
            <h3 className="text-2xl font-bold font-display text-white">{isFrench ? "Urgence Électrique 24/7" : "24/7 Electrical Emergency"}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {isFrench 
                ? "Panne partielle ou totale, odeur de surchauffe, disjoncteur qui déclenche. Déploiement immédiat de camions-ateliers entièrement équipés."
                : "Complete or partial outage, burning smell, breaker tripping. Immediate dispatch of fully stocked mobile emergency trucks."}
            </p>
          </div>
          <a href={site.emergencyPhoneHref} className="btn-glass-danger w-full py-2.5 rounded-lg text-xs font-bold text-center block font-mono">
            {isFrench ? "Ligne Directe 24/7 →" : "Direct 24/7 Line →"}
          </a>
        </div>

        {/* Tile 3: Thermographie FLIR */}
        <div className="glass-card rounded-2xl p-8 space-y-4 relative overflow-hidden">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">03 // {isFrench ? "PRÉVENTION INCENDIE" : "FIRE PREVENTION"}</span>
          <h3 className="text-xl font-bold font-display text-white">{isFrench ? "Thermographie Infrarouge FLIR" : "FLIR Infrared Thermography"}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isFrench
              ? "Détectez les anomalies thermiques invisibles à l'œil nu sans interrompre vos opérations industrielles ou commerciales."
              : "Detect invisible thermal anomalies without interrupting commercial or industrial plant operations."}
          </p>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
            {isFrench ? "Rapport certifié pour assureurs" : "Certified underwriter insurance report"}
          </div>
        </div>

        {/* Tile 4: Industriel 600V */}
        <div className="glass-card rounded-2xl p-8 space-y-4 relative overflow-hidden">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">04 // {isFrench ? "HAUTE PUISSANCE" : "HIGH VOLTAGE"}</span>
          <h3 className="text-xl font-bold font-display text-white">{isFrench ? "Industriel 600V Triphasé" : "600V 3-Phase Industrial"}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isFrench
              ? "Alimentation de machinerie lourde, centres de contrôle de moteurs (MCC), transformateurs secs et éclairage industriel."
              : "Heavy machinery distribution, motor control centers (MCC), dry transformers, and factory lighting."}
          </p>
          <span className="text-xs font-mono text-slate-400 block pt-1">{isFrench ? "Maintenance programmée & arrêts d'usine" : "Scheduled shutdowns & turnkey hookups"}</span>
        </div>

        {/* Tile 5: Génératrices Generac */}
        <div className="glass-card rounded-2xl p-8 space-y-4 relative overflow-hidden">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">05 // {isFrench ? "CONTINUITÉ" : "BACKUP POWER"}</span>
          <h3 className="text-xl font-bold font-display text-white">{isFrench ? "Génératrices Automatiques" : "Automatic Standby Generators"}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isFrench
              ? "Installation de commutateurs de transfert automatique (ATS) Generac pour une alimentation ininterrompue en cas de panne réseau."
              : "Turnkey Generac automatic transfer switch (ATS) installations ensuring seamless power through winter storms."}
          </p>
          <span className="text-xs font-mono text-slate-400 block pt-1">{isFrench ? "Détaillant et installateur certifié" : "Certified dealer & installer"}</span>
        </div>
      </div>
    </div>
  );
}

function HomepageServices({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <ServiceCarousel
      actionLabel={copy.actions.learnMore}
      eyebrow={copy.home.servicesEyebrow}
      intro={copy.home.servicesIntro}
      items={servicePageIds.slice(0, 3).map(id => ({ id, page: copy.pages[id] }))}
      locale={locale}
      title={copy.home.servicesTitle}
    />
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

const pageHeroImages: Partial<Record<PageId, string>> = {
  home: "/media/eclipse-team-fleet-hero.jpg",
  services: "/media/services-overview-master.jpg",
  residential: "/media/service-residential-master.jpg",
  commercial: "/media/service-commercial-master.jpg",
  industrial: "/media/service-industrial-master.jpg",
  maintenance: "/media/service-emergency-master.jpg",
  generators: "/media/service-generators-master.jpg",
  thermography: "/media/service-thermography-master.jpg",
  security: "/media/service-security-master.jpg",
  serviceArea: "/media/service-coverage-map.png",
  about: "/media/about-craft-master.jpg",
  faq: "/media/faq-master-consultation.jpg",
  contact: "/media/contact-master-dispatch.jpg",
  privacy: "/media/service-commercial-master.jpg",
};

interface InnerHeroProps {
  locale: Locale;
  pageId?: PageId;
  citySlug?: string;
  customImage?: string;
  secondaryImage?: string;
}

function InnerHero({ locale, pageId, citySlug, customImage, secondaryImage }: InnerHeroProps) {
  const isFrench = locale === "fr";
  const city = citySlug ? cityBySlug(citySlug) : undefined;
  const page = pageId ? content[locale].pages[pageId] : undefined;

  const regionName = city
    ? isFrench
      ? { montreal: "Montréal", northShore: "Rive-Nord", southShore: "Rive-Sud" }[city.region]
      : { montreal: "Montréal", northShore: "North Shore", southShore: "South Shore" }[city.region]
    : undefined;

  const eyebrow = city
    ? isFrench
      ? `${regionName} · Territoire desservi`
      : `${regionName} · Service area`
    : page?.eyebrow || "";

  const title = city
    ? isFrench
      ? `Électricien à ${city[locale]}`
      : `Electrician in ${city[locale]}`
    : page?.title || "";

  const intro = city
    ? isFrench
      ? `Services de maître électricien certifié déployés à ${city[locale]} et dans le ${regionName}. Déplacement rapide pour travaux résidentiels, commerciaux et urgences 24/7.`
      : `Certified master electrician services deployed in ${city[locale]} and across the ${regionName}. Rapid dispatch for residential, commercial, and 24/7 emergencies.`
    : page?.intro || "";

  const imageSrc =
    customImage ||
    (city
      ? city.region === "northShore"
        ? "/media/area-north-shore.jpg"
        : city.region === "southShore"
        ? "/media/area-south-shore.jpg"
        : "/media/service-area-montreal-fleet.jpg"
      : (pageId && pageHeroImages[pageId]) || "/media/service-residential-master.jpg");

  const resolvedSecondary =
    secondaryImage || (pageId === "serviceArea" ? "/media/service-coverage-map.png" : undefined);

  return (
    <section className={`inner-hero inner-hero-cinematic inner-hero-${pageId || "default"}`} data-testid="inner-hero-cinematic">
      <div className="inner-hero-media-bg" aria-hidden="true">
        {resolvedSecondary ? (
          <HeroMediaTransition
            locale={locale}
            primarySrc={imageSrc}
            primaryAlt={title}
            secondarySrc={resolvedSecondary}
            secondaryAlt={
              isFrench
                ? "Carte radar de couverture du territoire couvert par Éclipse Électrique (Montréal, Laval, Longueuil, Brossard)"
                : "Éclipse Électrique service territory radar coverage map (Montreal, Laval, Longueuil, Brossard)"
            }
            transitionDelayMs={3000}
            showIndicators={true}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            alt={title}
            className="inner-hero-img"
            decoding="async"
            fetchPriority="high"
            height="900"
            src={imageSrc}
            width="1600"
          />
        )}
        <div className="inner-hero-gradient-overlay" />
      </div>

      <div className="site-container inner-hero-container">
        <div className="inner-hero-glass-card">
          <p className="eyebrow eyebrow-amber">{eyebrow}</p>
          <h1 className="inner-hero-title">{title}</h1>
          <div className="lightning-divider" aria-hidden="true">
            <span className="lightning-divider-icon">⚡</span>
          </div>
          <p className="inner-hero-intro-text">{intro}</p>
          {pageId !== "privacy" && <ActionPair locale={locale} dark />}

          <div className="inner-hero-trust-pill">
            <ShieldCheck aria-hidden="true" />
            <span>
              <strong>RBQ {site.rbq}</strong> · {isFrench ? "Maître électricien CMEQ / CCQ" : "Certified Master Electrician"}
            </span>
          </div>
        </div>
      </div>

      <div className="inner-hero-bottom-bar" aria-hidden="true">
        <div className="site-container inner-hero-bottom-inner">
          <div className="inner-hero-bottom-item">
            <span className="accent-yellow">⚡</span>
            <span>{isFrench ? "MAÎTRE ÉLECTRICIEN CERTIFIÉ" : "CERTIFIED MASTER ELECTRICIAN"}</span>
          </div>
          <div className="inner-hero-bottom-divider" />
          <div className="inner-hero-bottom-item">
            <span>RBQ : {site.rbq} · NEQ : {site.neq}</span>
          </div>
          <div className="inner-hero-bottom-divider" />
          <div className="inner-hero-bottom-item">
            <span>{isFrench ? "GARANTIE 100% CONFORMITÉ HYDRO-QUÉBEC" : "100% HYDRO-QUÉBEC CODE COMPLIANCE"}</span>
          </div>
        </div>
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
          src: "/media/style-lock-master.jpg",
          eyebrow: "Surclassement 200A",
          title: "Précision d'ingénierie et conformité Hydro-Québec",
          description: "Raccordement de panneaux 200A certifiés CMEQ avec protection de surtension intégrée.",
          alt: "Maître électricien raccordant un panneau électrique 200A avec équipement de précision",
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
          src: "/media/style-lock-master.jpg",
          eyebrow: "200A Panel Upgrade",
          title: "Engineering precision and Hydro-Québec compliance",
          description: "CMEQ-certified 200A panel upgrades with integrated surge protection and clean conduit lines.",
          alt: "Master electrician wiring a 200A electrical panel with precision tools",
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
    residential: { src: "/media/service-residential.jpg", position: "center" },
    commercial: { src: "/media/service-commercial.jpg", position: "center" },
    industrial: { src: "/media/industrial-panel.webp", position: "center" },
    maintenance: { src: "/media/service-emergency.jpg", position: "center" },
    generators: { src: "/media/service-generators.jpg", position: "center" },
    thermography: { src: "/media/service-thermography.jpg", position: "center" },
    security: { src: "/media/service-security.jpg", position: "center" },
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
  const heroIntro = isFrench
    ? "Des réparations d’urgence aux installations commerciales complètes, nos maîtres électriciens certifiés offrent des solutions de premier ordre avec une tarification transparente sans frais cachés."
    : "From urgent emergency repairs to complete commercial installations, our licensed master electricians deliver top-tier solutions with upfront pricing and zero hidden fees.";

  const trustBadgeIcon = (index: number) => {
    if (index === 0) return <ShieldCheck aria-hidden="true" />;
    if (index === 1) return <BadgeCheck aria-hidden="true" />;
    return <MapPin aria-hidden="true" />;
  };

  return (
    <div className="home-page">
      <ScrollProgress />
      <FullPageScroll />
      <div className="home-snap-section home-snap-hero">
        <CinematicHero
          actions={<ActionPair locale={locale} dark />}
          background={<HeroVideo />}
          bottomBar={
            <>
              <div className="bottom-bar-left">
                <span className="bottom-bar-icon" aria-hidden="true">⚡</span>
                <span>
                  {isFrench ? (
                    <>
                      SERVICES ÉLECTRIQUES <span className="accent-yellow">RÉSIDENTIELS &amp; COMMERCIAUX</span>
                    </>
                  ) : (
                    <>
                      ELECTRICAL SERVICES <span className="accent-yellow">RESIDENTIAL &amp; COMMERCIAL</span>
                    </>
                  )}
                </span>
              </div>

              <div className="bottom-badge-divider" aria-hidden="true" />

              <div
                aria-label={isFrench ? "Repères de confiance" : "Trust markers"}
                className="hero-trust-badges bottom-bar-badges"
              >
                <div className="hero-trust-badge bottom-badge-item">
                  <span className="hero-trust-badge-icon">
                    <ShieldCheck aria-hidden="true" />
                  </span>
                  <span className="bottom-badge-content">
                    <strong className="bottom-badge-label">{copy.home.trustBadges[0].label} :</strong>{" "}
                    <span className="bottom-badge-value">{copy.home.trustBadges[0].value}</span>
                  </span>
                </div>

                <div className="bottom-badge-divider" aria-hidden="true" />

                <div className="hero-trust-badge bottom-badge-item">
                  <span className="hero-trust-badge-icon">
                    <BadgeCheck aria-hidden="true" />
                  </span>
                  <span className="bottom-badge-content">
                    <strong className="bottom-badge-label">{copy.home.trustBadges[1].label} :</strong>{" "}
                    <span className="bottom-badge-value">{copy.home.trustBadges[1].value}</span>
                  </span>
                </div>

                <div className="bottom-badge-divider" aria-hidden="true" />

                <div className="hero-trust-badge bottom-badge-item">
                  <span className="hero-trust-badge-icon">
                    <MapPin aria-hidden="true" />
                  </span>
                  <span className="bottom-badge-content">
                    <strong className="bottom-badge-label">{copy.home.trustBadges[2].label} :</strong>{" "}
                    <span className="bottom-badge-value">{copy.home.trustBadges[2].value}</span>
                  </span>
                </div>
              </div>
            </>
          }
          heading={
            <div className="hero-heading-group">
              <h1 className="hero-display-title">
                {isFrench ? (
                  <>
                    <span className="hero-title-line">VOTRE MAÎTRE</span>
                    <span className="hero-title-line hero-amber-gradient">ÉLECTRICIEN</span>
                    <span className="hero-title-line">DE CONFIANCE</span>
                  </>
                ) : (
                  <>
                    <span className="hero-title-line">YOUR TRUSTED</span>
                    <span className="hero-title-line hero-amber-gradient">MASTER</span>
                    <span className="hero-title-line">ELECTRICIAN</span>
                  </>
                )}
              </h1>
              <div className="lightning-divider" aria-hidden="true">
                <span className="lightning-divider-icon">⚡</span>
              </div>
            </div>
          }
          intro={
            <p className="hero-intro-text">
              {isFrench
                ? "Services de maître électricien certifié pour vos propriétés résidentielles, commerciales et industrielles dans le Grand Montréal. Ligne d'urgence accessible 24/7."
                : "Certified master electrician services for residential, commercial, and industrial properties across Greater Montreal. 24/7 emergency line available."}
            </p>
          }
          media={
            <HeroMediaTransition
              locale={locale}
              intervalMs={4000}
              showIndicators={true}
              items={[
                {
                  src: "/media/eclipse-team-fleet-hero.jpg",
                  alt: isFrench
                    ? "Équipe de maîtres électriciens certifiés Éclipse Électrique et camions de service dans le Grand Montréal"
                    : "Éclipse Électrique certified master electrician team and service fleet in Greater Montreal",
                  label: isFrench ? "01 Flotte" : "01 Fleet",
                  id: "fleet",
                  objectPosition: "46% 75%",
                },
                {
                  src: "/media/service-coverage-map.png",
                  alt: isFrench
                    ? "Carte satellite de couverture du territoire desservi par Éclipse Électrique Inc. avec zone dorée éclairée et zone extérieure sombre"
                    : "Éclipse Électrique service territory coverage map showing golden service zone and dark exterior unserved area",
                  label: isFrench ? "02 Carte" : "02 Coverage Map",
                  id: "map",
                  objectPosition: "center center",
                },
                {
                  src: "/media/about-craft-master.jpg",
                  alt: isFrench
                    ? "Maître électricien Éclipse Électrique à côté du panneau électrique avec tablette numérique et camion de service à l'extérieur"
                    : "Éclipse Électrique master electrician beside electrical panel with digital tablet and service van outside",
                  label: isFrench ? "03 À propos" : "03 About",
                  id: "about",
                  objectPosition: "center 35%",
                },
                {
                  src: "/media/faq-master-consultation.jpg",
                  alt: isFrench
                    ? "Maître électricien Éclipse Électrique expliquant le système électrique et le panneau aux propriétaires"
                    : "Éclipse Électrique master electrician explaining the electrical system and panel to homeowners",
                  label: isFrench ? "04 FAQ" : "04 FAQ",
                  id: "faq",
                  objectPosition: "center 35%",
                },
                {
                  src: "/media/contact-master-dispatch.jpg",
                  alt: isFrench
                    ? "Membre de l'équipe Éclipse Électrique au poste de travail avec casque d'écoute pour le service à la clientèle et la répartition d'urgence"
                    : "Éclipse Électrique team member at computer workstation with headset taking customer calls and dispatching emergency service",
                  label: isFrench ? "05 Contact" : "05 Contact",
                  id: "contact",
                  objectPosition: "center 35%",
                },
              ]}
            />
          }
          signature={
            <div className="banner-signature-block">
              <div>
                <div className="signature-text">Éclipse Électrique Inc.</div>
                <div className="signature-sub">
                  {isFrench
                    ? "RBQ : 5582-0096-01 · MAÎTRE ÉLECTRICIEN CCQ"
                    : "RBQ : 5582-0096-01 · CERTIFIED MASTER ELECTRICIAN CCQ"}
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* 2. Context Selector: "Comment pouvons-nous vous aider ?" */}
      <ScrollReveal className="home-flow-block">
        <HomeContextSelector locale={locale} />
      </ScrollReveal>

      {/* 3. Main Feature: Visual Service Navigator ("Services populaires" - 6 services, no autoplay) */}
      <ScrollReveal className="home-flow-block">
        <PopularServicesSlider locale={locale} />
      </ScrollReveal>

      {/* 4. Problem-based Navigation: "Que souhaitez-vous faire ?" */}
      <ScrollReveal className="home-flow-block">
        <ProblemIntentGrid locale={locale} />
      </ScrollReveal>

      {/* 5. Visual 3-Step Process: Parlez-nous → Envoyez les détails → Planifiez la suite */}
      <ScrollReveal className="home-flow-block">
        <VisualProcessStepper locale={locale} />
      </ScrollReveal>

      {/* 6. "Pourquoi Éclipse ?" 4 Proof points */}
      <ScrollReveal className="home-flow-block">
        <TrustProofBand locale={locale} />
      </ScrollReveal>

      {/* 7. Technical Expertise Progressive Disclosure Tabs */}
      <ScrollReveal className="home-flow-block">
        <TechnicalExpertiseTabs locale={locale} />
      </ScrollReveal>

      {/* 8. Regional Coverage Hub Map (Montréal, Rive-Nord, Rive-Sud) */}
      <ScrollReveal className="home-flow-block">
        <VisualCoverageHub locale={locale} />
      </ScrollReveal>

      {/* 9. FAQ Teaser: 3 Homeowner Questions */}
      <ScrollReveal className="home-flow-block">
        <HomeFaqTeaser locale={locale} />
      </ScrollReveal>

      {/* 10. Final Conversion Section */}
      <div className="home-snap-section home-snap-cta">
        <ScrollReveal className="home-flow-block home-flow-final">
          <CtaBand locale={locale} />
        </ScrollReveal>
      </div>
    </div>
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
          <VisualServicesGrid locale={locale} />
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
  const isFrench = locale === "fr";
  const regionImages = [
    "/media/area-montreal.jpg",
    "/media/area-north-shore.jpg",
    "/media/area-south-shore.jpg",
  ];
  return (
    <>
      <InnerHero locale={locale} pageId="serviceArea" />
      <section className="section-pad">
        <div className="site-container">
          {/* Featured Territory Radar Showcase Card */}
          <div className="service-area-radar-card mb-12 rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block font-bold">
                  {isFrench ? "CARTE OFFICIELLE DU TERRITOIRE" : "OFFICIAL DISPATCH COVERAGE"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {isFrench
                    ? "Déploiement Rapide dans Tout le Grand Montréal."
                    : "Rapid Master Electrician Dispatch Across Greater Montreal."}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {isFrench
                    ? "Notre siège social et centre technique de Saint-Léonard (9005 Rue du Champ-d'Eau) coordonne les unités d'intervention sur l'Île de Montréal, Laval, Longueuil, Brossard et les couronnes périphériques."
                    : "Headquartered in Saint-Léonard (9005 Rue du Champ-d'Eau), our technical dispatch hub coordinates fleet vans throughout Montreal, Laval, Longueuil, Brossard, and surrounding shores."}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg text-slate-200 border border-white/10">⚡ Siège Saint-Léonard</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg text-slate-200 border border-white/10">📍 50+ Villes desservies</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg text-slate-200 border border-white/10">🚨 24/7 Urgence</span>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="coverage-map-frame rounded-xl overflow-hidden border border-amber-500/30 shadow-inner relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/media/service-coverage-map.png"
                    alt={isFrench ? "Carte radar du territoire couvert par Éclipse Électrique" : "Éclipse Électrique service territory radar map"}
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    width="960"
                    height="640"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="region-list">
          {copy.regions.map((region, index) => (
            <article key={region.name}>
              <div className="region-card-media" style={{ marginBottom: "1.5rem", borderRadius: "0.5rem", overflow: "hidden", height: "220px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={region.name}
                  decoding="async"
                  height="440"
                  loading="lazy"
                  src={regionImages[index % regionImages.length]}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width="800"
                />
              </div>
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
      <InnerHero locale={locale} citySlug={citySlug} />

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
