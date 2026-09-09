"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleHelp,
  Flame,
  House,
  Paperclip,
  PhoneCall,
  ScanLine,
  TriangleAlert,
  Upload,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { m } from "motion/react";
import { useExperienceMotion } from "@/components/motion/provider";
import { readQuotePrefill } from "@/lib/assistant/prefill";
import { Button } from "@/components/ui/button";
import {
  buildQuoteIntakeMailtoUrl,
  emptyQuoteIntakeValues,
  getQuoteMunicipalityOptions,
  getQuoteServiceOptions,
  getQuoteTimelineOptions,
  validateQuoteIntakeStep,
  type QuoteIntakeErrors,
  type QuoteIntakeStep,
  type QuoteIntakeValues,
  type QuoteService,
  type QuoteTimeline,
} from "@/lib/quote-intake";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site";

const serviceIcons = {
  residential: House,
  commercialIndustrial: Building2,
  thermography: ScanLine,
  security: Flame,
  other: CircleHelp,
} as const;

const wizardCopy = {
  fr: {
    eyebrow: "Demande de soumission",
    title: "Parlez-nous de votre projet",
    intro:
      "Quatre étapes rapides nous donnent le contexte nécessaire pour préparer votre demande.",
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
      "Ajoutez les renseignements nécessaires pour préparer le courriel de demande.",
    ],
    serviceDescriptions: {
      residential: "Panneau, borne VE, éclairage, rénovation ou dépannage résidentiel.",
      commercialIndustrial: "Entrée électrique, équipement triphasé, maintenance ou conformité.",
      thermography: "Inspection préventive de panneaux et détection de points chauds.",
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
    chooseCity: "Choisir dans les 50 secteurs desservis",
    postalCode: "Code postal",
    fullName: "Nom complet",
    phone: "Téléphone",
    email: "Courriel",
    address: "Adresse des travaux",
    description: "Brève description",
    descriptionHint: "Décrivez le problème, l’installation ou les travaux envisagés.",
    files: "Photos ou plans",
    fileButton: "Choisir des fichiers",
    fileHint:
      "Photos de panneau, codes d’erreur ou plans en image/PDF. Rien n’est téléversé sur le site.",
    noFiles: "Aucun fichier sélectionné.",
    attachmentNotice:
      "Les noms seront ajoutés au courriel; joignez ensuite les fichiers dans votre application de courriel.",
    clearFiles: "Retirer la sélection",
    errors: "Corrigez les champs indiqués avant de continuer.",
    back: "Retour",
    next: "Continuer",
    prepare: "Préparer le courriel",
    emailNotice:
      "Le bouton ouvre votre application de courriel. La demande n’est pas envoyée automatiquement.",
  },
  en: {
    eyebrow: "Quote request",
    title: "Tell us about your project",
    intro:
      "Four quick steps provide the context needed to prepare your request.",
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
      "Add the information needed to prepare your request email.",
    ],
    serviceDescriptions: {
      residential: "Panel, EV charger, lighting, renovation, or residential troubleshooting.",
      commercialIndustrial: "Service entrance, three-phase equipment, maintenance, or compliance.",
      thermography: "Preventive panel inspection and hot-spot detection.",
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
    chooseCity: "Choose from the 50 service areas",
    postalCode: "Postal code",
    fullName: "Full name",
    phone: "Phone number",
    email: "Email",
    address: "Work address",
    description: "Brief description",
    descriptionHint: "Describe the issue, installation, or planned work.",
    files: "Photos or plans",
    fileButton: "Choose files",
    fileHint:
      "Panel photos, error codes, or image/PDF plans. Nothing is uploaded to the website.",
    noFiles: "No files selected.",
    attachmentNotice:
      "The filenames will be added to the email; attach the files in your email application.",
    clearFiles: "Clear selection",
    errors: "Correct the indicated fields before continuing.",
    back: "Back",
    next: "Continue",
    prepare: "Prepare email",
    emailNotice:
      "The button opens your email application. The request is not sent automatically.",
  },
} as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span className="field-error" id={id}>
      {message}
    </span>
  ) : null;
}

export function QuoteIntakeWizard({ locale }: { locale: Locale }) {
  const copy = wizardCopy[locale];
  const { reducedMotion, transition } = useExperienceMotion();
  const [step, setStep] = useState<QuoteIntakeStep>(1);
  const [values, setValues] = useState<QuoteIntakeValues>(emptyQuoteIntakeValues);
  const [errors, setErrors] = useState<QuoteIntakeErrors>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);
  const serviceOptions = getQuoteServiceOptions(locale);
  const timelineOptions = getQuoteTimelineOptions(locale);
  const municipalityOptions = getQuoteMunicipalityOptions(locale);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      const prefill = readQuotePrefill(window.location.search);
      if (Object.keys(prefill).length) {
        // URL data is validated against service and city allowlists. Never overwrite entered values.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValues(current => ({ ...current, service: current.service || prefill.service || "", municipality: current.municipality || prefill.municipality || "" }));
      }
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  function update<K extends keyof QuoteIntakeValues>(
    field: K,
    value: QuoteIntakeValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuoteIntakeStep(values, step, locale);

    if (Object.keys(nextErrors).length > 0) {
      showErrors(nextErrors);
      return;
    }

    setErrors({});
    if (step < 4) {
      setStep((step + 1) as QuoteIntakeStep);
      return;
    }

    window.location.href = buildQuoteIntakeMailtoUrl(values, locale);
  }

  function handleBack() {
    setErrors({});
    setStep((step - 1) as QuoteIntakeStep);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    update(
      "fileNames",
      files.map((file) => file.name),
    );
  }

  return (
    <form
      className="quote-form quote-wizard"
      id="quote-intake"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="form-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </div>

      <div className="quote-wizard-progress">
        <div className="quote-wizard-progress-copy">
          <span aria-live="polite">{copy.status(step)}</span>
          <strong>{copy.stepNames[step - 1]}</strong>
        </div>
        <progress
          aria-label={copy.progressLabel}
          max={4}
          value={step}
        >
          {copy.status(step)}
        </progress>
        <ol aria-label={copy.progressLabel} className="quote-wizard-steps">
          {copy.stepNames.map((name, index) => {
            const stepNumber = index + 1;
            const status = stepNumber === step ? "current" : stepNumber < step ? "complete" : "upcoming";
            return (
              <li data-status={status} key={name}>
                <span aria-hidden="true">{stepNumber < step ? <Check /> : stepNumber}</span>
                <small aria-current={stepNumber === step ? "step" : undefined}>{name}</small>
              </li>
            );
          })}
        </ol>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="form-error-summary" ref={summaryRef} role="alert" tabIndex={-1}>
          <TriangleAlert aria-hidden="true" />
          <span>{copy.errors}</span>
        </div>
      )}

      <m.fieldset initial={false} animate={{ y: step === 1 && reducedMotion === false ? [4, 0] : 0 }} transition={transition} className="quote-step-panel" hidden={step !== 1}>
        <legend className="sr-only">{copy.stepTitles[0]}</legend>
        <h3 id="quote-step-1-title" ref={step === 1 ? stepHeadingRef : undefined} tabIndex={-1}>
          {copy.stepTitles[0]}
        </h3>
        <p>{copy.stepIntros[0]}</p>
        <div
          aria-describedby={errors.service ? "quote-service-error" : undefined}
          aria-invalid={Boolean(errors.service)}
          aria-labelledby="quote-step-1-title"
          className="quote-choice-grid"
          role="radiogroup"
        >
          {serviceOptions.map((option) => {
            const Icon = serviceIcons[option.value];
            const isSelected = values.service === option.value;
            return (
              <label className="quote-choice" data-selected={isSelected} key={option.value}>
                <input
                  checked={isSelected}
                  name="quote-service"
                  onChange={() => update("service", option.value)}
                  type="radio"
                  value={option.value}
                />
                <span className="quote-choice-icon" aria-hidden="true"><Icon /></span>
                <span className="quote-choice-copy">
                  <strong>{option.label}</strong>
                  <small>{copy.serviceDescriptions[option.value as QuoteService]}</small>
                </span>
                <span className="quote-choice-check" aria-hidden="true"><Check /></span>
              </label>
            );
          })}
        </div>
        <FieldError id="quote-service-error" message={errors.service} />
      </m.fieldset>

      <m.fieldset initial={false} animate={{ y: step === 2 && reducedMotion === false ? [4, 0] : 0 }} transition={transition} className="quote-step-panel" hidden={step !== 2}>
        <legend className="sr-only">{copy.stepTitles[1]}</legend>
        <h3 id="quote-step-2-title" ref={step === 2 ? stepHeadingRef : undefined} tabIndex={-1}>
          {copy.stepTitles[1]}
        </h3>
        <p>{copy.stepIntros[1]}</p>
        <div
          aria-describedby={errors.timeline ? "quote-timeline-error" : undefined}
          aria-invalid={Boolean(errors.timeline)}
          aria-labelledby="quote-step-2-title"
          className="quote-choice-grid quote-timeline-grid"
          role="radiogroup"
        >
          {timelineOptions.map((option) => {
            const isSelected = values.timeline === option.value;
            return (
              <label className="quote-choice" data-selected={isSelected} key={option.value}>
                <input
                  checked={isSelected}
                  name="quote-timeline"
                  onChange={() => update("timeline", option.value)}
                  type="radio"
                  value={option.value}
                />
                <span className="quote-choice-copy">
                  <strong>{option.label}</strong>
                  <small>{copy.timelineDescriptions[option.value as QuoteTimeline]}</small>
                </span>
                <span className="quote-choice-check" aria-hidden="true"><Check /></span>
              </label>
            );
          })}
        </div>
        <FieldError id="quote-timeline-error" message={errors.timeline} />
        {values.timeline === "emergency" && (
          <div className="quote-emergency-banner" role="note">
            <PhoneCall aria-hidden="true" />
            <div>
              <strong>{copy.emergencyTitle}</strong>
              <p>{copy.emergencyText} <a href={site.emergencyPhoneHref}>{site.emergencyPhoneDisplay}</a>.</p>
            </div>
          </div>
        )}
      </m.fieldset>

      <m.fieldset initial={false} animate={{ y: step === 3 && reducedMotion === false ? [4, 0] : 0 }} transition={transition} className="quote-step-panel" hidden={step !== 3}>
        <legend className="sr-only">{copy.stepTitles[2]}</legend>
        <h3 id="quote-step-3-title" ref={step === 3 ? stepHeadingRef : undefined} tabIndex={-1}>
          {copy.stepTitles[2]}
        </h3>
        <p>{copy.stepIntros[2]}</p>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="quote-municipality">{copy.city}<span aria-hidden="true"> *</span></label>
            <select
              aria-describedby={errors.municipality ? "quote-municipality-error" : undefined}
              aria-invalid={Boolean(errors.municipality)}
              id="quote-municipality"
              onChange={(event) => update("municipality", event.target.value)}
              value={values.municipality}
            >
              <option value="">{copy.chooseCity}</option>
              {municipalityOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <FieldError id="quote-municipality-error" message={errors.municipality} />
          </div>
          <div className="form-field">
            <label htmlFor="quote-postal-code">{copy.postalCode}<span aria-hidden="true"> *</span></label>
            <input
              aria-describedby={errors.postalCode ? "quote-postal-code-error" : undefined}
              aria-invalid={Boolean(errors.postalCode)}
              autoComplete="postal-code"
              id="quote-postal-code"
              inputMode="text"
              onChange={(event) => update("postalCode", event.target.value)}
              placeholder="H1B 5V4"
              value={values.postalCode}
            />
            <FieldError id="quote-postal-code-error" message={errors.postalCode} />
          </div>
        </div>
      </m.fieldset>

      <m.fieldset initial={false} animate={{ y: step === 4 && reducedMotion === false ? [4, 0] : 0 }} transition={transition} className="quote-step-panel" hidden={step !== 4}>
        <legend className="sr-only">{copy.stepTitles[3]}</legend>
        <h3 id="quote-step-4-title" ref={step === 4 ? stepHeadingRef : undefined} tabIndex={-1}>
          {copy.stepTitles[3]}
        </h3>
        <p>{copy.stepIntros[3]}</p>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="quote-full-name">{copy.fullName}<span aria-hidden="true"> *</span></label>
            <input
              aria-describedby={errors.fullName ? "quote-full-name-error" : undefined}
              aria-invalid={Boolean(errors.fullName)}
              autoComplete="name"
              id="quote-full-name"
              onChange={(event) => update("fullName", event.target.value)}
              value={values.fullName}
            />
            <FieldError id="quote-full-name-error" message={errors.fullName} />
          </div>
          <div className="form-field">
            <label htmlFor="quote-phone">{copy.phone}<span aria-hidden="true"> *</span></label>
            <input
              aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              id="quote-phone"
              inputMode="tel"
              onChange={(event) => update("phone", event.target.value)}
              type="tel"
              value={values.phone}
            />
            <FieldError id="quote-phone-error" message={errors.phone} />
          </div>
          <div className="form-field">
            <label htmlFor="quote-email">{copy.email}<span aria-hidden="true"> *</span></label>
            <input
              aria-describedby={errors.email ? "quote-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              id="quote-email"
              inputMode="email"
              onChange={(event) => update("email", event.target.value)}
              type="email"
              value={values.email}
            />
            <FieldError id="quote-email-error" message={errors.email} />
          </div>
          <div className="form-field">
            <label htmlFor="quote-address">{copy.address}<span aria-hidden="true"> *</span></label>
            <input
              aria-describedby={errors.address ? "quote-address-error" : undefined}
              aria-invalid={Boolean(errors.address)}
              autoComplete="street-address"
              id="quote-address"
              onChange={(event) => update("address", event.target.value)}
              value={values.address}
            />
            <FieldError id="quote-address-error" message={errors.address} />
          </div>
          <div className="form-field form-field-wide">
            <label htmlFor="quote-description">{copy.description}<span aria-hidden="true"> *</span></label>
            <textarea
              aria-describedby={errors.description ? "quote-description-error" : "quote-description-hint"}
              aria-invalid={Boolean(errors.description)}
              id="quote-description"
              onChange={(event) => update("description", event.target.value)}
              rows={5}
              value={values.description}
            />
            <small className="field-hint" id="quote-description-hint">{copy.descriptionHint}</small>
            <FieldError id="quote-description-error" message={errors.description} />
          </div>
          <div className="form-field form-field-wide quote-upload-field">
            <span className="quote-upload-label">{copy.files}</span>
            <label className="quote-upload-control" htmlFor="quote-files">
              <Upload aria-hidden="true" />
              <span>{copy.fileButton}</span>
              <input
                accept="image/*,.pdf,application/pdf"
                id="quote-files"
                multiple
                onChange={handleFiles}
                type="file"
              />
            </label>
            <small className="field-hint">{copy.fileHint}</small>
            <div aria-live="polite" className="quote-file-selection">
              {values.fileNames.length === 0 ? (
                <span>{copy.noFiles}</span>
              ) : (
                <>
                  <ul>
                    {values.fileNames.map((fileName) => (
                      <li key={fileName}><Paperclip aria-hidden="true" />{fileName}</li>
                    ))}
                  </ul>
                  <button onClick={() => update("fileNames", [])} type="button">{copy.clearFiles}</button>
                </>
              )}
            </div>
            <small className="quote-attachment-notice">{copy.attachmentNotice}</small>
          </div>
        </div>
      </m.fieldset>

      <div className="quote-wizard-actions">
        {step > 1 && (
          <Button className="quote-back-button" onClick={handleBack} size="lg" type="button" variant="outline">
            <ArrowLeft aria-hidden="true" />{copy.back}
          </Button>
        )}
        <Button className="primary-action quote-next-button" size="lg" type="submit">
          {step === 4 ? copy.prepare : copy.next}<ArrowRight aria-hidden="true" />
        </Button>
      </div>
      {step === 4 && <p className="quote-email-notice">{copy.emailNotice}</p>}
    </form>
  );
}
