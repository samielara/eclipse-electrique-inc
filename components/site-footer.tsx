import { residentialServicePath } from "@/content/residential-services";
import { commercialServicePath } from "@/content/commercial-services";
import { Mail, Phone, PhoneCall, MapPin, Clock } from "lucide-react";
import { Instagram, Facebook, Linkedin, Youtube } from "@/components/social-icons";

import { BrandMark } from "@/components/brand-mark";
import { content } from "@/content/site-content";
import { pathFor, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const isFrench = locale === "fr";
  const socialProfiles = [
    { name: "Instagram", Icon: Instagram, url: site.socialLinks.instagram },
    { name: "Facebook", Icon: Facebook, url: site.socialLinks.facebook },
    { name: "LinkedIn", Icon: Linkedin, url: site.socialLinks.linkedin },
    { name: "YouTube", Icon: Youtube, url: site.socialLinks.youtube },
  ];
  const officeAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const requestedServices = [
    { href: pathFor("maintenance",locale), en: "Electrical troubleshooting", fr: "Dépannage électrique" },
    { href: residentialServicePath(locale,"service-entrances"), en: "Panels & service upgrades", fr: "Panneaux & entrées électriques" },
    { href: residentialServicePath(locale,"heating"), en: "Heating & heated floors", fr: "Chauffage & planchers chauffants" },
    { href: residentialServicePath(locale,"lighting"), en: "Indoor & outdoor lighting", fr: "Éclairage intérieur & extérieur" },
    { href: residentialServicePath(locale,"new-construction"), en: "Construction & renovations", fr: "Construction & rénovations" },
    { href: pathFor("generators",locale), en: "Generator installation", fr: "Installation de génératrices" },
    { href: residentialServicePath(locale,"inspections"), en: "Electrical inspections", fr: "Inspections électriques" },
    { href: residentialServicePath(locale,"outdoor"), en: "Pool & spa connections", fr: "Raccordements piscines & spas" },
    { href: residentialServicePath(locale,"smart-home"), en: "Smart-home controls", fr: "Domotique & commandes" },
    { href: commercialServicePath(locale,"renovations"), en: "Commercial renovations", fr: "Rénovations commerciales" },
  ];
  const navigation = [
    {id:"services",label:copy.nav.services},{id:"serviceArea",label:copy.nav.serviceArea},
    {id:"generators",label:isFrench?"Alimentation de secours":"Backup power"},
    {id:"solar",label:isFrench?"Énergie solaire":"Solar energy"},
    {id:"security",label:isFrench?"Alarmes & sécurité":"Fire & security"},
    {id:"about",label:copy.nav.about},{id:"faq",label:copy.nav.faq},{id:"privacy",label:copy.footer.privacy},
  ] as const;
  return <footer className="site-footer">
    <div className="site-container footer-grid">
      <div className="footer-intro">
        <a href={pathFor("home",locale)} aria-label={site.legalName}><BrandMark inverse/></a>
        <div className="footer-social-icons" aria-label={isFrench?"Réseaux sociaux":"Social media"}>
          {socialProfiles.map(({name,Icon,url})=>url?<a key={name} href={url} aria-label={name} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true"/></a>:<span key={name} className="is-pending" role="img" aria-label={name+" — "+(isFrench?"lien à confirmer":"link pending confirmation")} title={name+" — "+(isFrench?"lien à confirmer":"link pending confirmation")}><Icon aria-hidden="true"/></span>)}
        </div>
        <p>{copy.footer.summary}</p><p className="credential-line">RBQ {site.rbq} <span aria-hidden="true">•</span> NEQ {site.neq}</p>
      </div>
      <div><h2>{isFrench?"Services les plus demandés":"Most requested services"}</h2><ul>{requestedServices.map(service=><li key={service.href}><a className="footer-service-link" href={service.href}>{service[locale]}</a></li>)}</ul></div>
      <div><h2>{copy.footer.navigation}</h2><ul>{navigation.map(item=><li key={item.id}><a href={pathFor(item.id,locale)}>{item.label}</a></li>)}</ul></div>
      <div className="footer-contact">
        <h2>{copy.footer.contact}</h2>
        <address className="footer-office-address"><a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(officeAddress)} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true"/><span>{isFrench?"Adresse du bureau":"Office address"}<strong>{site.address.street}<br/>{site.address.city}, {site.address.region} {site.address.postalCode}</strong></span></a></address>
        <div style={{display:"flex",alignItems:"flex-start",gap:"12px",marginBottom:"14px"}}><Clock aria-hidden="true" style={{flexShrink:0,marginTop:"3px"}}/><span>{isFrench?"Heures d’ouverture :":"Opening hours:"}<strong>{site.officeHoursDisplay[locale]}</strong></span></div>
        <a href={site.officePhoneHref}><Phone aria-hidden="true"/><span>{copy.actions.office}<strong>{site.officePhoneDisplay}</strong></span></a>
        <a href={site.emergencyPhoneHref}><PhoneCall aria-hidden="true"/><span>{copy.actions.emergency}<strong>{site.emergencyPhoneDisplay}</strong></span></a>
        <a href={site.emailHref}><Mail aria-hidden="true"/><span>{copy.actions.email}<strong>{site.email}</strong></span></a>
      </div>
    </div>
    <div className="site-container footer-bottom"><p>© {new Date().getFullYear()} {site.legalName} {copy.footer.rights}</p><p>{isFrench?"Français (Canada)":"English (Canada)"}</p></div>
  </footer>;
}
