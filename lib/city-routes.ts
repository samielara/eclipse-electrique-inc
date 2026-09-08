import type { Locale } from "@/lib/routes";

export type CityRegion = "montreal" | "northShore" | "southShore";

export interface CityRoute {
  slug: string;
  region: CityRegion;
  fr: string;
  en: string;
}

/**
 * Published coverage, expressed as stable slugs for localized landing pages.
 * The copy intentionally mirrors the company's public coverage list; these
 * pages describe the published territory and ask visitors to confirm scope.
 */
export const cityRoutes: readonly CityRoute[] = [
  { slug: "ahuntsic", region: "montreal", fr: "Ahuntsic", en: "Ahuntsic" },
  { slug: "anjou", region: "montreal", fr: "Anjou", en: "Anjou" },
  { slug: "dorval", region: "montreal", fr: "Dorval", en: "Dorval" },
  { slug: "hochelaga", region: "montreal", fr: "Hochelaga", en: "Hochelaga" },
  { slug: "lachine", region: "montreal", fr: "Lachine", en: "Lachine" },
  { slug: "lasalle", region: "montreal", fr: "LaSalle", en: "LaSalle" },
  { slug: "montreal", region: "montreal", fr: "Montréal", en: "Montréal" },
  { slug: "mont-royal", region: "montreal", fr: "Mont-Royal", en: "Mount Royal" },
  { slug: "pointe-aux-trembles", region: "montreal", fr: "Pointe-aux-Trembles", en: "Pointe-aux-Trembles" },
  { slug: "pointe-claire", region: "montreal", fr: "Pointe-Claire", en: "Pointe-Claire" },
  { slug: "rosemont", region: "montreal", fr: "Rosemont", en: "Rosemont" },
  { slug: "saint-leonard", region: "montreal", fr: "Saint-Léonard", en: "Saint-Léonard" },
  { slug: "verdun", region: "montreal", fr: "Verdun", en: "Verdun" },
  { slug: "villeray", region: "montreal", fr: "Villeray", en: "Villeray" },
  { slug: "westmount", region: "montreal", fr: "Westmount", en: "Westmount" },

  { slug: "blainville", region: "northShore", fr: "Blainville", en: "Blainville" },
  { slug: "boisbriand", region: "northShore", fr: "Boisbriand", en: "Boisbriand" },
  { slug: "deux-montagnes", region: "northShore", fr: "Deux-Montagnes", en: "Deux-Montagnes" },
  { slug: "mirabel", region: "northShore", fr: "Mirabel", en: "Mirabel" },
  { slug: "prevost", region: "northShore", fr: "Prévost", en: "Prévost" },
  { slug: "sainte-adele", region: "northShore", fr: "Sainte-Adèle", en: "Sainte-Adèle" },
  { slug: "sainte-therese", region: "northShore", fr: "Sainte-Thérèse", en: "Sainte-Thérèse" },
  { slug: "saint-eustache", region: "northShore", fr: "Saint-Eustache", en: "Saint-Eustache" },
  { slug: "saint-hippolyte", region: "northShore", fr: "Saint-Hippolyte", en: "Saint-Hippolyte" },
  { slug: "saint-jerome", region: "northShore", fr: "Saint-Jérôme", en: "Saint-Jérôme" },
  { slug: "saint-sauveur", region: "northShore", fr: "Saint-Sauveur", en: "Saint-Sauveur" },

  { slug: "beloeil", region: "southShore", fr: "Belœil", en: "Belœil" },
  { slug: "boucherville", region: "southShore", fr: "Boucherville", en: "Boucherville" },
  { slug: "brossard", region: "southShore", fr: "Brossard", en: "Brossard" },
  { slug: "candiac", region: "southShore", fr: "Candiac", en: "Candiac" },
  { slug: "carignan", region: "southShore", fr: "Carignan", en: "Carignan" },
  { slug: "chambly", region: "southShore", fr: "Chambly", en: "Chambly" },
  { slug: "chateauguay", region: "southShore", fr: "Châteauguay", en: "Châteauguay" },
  { slug: "delson", region: "southShore", fr: "Delson", en: "Delson" },
  { slug: "la-prairie", region: "southShore", fr: "La Prairie", en: "La Prairie" },
  { slug: "longueuil", region: "southShore", fr: "Longueuil", en: "Longueuil" },
  { slug: "saint-hubert-vieux-longueuil", region: "southShore", fr: "Saint-Hubert et Vieux-Longueuil", en: "Saint-Hubert and Old Longueuil" },
  { slug: "mcmasterville", region: "southShore", fr: "McMasterville", en: "McMasterville" },
  { slug: "mont-saint-hilaire", region: "southShore", fr: "Mont-Saint-Hilaire", en: "Mont-Saint-Hilaire" },
  { slug: "otterburn-park", region: "southShore", fr: "Otterburn Park", en: "Otterburn Park" },
  { slug: "saint-basile-le-grand", region: "southShore", fr: "Saint-Basile-le-Grand", en: "Saint-Basile-le-Grand" },
  { slug: "saint-bruno-de-montarville", region: "southShore", fr: "Saint-Bruno-de-Montarville", en: "Saint-Bruno-de-Montarville" },
  { slug: "saint-constant", region: "southShore", fr: "Saint-Constant", en: "Saint-Constant" },
  { slug: "sainte-catherine", region: "southShore", fr: "Sainte-Catherine", en: "Sainte-Catherine" },
  { slug: "sainte-julie", region: "southShore", fr: "Sainte-Julie", en: "Sainte-Julie" },
  { slug: "saint-isidore", region: "southShore", fr: "Saint-Isidore", en: "Saint-Isidore" },
  { slug: "saint-jean-sur-richelieu", region: "southShore", fr: "Saint-Jean-sur-Richelieu", en: "Saint-Jean-sur-Richelieu" },
  { slug: "saint-lambert", region: "southShore", fr: "Saint-Lambert", en: "Saint-Lambert" },
  { slug: "saint-philippe", region: "southShore", fr: "Saint-Philippe", en: "Saint-Philippe" },
  { slug: "varennes", region: "southShore", fr: "Varennes", en: "Varennes" },
] as const;

export const citySlugs = cityRoutes.map((city) => city.slug);

export function cityBySlug(slug: string): CityRoute | undefined {
  return cityRoutes.find((city) => city.slug === slug);
}

export function cityPath(locale: Locale, slug: string): string {
  return locale === "fr"
    ? `/fr/territoire-desservi/${slug}`
    : `/en/service-area/${slug}`;
}

export function alternateCityPath(locale: Locale, slug: string): string {
  return cityPath(locale === "fr" ? "en" : "fr", slug);
}
