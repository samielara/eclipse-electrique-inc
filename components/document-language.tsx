"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/routes";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
  }, [locale]);

  return null;
}
