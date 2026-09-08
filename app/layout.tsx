import type { Metadata } from "next";
import { site } from "@/lib/site";
import "./globals.css";

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
    <html lang="fr-CA" data-theme="dark" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("eclipse-theme")==="light"){document.documentElement.dataset.theme="light"}}catch(e){}',
          }}
        />
        {children}
      </body>
    </html>
  );
}
