# Fairgrounds Dental Practice

A presentation-first React + Vite + Tailwind site for Fairgrounds Dental Practice in Vallejo, California.

## Setup

From this directory:

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The Vite server binds to `0.0.0.0` using the provided config. Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run serve
```

The generated static bundle is in `dist/` and can be deployed to any static host configured for SPA fallback routing. The Wouter router reads `import.meta.env.BASE_URL`, so deployments under a sub-path remain supported.

## Included routes

- `/` — practice overview, care highlights, doctors, reviews, and location
- `/about` — practice story and doctors
- `/services` — individual care offerings
- `/new-patients` — insurance, financing, first visit, and FAQs
- `/reviews` — patient stories and Google review placeholder
- `/contact` — contact details, map, and appointment request form

## Analytics placeholder

The document head is intentionally ready for analytics. Add GA4 or GTM initialization in `src/main.tsx` (or a small analytics component) when the measurement ID is available. No tracking scripts are included by default.

The appointment form is intentionally frontend-only: it validates required fields and presents a clear success state. Connect its submit handler to the practice scheduling or CRM endpoint when one is available.