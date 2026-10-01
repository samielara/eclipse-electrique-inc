# Quote form email delivery

The quote form posts to `/api/quote`. Email and attachments are sent through
Resend from the server. API keys are never included in browser code.

## Enable delivery

1. Create your account at https://resend.com/signup.
2. Add a sending domain in Resend and copy its DNS records to your domain provider.
   A subdomain such as `send.eclipseelectrique.com` keeps this separate from your
   existing mailbox. Do not replace your mailbox's existing MX records.
3. Wait for Resend to verify the domain, then create an API key with sending permission.
4. Add these server environment variables to your ignored `.env.local` and your
   deployment's secret settings:

   ```dotenv
   RESEND_API_KEY=re_your_key
   RESEND_FROM_EMAIL="Éclipse Électrique <quotes@send.eclipseelectrique.com>"
   RESEND_TO_EMAIL=yasser@eclipseelectrique.com
   ```

5. Restart localhost and submit a test request. Check Resend's delivery log and
   the destination inbox. A successful API response confirms acceptance by Resend,
   not guaranteed inbox delivery.

No live email can be sent until the API key and verified sender are configured.
Requests fail visibly and remain in the form when configuration or delivery fails.

## Behavior and limits

- The recipient is server-configured; visitors cannot change it.
- Reply-To uses the visitor's validated email address.
- All four form steps are validated again on the server.
- JPG, PNG, WebP and PDF attachments: up to 5 files, 7 MB total.
- The endpoint caps the entire request at 8 MB and uses a provider timeout.
- A request UUID is reused on retries to prevent duplicate emails through Resend
  idempotency. Editing fields starts a new request.
- Same-origin checks and a per-process five-attempts-per-minute limiter reduce abuse.
  Before public launch on multiple instances, configure a shared rate limiter or
  platform firewall rule for `/api/quote`; forwarded IP headers must be set by a
  trusted proxy. The in-memory limiter resets on restart and is not distributed.
- Quote requests do not replace the emergency phone line.
