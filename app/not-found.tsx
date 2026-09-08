import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="not-found-page" id="contenu">
      <div className="not-found-card">
        <BrandMark inverse />
        <p className="eyebrow eyebrow-amber">Erreur 404 · Error 404</p>
        <h1>Cette page n’existe pas.<br /><span>This page does not exist.</span></h1>
        <p>Le lien est peut-être incomplet ou la page a été déplacée.<br />The link may be incomplete or the page may have moved.</p>
        <div className="not-found-actions">
          <Button asChild size="lg" className="primary-action">
            <Link href="/fr"><ArrowLeft aria-hidden="true" />Retour à l’accueil</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="secondary-action-dark">
            <Link href="/en">English home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
