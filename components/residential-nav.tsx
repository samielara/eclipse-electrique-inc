"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { House, Building2, Factory, Leaf, ChevronDown, ChevronRight, Hammer, Cable, Lightbulb, Thermometer, SlidersHorizontal, Network, ShieldCheck, Waves, BatteryCharging, Wrench, ClipboardCheck } from "lucide-react";
import { getOrderedResidentialServices, residentialServicePath, type ResidentialSeason } from "@/content/residential-services";
import { pathFor, type Locale } from "@/lib/routes";
import { commercialServices, commercialServicePath } from "@/content/commercial-services";

const residentialIcons: Record<string, typeof House> = {
  "new-construction": Hammer,
  renovations: Wrench,
  "service-entrances": Cable,
  lighting: Lightbulb,
  heating: Thermometer,
  "smart-home": SlidersHorizontal,
  cabling: Network,
  security: ShieldCheck,
  outdoor: Waves,
  generators: BatteryCharging,
  troubleshooting: Wrench,
  inspections: ClipboardCheck,
  "panels-distribution": Cable,
  "lighting-controls": Lightbulb,
  "energy-efficiency": Leaf,
  "structured-cabling": Network,
  "security-fire-access": ShieldCheck,
  "machinery-connections": Factory,
  "ups-generators": BatteryCharging,
  "diagnostics-maintenance": Wrench,
};

export function ResidentialNav({locale,season,mobile=false,currentId,onNavigate,category="residential"}:{locale:Locale;season:ResidentialSeason;mobile?:boolean;currentId?:string;onNavigate:()=>void;category?:"residential"|"commercial"}) {
  const [open,setOpen]=useState(false);
  const [left,setLeft]=useState(false);
  const toggle=useRef<HTMLButtonElement>(null);
  const fr=locale==="fr";
  const business=category==="commercial";
  const CategoryIcon=business?Building2:House;
  const label=business?(fr?"Commercial & industriel":"Commercial & Industrial"):(fr?"Résidentiel":"Residential");
  const items=business?commercialServices:getOrderedResidentialServices(season);
  const servicePath=business?commercialServicePath:residentialServicePath;
  const flyoutId=category+"-flyout";
  const links=<>
    {items.map(s=>{
      const Icon=residentialIcons[s.id] ?? House;
      return <Link key={s.id} href={servicePath(locale,s.id)} onClick={onNavigate} aria-current={currentId===s.id?"page":undefined}><Icon className="residential-service-icon" aria-hidden="true"/><span className="residential-service-label">{s.label[locale]}</span><ChevronRight className="residential-service-chevron" aria-hidden="true"/></Link>;
    })}
  </>;
  if(mobile) return <details className={`mobile-service-group mobile-${category}-group`}><summary><CategoryIcon aria-hidden="true"/><span>{label}</span><ChevronDown aria-hidden="true"/></summary><div className="mobile-residential-links">{links}</div></details>;
  return <div className="residential-nav-group" onMouseEnter={e=>{setLeft(e.currentTarget.getBoundingClientRect().right+330>window.innerWidth);setOpen(true);}} onMouseLeave={()=>setOpen(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}} onKeyDown={e=>{if(e.key==="Escape" && open){e.preventDefault();e.stopPropagation();setOpen(false);toggle.current?.focus();}}}>
    <div className={`residential-nav-row ${category}-category-row`}>
      <Link className="dropdown-option" href={pathFor(category,locale)} onClick={onNavigate} onFocus={()=>{setLeft((toggle.current?.getBoundingClientRect().right??0)+330>window.innerWidth);setOpen(true);}}><span className="dropdown-option-icon"><CategoryIcon aria-hidden="true"/></span><span className="dropdown-option-body"><span className="dropdown-option-heading">{label}</span><small>{business?(fr?"Construction, réaménagement & entrées":"Construction, remodeling & service entrances"):(fr?"Panneaux, filage & réno":"Panels, wiring & renovations")}</small></span></Link>
      <button ref={toggle} type="button" aria-label={business?(fr?"Afficher les services commerciaux et industriels":"Show commercial and industrial services"):(fr?"Afficher les services résidentiels":"Show residential services")} aria-expanded={open} aria-controls={flyoutId} onClick={()=>setOpen(v=>!v)}><ChevronRight aria-hidden="true"/></button>
    </div>
    <div id={flyoutId} className={`residential-flyout ${left?"opens-left":""}`} hidden={!open}>{links}</div>
  </div>;
}
