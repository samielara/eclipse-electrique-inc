import { ServiceTile } from "@/components/service-tile";
import tileStyles from "./service-tile.module.css";
import { House, Building2, Thermometer, Lightbulb, ShieldCheck, Wrench, Cable, BatteryCharging } from "lucide-react";
import { getOrderedResidentialServices, getResidentialSeason, residentialServicePath, type ResidentialSeason } from "@/content/residential-services";
import type { Locale } from "@/lib/routes";
import { commercialServices, commercialServicePath } from "@/content/commercial-services";

export function ResidentialServicesGrid({locale,season=getResidentialSeason(),category="residential"}:{locale:Locale;season?:ResidentialSeason;category?:"residential"|"commercial"}) {
  const fr=locale==="fr";
  const business=category==="commercial";
  const items=business?commercialServices:getOrderedResidentialServices(season);
  const servicePath=business?commercialServicePath:residentialServicePath;
  return <section className="section-pad residential-overview-services">
    <div className="site-container">
      <header className="residential-overview-heading">
        <p className="eyebrow">{business?(fr?"Commercial & industriel":"Commercial & Industrial"):(fr?"Nos services résidentiels":"Our residential services")}</p>
        <h2>{business?(fr?"Des services pour votre établissement":"Services for your business and facility"):(fr?"Trouvez le service pour votre maison":"Find the right service for your home")}</h2>
        <p>{fr?"Découvrez les travaux offerts et consultez chaque service pour en savoir plus.":"Browse the available work and explore each service for more details."}</p>
      </header>
      <div className={tileStyles.grid}>
        {items.map(item => {
          const Icon = item.id === "heating" ? Thermometer : item.id.includes("lighting") ? Lightbulb : item.id.includes("security") ? ShieldCheck : item.id.includes("cabling") ? Cable : item.id.includes("generator") ? BatteryCharging : item.id === "troubleshooting" || item.id === "inspections" ? Wrench : business ? Building2 : House;
          return <ServiceTile key={item.id} serviceId={item.id} icon={<Icon/>} image={item.image} label={item.label[locale]} title={item.title[locale]} description={item.description[locale]} highlights={item.highlights[locale]} href={servicePath(locale,item.id)} action={fr?"Découvrir ce service":"Explore this service"}/>;
        })}
      </div>
    </div>
  </section>;
}
