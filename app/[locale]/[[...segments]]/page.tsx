import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRenderer } from "@/components/page-renderer";
import { SchemaOrg } from "@/components/schema-org";
import { content } from "@/content/site-content";
import { cityBySlug, cityPath } from "@/lib/city-routes";
import {
  pathFor,
  resolvePage,
} from "@/lib/routes";
import { site } from "@/lib/site";

interface LocalizedPageProps {
  params: Promise<{ locale: string; segments?: string[] }>;
}

function absolute(pathname: string) {
  return new URL(pathname, site.origin).toString();
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale: localeValue, segments = [] } = await params;
  const resolved = resolvePage(localeValue, segments);
  if (!resolved) return {};

  const { locale, pageId, citySlug } = resolved;
  const page = content[locale].pages[pageId];
  const city = citySlug ? cityBySlug(citySlug) : undefined;
  if (citySlug && !city) return {};

  const cityName = city?.[locale];
  const title = city
    ? locale === "fr"
      ? "Électricien à " + cityName + " | Éclipse électrique"
      : "Electrician in " + cityName + " | Éclipse électrique"
    : page.seo.title;
  const description = city
    ? locale === "fr"
      ? "Services électriques résidentiels, commerciaux et industriels publiés pour " + cityName + ". Confirmez l'adresse et la portée des travaux avec Éclipse électrique inc."
      : "Published residential, commercial and industrial electrical services for " + cityName + ". Confirm the address and scope of work with Éclipse électrique inc."
    : page.seo.description;
  const frenchUrl = absolute(citySlug ? cityPath("fr", citySlug) : pathFor(pageId, "fr"));
  const englishUrl = absolute(citySlug ? cityPath("en", citySlug) : pathFor(pageId, "en"));
  const canonical = locale === "fr" ? frenchUrl : englishUrl;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        "fr-CA": frenchUrl,
        "en-CA": englishUrl,
        "x-default": frenchUrl,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.legalName,
      title,
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale: localeValue, segments = [] } = await params;
  const resolved = resolvePage(localeValue, segments);

  if (!resolved) notFound();

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(resolved.locale === "fr" ? "fr-CA" : "en-CA")}` }} />
      <SchemaOrg locale={resolved.locale} />
      <PageRenderer locale={resolved.locale} pageId={resolved.pageId} citySlug={resolved.citySlug} />
    </>
  );
}
