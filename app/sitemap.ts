import type { MetadataRoute } from "next";

import { allLocalizedPaths } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allLocalizedPaths().map((pathname) => ({
    url: new URL(pathname, site.origin).toString(),
    changeFrequency: "monthly",
    priority: pathname === "/fr" || pathname === "/en" ? 1 : 0.7,
  }));
}
