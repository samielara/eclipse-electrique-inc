import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { PageRenderer } from "@/components/page-renderer";
import { DocumentLanguage } from "@/components/document-language";
import { SchemaOrg } from "@/components/schema-org";
import { content } from "@/content/site-content";
import { residentialServices, residentialServicePath } from "@/content/residential-services";
import { commercialServices, commercialServicePath } from "@/content/commercial-services";
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

  const { locale, pageId, citySlug, residentialServiceId, commercialServiceId } = resolved;
  const residential = commercialServiceId ? commercialServices.find(s=>s.id===commercialServiceId) : residentialServices.find(s=>s.id===residentialServiceId);
  const detailPath = commercialServiceId ? commercialServicePath : residentialServicePath;
  const page = content[locale].pages[pageId==="industrial"?"commercial":pageId];
  const city = citySlug ? cityBySlug(citySlug) : undefined;
  if (citySlug && !city) return {};

  const cityName = city?.[locale];
  const title = city
    ? locale === "fr"
      ? "Électricien à " + cityName + " | Éclipse électrique"
      : "Electrician in " + cityName + " | Éclipse électrique"
    : residential ? residential.title[locale]+" | Éclipse électrique" : page.seo.title;
  const description = city
    ? locale === "fr"
      ? "Services électriques résidentiels, commerciaux et industriels publiés pour " + cityName + ". Confirmez l'adresse et la portée des travaux avec Éclipse électrique inc."
      : "Published residential, commercial and industrial electrical services for " + cityName + ". Confirm the address and scope of work with Éclipse électrique inc."
    : residential ? residential.description[locale] : page.seo.description;
  const frenchUrl = absolute(residential ? detailPath("fr",residential.id) : citySlug ? cityPath("fr", citySlug) : pathFor(pageId, "fr"));
  const englishUrl = absolute(residential ? detailPath("en",residential.id) : citySlug ? cityPath("en", citySlug) : pathFor(pageId, "en"));
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
  if(resolved.retiredService) permanentRedirect(pathFor("services",resolved.locale));
  if(resolved.pageId==="industrial") permanentRedirect(pathFor("commercial",resolved.locale));

  return (
    <>
      <DocumentLanguage locale={resolved.locale} />
      <SchemaOrg locale={resolved.locale} />
      <PageRenderer locale={resolved.locale} pageId={resolved.pageId} citySlug={resolved.citySlug} residentialServiceId={resolved.residentialServiceId} commercialServiceId={resolved.commercialServiceId} />
    </>
  );
}
