import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ClipboardCheck, MapPin, Phone, ShieldCheck } from "lucide-react";
import { residentialServices, residentialServicePath } from "@/content/residential-services";
import { commercialServices, commercialServicePath } from "@/content/commercial-services";
import { pathFor, quotePath, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function ResidentialServicePage({locale,serviceId,category="residential"}:{locale:Locale;serviceId:string;category?:"residential"|"commercial"}) {
  const business=category==="commercial";
  const items=business?commercialServices:residentialServices;
  const servicePath=business?commercialServicePath:residentialServicePath;
  const item=items.find(s=>s.id===serviceId)!;
  const fr=locale==="fr";
  const categoryLabel = business
    ? (fr ? "Commercial & industriel" : "Commercial & Industrial")
    : (fr ? "Résidentiel" : "Residential");

  return (
    <section className="residential-detail">
      <div className="site-container">
        <nav className="residential-breadcrumb" aria-label={fr ? "Fil d’Ariane" : "Breadcrumb"}>
          <ol>
            <li><Link href={pathFor("home", locale)}>{fr ? "Accueil" : "Home"}</Link></li>
            <li aria-hidden="true"><ChevronRight /></li>
            <li><Link href={pathFor(category, locale)}>{categoryLabel}</Link></li>
            <li aria-hidden="true"><ChevronRight /></li>
            <li><span aria-current="page">{item.label[locale]}</span></li>
          </ol>
        </nav>

        <div className="residential-detail-hero">
          <div className="residential-detail-copy">
            <p className="eyebrow">{business ? categoryLabel : (fr ? "Services résidentiels" : "Residential services")}</p>
            <h1 className={item.title[locale].length > 60 ? "is-long-title" : undefined}>{item.title[locale]}</h1>
            <p className="residential-detail-lead">{item.description[locale]}</p>
            <div className="residential-detail-actions">
              <Link className="cta-button" href={quotePath(locale, business ? { commercialServiceId: serviceId } : { residentialServiceId: serviceId })}>
                {fr ? "Demander un service" : "Request service"}<ArrowRight aria-hidden="true" />
              </Link>
              <a className="residential-office-link" href={site.officePhoneHref} aria-label={`${fr ? "Appeler le bureau" : "Call the office"}: ${site.officePhoneDisplay}`}>
                <Phone aria-hidden="true" /><span>{site.officePhoneDisplay}</span>
              </a>
            </div>
          </div>
          <figure className="residential-detail-media">
            <img src={item.image} alt={item.title[locale]} width="1536" height="1024" fetchPriority="high" />
          </figure>
        </div>

        <div className="residential-detail-trust" aria-label={fr ? "Licence et territoire" : "License and service territory"}>
          <span><ShieldCheck aria-hidden="true" />RBQ {site.rbq}</span>
          <span><MapPin aria-hidden="true" />{fr ? "Grand Montréal, Rive-Nord et Rive-Sud" : "Greater Montréal, North Shore & South Shore"}</span>
        </div>

        <section className="residential-detail-information" aria-labelledby="service-scope-title">
          <div className="residential-detail-scope">
            <h2 id="service-scope-title">{fr ? "Ce que comprend ce service" : "What this service covers"}</h2>
            <ul>{item.highlights[locale].map(highlight => (
              <li key={highlight}><Check aria-hidden="true" /><span>{highlight}</span></li>
            ))}</ul>
          </div>
          <aside className="residential-detail-planning" aria-labelledby="service-planning-title">
            <ClipboardCheck aria-hidden="true" />
            <h3 id="service-planning-title">{fr ? "Pour préparer votre demande" : "Plan your request"}</h3>
            <p>{fr
              ? "Indiquez l’adresse, l’état de l’installation et les travaux souhaités. L’équipe pourra préciser la portée, l’accès nécessaire et les prochaines étapes avant de planifier l’intervention."
              : "Share the address, the condition of the installation and the work you have in mind. The team can discuss scope, access and next steps before scheduling the work."}</p>
          </aside>
        </section>


      </div>
    </section>
  );
}
