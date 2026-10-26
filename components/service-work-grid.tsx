import { BatteryCharging, Cable, Sun, Unplug, Wrench, Camera, ClipboardCheck, DoorOpen, Flame, ShieldCheck } from "lucide-react";
import { ServiceTile } from "@/components/service-tile";
import tileStyles from "./service-tile.module.css";
import { quotePath } from "@/lib/routes";
import type { Locale } from "@/lib/routes";
import type { ServiceWorkExplorerData } from "@/content/service-work-explorer";
import styles from "./about-services.module.css";

const icons = { "intrusion-alarms": ShieldCheck, "fire-detection": Flame, surveillance: Camera, "access-intercom": DoorOpen, "electrical-review": ClipboardCheck };

export function ServiceWorkGrid({ locale, data }: { locale: Locale; data: ServiceWorkExplorerData }) {
  return <section className={`section-pad services-section ${styles.section}`}>
    <div className="site-container">
      <header className="section-heading">
        <p className="eyebrow">{data.eyebrow[locale]}</p>
        <h2>{data.heading[locale]}</h2>
        <p className="section-intro">{data.lead[locale]}</p>
      </header>
      <div className={tileStyles.grid}>
        {data.items.map(item => {
          const Icon = icons[item.id as keyof typeof icons] || (data.serviceId === "generators" ? (item.id === "transfer-switch" ? Cable : item.id === "maintenance-testing" ? Wrench : Unplug) : data.serviceId === "solar" ? (item.id === "solar-storage" ? BatteryCharging : Sun) : Wrench);
          return <ServiceTile key={item.id} icon={<Icon/>} image={item.image} label={item.label[locale]} title={item.title[locale]} description={item.description[locale]} highlights={item.highlights[locale]} href={quotePath(locale,{pageId:data.serviceId})} action={locale === "fr" ? "Demander ce service" : "Request this service"}/>;
        })}
      </div>
    </div>
  </section>;
}
