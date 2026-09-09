# Third-party notices and provenance

The application layer, bilingual copy, route registry, layout composition, styles and favicon in this Site were authored for this project. No generic electrician template, customer logo, manufacturer logo, demo testimonial or third-party project photograph was copied.

The hero image (`public/eclipse-electrical-grid.webp`) is an original abstract electrical/architectural image generated for this project. It is not presented as a photograph of an Éclipse électrique installation or customer project.

The ambient hero video (`public/eclipse-electrical-ambient.mp4`) is a short, muted motion treatment generated locally from that same original abstract image. It is decorative, contains no recorded customer or employee footage, and falls back to the still image for reduced-motion or unsupported-video contexts.

The logos (`public/eclipse-logo-light.png`, `public/eclipse-logo-dark.png`, and the legacy structured-data asset `public/eclipse-logo.jpg`) were supplied by the business owner. Their use is controlled by the owner’s permission; replace them only with owner-approved source assets.

The Site was prepared from the bundled Vinext starter, which supplies the package lockfile, Cloudflare/Vite integration and accessible UI catalog. The package versions and transitive notices remain governed by `package-lock.json`.

Relevant upstream projects and licences:

- [Next.js](https://github.com/vercel/next.js) — MIT
- [Vinext](https://github.com/cloudflare/vinext) — MIT
- [React](https://github.com/facebook/react) — MIT
- [Vite](https://github.com/vitejs/vite) — MIT
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) — MIT
- [shadcn/ui](https://github.com/shadcn-ui/ui) — MIT (the bundled catalog is used selectively)
- [Lucide](https://github.com/lucide-icons/lucide) — ISC (named icons only)
- [React Hook Form](https://github.com/react-hook-form/react-hook-form) — MIT (available in the starter; not required by the current composer)
- [Zod](https://github.com/colinhacks/zod) — MIT (server-side assistant input and tool validation)

The application does not load remote fonts, analytics, advertising pixels, map embeds, external form services or a social-preview image. The only autoplay media is the local, muted, decorative hero video described above. If the form becomes server-backed, add the selected processor, retention policy, consent language and its licence/privacy notices here before enabling it publicly.
# Experience upgrade libraries

The local components in `components/magicui/` adapt Animated Grid Pattern, Border Beam and Number Ticker from [Magic UI](https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui), copyright Magic UI, MIT license. The complete required notice is preserved in [docs/third-party/magicui-LICENSE.md](docs/third-party/magicui-LICENSE.md). Adaptations use deterministic SSR output, finite animation and reduced-motion safeguards.

Manrope Variable and Inter Variable are distributed through [Fontsource](https://github.com/fontsource/fontsource), licensed under SIL OFL 1.1. Their complete notices are preserved in `docs/third-party/manrope-OFL.txt` and `docs/third-party/inter-OFL.txt`. Only upright Latin and Latin Extended variable WOFF2 files are served.

- [Motion](https://github.com/motiondivision/motion) — MIT; shared animation features and reduced-motion support.
- [Vercel AI SDK](https://github.com/vercel/ai) — Apache-2.0; optional server-side routing. When enabled, the current assistant message is sent to OpenAI as described in `docs/assistant.md`.
- [Playwright](https://github.com/microsoft/playwright) — Apache-2.0; development-only browser verification.
- [axe-core](https://github.com/dequelabs/axe-core) — MPL-2.0; development-only accessibility verification.
