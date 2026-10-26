# Single-page quote request

Local implementation, October 25, 2026.

- Replaces the four-step interaction with one form: project, timing, location, contact and optional attachments.
- Quote links carry allowlisted category, work ID and municipality context. Header and page CTAs use the same routing helper.
- Residential and commercial subservices remain editable; changing category clears stale work selections.
- Both English and French use existing catalogue labels. Exact requested service is included in the server email summary.
- Existing Resend configuration, attachment limits, origin checking, rate limits and idempotency remain in place. No live emails were sent during validation.
- Verification: TypeScript, catalogue/context round-trip tests, browser heating CTA prefill, category reset, all-field validation and French mobile overflow check.
