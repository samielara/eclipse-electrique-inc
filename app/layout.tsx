import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./fonts.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/provider";

// Browser chrome and native controls stay dark to match the site.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Éclipse électrique inc. | Électricien à Montréal",
    template: "%s | Éclipse électrique",
  },
  description:
    "Services électriques résidentiels, commerciaux et industriels dans le Grand Montréal, sur la Rive-Nord et la Rive-Sud.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-CA" data-theme="dark">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
