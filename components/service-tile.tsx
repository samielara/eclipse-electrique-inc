import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./service-tile.module.css";

export function ServiceTile({title, label, description, image, icon, highlights = [], href, action, className = "", serviceId, children}: {
  title: string; label: string; description: string; image?: string; icon: ReactNode;
  highlights?: readonly string[]; href?: string; action?: string; children?: ReactNode; className?: string; serviceId?: string;
}) {
  const Media = href ? "a" : "div";
  return <article className={`${styles.card} ${className}`} data-service-id={serviceId} data-testid="service-card">
    <span className={styles.crest} aria-hidden="true">{icon}</span>
    <div className={styles.shell}>
      <Media className={styles.media} href={href} aria-label={href ? title : undefined}>
        {image ? <img src={image} alt={title} width="1280" height="800" loading="lazy" decoding="async"/> : <span className={styles.illustration} aria-hidden="true">{icon}</span>}
      </Media>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <h3 data-testid="service-card-title">{title}</h3>
        <p className={styles.description}>{description}</p>
        {highlights.length > 0 && <ul>{highlights.map(text => <li key={text}><span aria-hidden="true"/><span>{text}</span></li>)}</ul>}
        {children}
        {href && action && <a className={styles.action} href={href} data-testid="service-card-link">{action}<ArrowUpRight aria-hidden="true"/></a>}
      </div>
    </div>
  </article>;
}
