"use client";
import { getQuoteWorkOptions } from "@/lib/quote-context";
import { ArrowRight, Check, Paperclip, PhoneCall, TriangleAlert, Upload, } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, } from "react";
import { readQuotePrefill } from "@/lib/assistant/prefill";
import { Button } from "@/components/ui/button";
import { emptyQuoteIntakeValues, getQuoteMunicipalityOptions, getQuoteServiceOptions, getQuoteTimelineOptions, validateQuoteIntakeStep, type QuoteIntakeErrors, type QuoteIntakeValues, type QuoteService, } from "@/lib/quote-intake";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site";
const wizardCopy = {
    fr: {
        eyebrow: "Demande de soumission",
        title: "Parlez-nous de votre projet",
        intro: "Indiquez vos besoins, le lieu et le délai. Envoyez tous les détails en une seule demande.",
        progressLabel: "Progression de la demande",
        status: (step: number) => `Étape ${step} sur 4`,
        stepNames: ["Service", "Délai", "Lieu", "Coordonnées"],
        stepTitles: [
            "Type de service",
            "Délai d’intervention",
            "Municipalité ou arrondissement",
            "Coordonnées et détails du projet",
        ],
        stepIntros: [
            "Sélectionnez la catégorie qui correspond le mieux à votre besoin.",
            "Indiquez la rapidité d’intervention recherchée.",
            "Confirmez où les travaux doivent être réalisés.",
            "Ajoutez les renseignements nécessaires pour envoyer votre demande.",
        ],
        serviceDescriptions: {
            residential: "Panneau, borne VE, éclairage, rénovation ou dépannage résidentiel.",
            commercialIndustrial: "Entrée électrique, équipement triphasé, maintenance ou conformité.",
            solar: "Projet solaire, raccordements électriques et stockage éventuel.",
            security: "Alarme d’intrusion, détection incendie et raccordement électrique.",
            other: "Une demande qui ne correspond pas aux catégories ci-dessus.",
        },
        timelineDescriptions: {
            emergency: "Danger immédiat, panne active ou situation nécessitant un appel direct.",
            soon: "Intervention souhaitée rapidement, sans urgence électrique active.",
            planned: "Travaux futurs, planification budgétaire ou estimation détaillée.",
        },
        emergencyTitle: "Urgence électrique active?",
        emergencyText: "Pour une urgence active, appelez directement le",
        city: "Municipalité ou arrondissement",
        chooseCity: "Choisir un secteur",
        postalCode: "Code postal",
        fullName: "Nom complet",
        phone: "Téléphone",
        email: "Courriel",
        address: "Adresse des travaux",
        description: "Brève description",
        descriptionHint: "Décrivez le problème, l’installation ou les travaux envisagés.",
        files: "Photos ou plans",
        fileButton: "Choisir des fichiers",
        fileHint: "JPG, PNG, WebP ou PDF : 5 fichiers maximum, 7 Mo au total.",
        noFiles: "Aucun fichier sélectionné.",
        attachmentNotice: "Les fichiers sélectionnés seront joints à votre demande.",
        clearFiles: "Retirer la sélection",
        errors: "Vérifiez les champs indiqués avant d’envoyer la demande.",
        back: "Retour",
        next: "Continuer",
        prepare: "Envoyer la demande",
        emailNotice: "Votre demande sera envoyée directement à notre équipe.",
    },
    en: {
        eyebrow: "Quote request",
        title: "Tell us about your project",
        intro: "Tell us what you need, where and when. Send everything in one request.",
        progressLabel: "Request progress",
        status: (step: number) => `Step ${step} of 4`,
        stepNames: ["Service", "Timeline", "Location", "Contact"],
        stepTitles: [
            "Select service",
            "Intervention timeline",
            "Municipality or borough",
            "Contact and project details",
        ],
        stepIntros: [
            "Choose the category that best matches your needs.",
            "Tell us how quickly you need an intervention.",
            "Confirm where the work needs to be completed.",
            "Add the information needed to send your request.",
        ],
        serviceDescriptions: {
            residential: "Panel, EV charger, lighting, renovation, or residential troubleshooting.",
            commercialIndustrial: "Service entrance, three-phase equipment, maintenance, or compliance.",
            solar: "Solar project, electrical connections and potential storage.",
            security: "Intrusion alarm, fire detection, and electrical connection.",
            other: "A request that does not match the categories above.",
        },
        timelineDescriptions: {
            emergency: "Immediate hazard, active outage, or a situation requiring a direct call.",
            soon: "Prompt service requested, with no active electrical emergency.",
            planned: "Future work, budget planning, or a detailed estimate.",
        },
        emergencyTitle: "Active electrical emergency?",
        emergencyText: "For an active emergency, call",
        city: "Municipality or borough",
        chooseCity: "Select a service area",
        postalCode: "Postal code",
        fullName: "Full name",
        phone: "Phone number",
        email: "Email",
        address: "Work address",
        description: "Brief description",
        descriptionHint: "Describe the issue, installation, or planned work.",
        files: "Photos or plans",
        fileButton: "Choose files",
        fileHint: "JPG, PNG, WebP or PDF: up to 5 files, 7 MB total.",
        noFiles: "No files selected.",
        attachmentNotice: "Selected files will be attached to your request.",
        clearFiles: "Clear selection",
        errors: "Please check the highlighted fields before sending.",
        back: "Back",
        next: "Continue",
        prepare: "Send request",
        emailNotice: "Your request will be sent directly to our team.",
    },
} as const;
function FieldError({ id, message }: {
    id: string;
    message?: string;
}) {
    return message ? (<span className="field-error" id={id}>
      {message}
    </span>) : null;
}
export function QuoteIntakeWizard({ locale }: {
    locale: Locale;
}) {
    const copy = wizardCopy[locale];
    const [values, setValues] = useState<QuoteIntakeValues>(emptyQuoteIntakeValues);
    const [errors, setErrors] = useState<QuoteIntakeErrors>({});
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [sendError, setSendError] = useState("");
    const selectedFiles = useRef<File[]>([]);
    const requestId = useRef("");
    const summaryRef = useRef<HTMLDivElement>(null);
    const hasMounted = useRef(false);
    const serviceOptions = getQuoteServiceOptions(locale);
    const timelineOptions = getQuoteTimelineOptions(locale).filter(option => option.value !== "emergency");
    const municipalityOptions = getQuoteMunicipalityOptions(locale);
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            const prefill = readQuotePrefill(window.location.search);
            if (Object.keys(prefill).length) {
                // URL data is validated against service and city allowlists. Never overwrite entered values.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setValues(current => ({ ...current, service: current.service || prefill.service || "", municipality: current.municipality || prefill.municipality || "", work: current.work || prefill.work || "" }));
            }
            return;
        }
    }, []);
    function update<K extends keyof QuoteIntakeValues>(field: K, value: QuoteIntakeValues[K]) {
        requestId.current = "";
        setSendError("");
        setValues((current) => ({ ...current, [field]: value, ...(field === "service" ? { work: getQuoteWorkOptions(String(value), locale).length === 1 ? getQuoteWorkOptions(String(value), locale)[0].value : "" } : {}) }));
        setErrors((current) => {
            const next = { ...current };
            delete next[field as keyof QuoteIntakeErrors];
            return next;
        });
    }
    function showErrors(nextErrors: QuoteIntakeErrors) {
        setErrors(nextErrors);
        requestAnimationFrame(() => summaryRef.current?.focus());
    }
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending || sent)
            return;
        const nextErrors = Object.assign({}, ...([1, 2, 3, 4] as const).map(part => validateQuoteIntakeStep(values, part, locale)));
        if (Object.keys(nextErrors).length > 0) {
            showErrors(nextErrors);
            return;
        }
        setErrors({});
        setSending(true);
        setSendError("");
        requestId.current ||= crypto.randomUUID();
        const form = new FormData();
        for (const [key, value] of Object.entries(values)) {
            if (typeof value === "string")
                form.set(key, value);
        }
        form.set("locale", locale);
        form.set("requestId", requestId.current);
        for (const file of selectedFiles.current)
            form.append("files", file);
        try {
            const response = await fetch("/api/quote", { method: "POST", body: form, signal: AbortSignal.timeout(30000) });
            const result = await response.json();
            if (!response.ok || !result.success) {
                const messages = locale === "fr" ? {
                    unavailable: "L’envoi est temporairement indisponible. Appelez le bureau au 514-955-1112.",
                    files: "Choisissez au maximum 5 fichiers JPG, PNG, WebP ou PDF (7 Mo au total).",
                    "rate-limit": "Veuillez patienter une minute avant de réessayer.",
                } : {
                    unavailable: "Sending is temporarily unavailable. Call the office at 514-955-1112.",
                    files: "Choose up to 5 JPG, PNG, WebP or PDF files (7 MB total).",
                    "rate-limit": "Please wait a minute before trying again.",
                };
                setSendError(messages[result.error as keyof typeof messages] || (locale === "fr" ? "La demande n’a pas pu être envoyée. Réessayez ou appelez le bureau." : "Your request could not be sent. Try again or call the office."));
            }
            else {
                setSent(true);
            }
        }
        catch {
            setSendError(locale === "fr" ? "Impossible de confirmer l’envoi. Réessayez ou appelez le bureau." : "We could not confirm sending. Try again or call the office.");
        }
        finally {
            setSending(false);
        }
    }
    function handleFiles(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.currentTarget.files ?? []);
        if (files.length > 5 || files.reduce((size, file) => size + file.size, 0) > 7 * 1024 * 1024 || files.some(file => !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) {
            setSendError(locale === "fr" ? "Maximum 5 fichiers JPG, PNG, WebP ou PDF, 7 Mo au total." : "Maximum 5 JPG, PNG, WebP or PDF files, 7 MB total.");
            event.currentTarget.value = "";
            return;
        }
        selectedFiles.current = files;
        update("fileNames", files.map((file) => file.name));
    }
    const field = (key: "fullName" | "phone" | "email" | "address" | "postalCode", label: string, autoComplete: string, type = "text") => <div className="form-field"><label htmlFor={"quote-" + key}>{label} *</label><input id={"quote-" + key} autoComplete={autoComplete} type={type} value={values[key]} onChange={event => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? "error-" + key : undefined}/><FieldError id={"error-" + key} message={errors[key]}/></div>;
    return <form className="quote-form quote-wizard quote-single-page" id="quote-intake" noValidate onSubmit={handleSubmit}>
    <div className="form-heading" style={{ textAlign: "center" }}><p className="eyebrow" style={{ justifyContent: "center" }}>{copy.eyebrow}</p><h2>{copy.title}</h2><p>{copy.intro}</p></div>
    {Object.keys(errors).length > 0 && <div className="form-error-summary" ref={summaryRef} role="alert" tabIndex={-1}><TriangleAlert /><span>{copy.errors}</span></div>}
    <fieldset className="quote-step-panel"><legend style={{ color: "#dca66f" }}>{locale === "fr" ? "Votre projet" : "Your project"}</legend><div className="form-grid">
      <div className="form-field"><label htmlFor="quote-service">{locale === "fr" ? "Catégorie" : "Category"} *</label><select id="quote-service" value={values.service} onChange={event => update("service", event.target.value as QuoteService)} aria-invalid={Boolean(errors.service)} aria-describedby="quote-service-error"><option value="">{locale === "fr" ? "Choisir une catégorie" : "Choose a category"}</option>{serviceOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError id="quote-service-error" message={errors.service}/></div>
      <div className="form-field"><label htmlFor="quote-work">{locale === "fr" ? "Service souhaité" : "Requested service"}</label><select key={values.service} id="quote-work" value={values.work || ""} onChange={event => update("work", event.target.value)} disabled={!values.service} aria-describedby="quote-work-hint"><option value="">{!values.service ? (locale === "fr" ? "Choisissez d’abord une catégorie" : "Choose a category first") : (locale === "fr" ? "Choisir un service / à préciser" : "Choose a service / not sure yet")}</option>{getQuoteWorkOptions(values.service, locale).map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><small className="field-hint" id="quote-work-hint" aria-live="polite">{values.service ? (locale === "fr" ? `Services : ${serviceOptions.find(option => option.value === values.service)?.label}` : `Showing ${serviceOptions.find(option => option.value === values.service)?.label} services`) : ""}</small></div>
      <div className="form-field form-field-wide"><label htmlFor="quote-description">{copy.description} *</label><textarea id="quote-description" rows={3} placeholder={copy.descriptionHint} value={values.description} onChange={event => update("description", event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby="quote-description-error"/><FieldError id="quote-description-error" message={errors.description}/></div>
    </div></fieldset>
    <fieldset className="quote-step-panel"><legend style={{ color: "#dca66f" }}>{copy.stepTitles[1]}</legend><div className="quote-choice-grid quote-timeline-grid">{timelineOptions.map(option => <label className="quote-choice" data-selected={values.timeline === option.value} key={option.value}><input type="radio" name="quote-timeline" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "quote-timeline-error" : undefined} checked={values.timeline === option.value} onChange={() => update("timeline", option.value)}/><span className="quote-choice-copy"><strong>{option.label}</strong><small>{copy.timelineDescriptions[option.value]}</small></span><span className="quote-choice-check" aria-hidden="true"><Check /></span></label>)}</div><FieldError id="quote-timeline-error" message={errors.timeline}/>{values.timeline === "emergency" && <div className="quote-emergency-banner"><PhoneCall /><div><strong>{copy.emergencyTitle}</strong><p>{copy.emergencyText} <a href={site.emergencyPhoneHref}>{site.emergencyPhoneDisplay}</a>.</p></div></div>}</fieldset>
    <fieldset className="quote-step-panel"><legend style={{ color: "#dca66f" }}>{locale === "fr" ? "Lieu" : "Location"}</legend><div className="form-grid">{field("address", copy.address, "street-address")}<div className="form-field"><label htmlFor="quote-municipality">{copy.city} *</label><select id="quote-municipality" value={values.municipality} onChange={event => update("municipality", event.target.value)} aria-invalid={Boolean(errors.municipality)} aria-describedby="quote-municipality-error"><option value="">{copy.chooseCity}</option>{municipalityOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError id="quote-municipality-error" message={errors.municipality}/></div>{field("postalCode", copy.postalCode, "postal-code")}</div></fieldset>
    <fieldset className="quote-step-panel"><legend style={{ color: "#dca66f" }}>{locale === "fr" ? "Vos coordonnées" : "Your contact details"}</legend><div className="form-grid">{field("fullName", copy.fullName, "name")}{field("phone", copy.phone, "tel", "tel")}{field("email", copy.email, "email", "email")}</div></fieldset>
    <fieldset className="quote-step-panel"><legend>{copy.files} <small>({locale === "fr" ? "facultatif" : "optional"})</small></legend><div className="quote-upload-field"><label className="quote-upload-control" htmlFor="quote-files"><Upload /><span>{copy.fileButton}</span><input id="quote-files" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple onChange={handleFiles}/></label><small className="field-hint" style={{ display: "block", marginTop: "12px" }}>{copy.fileHint}</small><div className="quote-file-selection" aria-live="polite">{values.fileNames.map(name => <p key={name}><Paperclip />{name}</p>)}{values.fileNames.length > 0 && <button type="button" onClick={() => { selectedFiles.current = []; update("fileNames", []); const input = document.getElementById("quote-files") as HTMLInputElement; if (input)
        input.value = ""; }}>{copy.clearFiles}</button>}</div></div></fieldset>
    {sendError && <p className="field-error" role="alert">{sendError}</p>}{sent && <p role="status">{locale === "fr" ? "Votre demande a été envoyée." : "Your request has been sent."}</p>}
    <div className="quote-wizard-actions"><Button type="submit" disabled={sending || sent} aria-busy={sending} className="primary-action" size="lg">{sent ? (locale === "fr" ? "Envoyée" : "Sent") : sending ? (locale === "fr" ? "Envoi…" : "Sending…") : copy.prepare}<ArrowRight /></Button></div><p className="quote-email-notice">{copy.emailNotice}</p>
  </form>;
}
