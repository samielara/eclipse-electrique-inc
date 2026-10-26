"use client";
import { usePathname } from "next/navigation";
import { quotePath, resolvePage, type Locale } from "@/lib/routes";
import type { AnchorHTMLAttributes } from "react";

export function ContextQuoteLink({ locale, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const segments = pathname.split("/").filter(Boolean);
  const context = resolvePage(segments[0], segments.slice(1));
  return <a {...props} href={quotePath(locale, context || undefined)} />;
}
