import type { Locale } from "@/lib/routes";
import { Marquee } from "@/components/magicui/marquee";

export function AccreditationRibbon({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";

  const badges = [
    { code: "CMEQ", title: isFrench ? "Maître Électricien" : "Master Electrician" },
    { code: "RBQ LICENCE", title: "#5582-0096-01" },
    { code: "CCQ CERTIFIÉ", title: isFrench ? "Compagnons Certifiés" : "Certified Journeymen" },
    { code: "GENERAC", title: isFrench ? "Détaillant Autorisé" : "Authorized Dealer" },
    { code: "HYDRO-QUÉBEC", title: isFrench ? "Normes du Code" : "Code Standards" },
    { code: "APCHQ", title: isFrench ? "Membre En Règle" : "Verified Member" },
  ];

  return (
    <section
      className="accreditation-marquee-ribbon"
      aria-label={isFrench ? "Accréditations et certifications officielles" : "Official accreditations and certifications"}
    >
      <div className="site-container">
        <Marquee pauseOnHover className="accreditation-ribbon-inner py-1 [--gap:2.5rem]">
          {badges.map((b) => (
            <div className="accreditation-item" key={b.code}>
              <span className="accreditation-badge-code">{b.code}</span>
              <span className="accreditation-badge-title">{b.title}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
