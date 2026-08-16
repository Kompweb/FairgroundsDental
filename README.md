# Fairgrounds Dental Practice Website

Senior-friendly React/Vite website for Fairgrounds Dental Practice in Vallejo, California.

The main site lives in `artifacts/fairgrounds-dental` and includes home, about, services, new patient, reviews, contact, SEO metadata, local dentist schema, and an appointment request form.

## Run

```bash
pnpm install
pnpm --filter @workspace/fairgrounds-dental-practice-website run dev
```

## Validate

```bash
pnpm run typecheck
pnpm run build
```

## Replit

Replit artifact settings are in `artifacts/fairgrounds-dental/.replit-artifact/artifact.toml`.

Production build command:

```bash
pnpm --filter @workspace/fairgrounds-dental-practice-website run build
```

## GitHub

Repository: `https://github.com/Kompweb/FairgroundsDental.git`

Use normal commits and pushes. Do not force-push or overwrite existing history.

## Integration Notes

The appointment form is frontend-only. Connect it to scheduling, CRM, or email handling before relying on it for patient intake.

Analytics scripts are not installed by default. Add GA4/GTM only after the production measurement ID and consent requirements are confirmed.
