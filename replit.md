# Fairgrounds Dental Practice Website

Senior-friendly dental practice website for Fairgrounds Dental Practice in Vallejo, California.

## Run & Operate

- `pnpm --filter @workspace/fairgrounds-dental-practice-website run dev` — run the dental website
- `pnpm --filter @workspace/api-server run dev` — run the API server if backend work is needed (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: none for the static dental website
- Optional backend env: `DATABASE_URL` — Postgres connection string if backend packages are used

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fairgrounds-dental` — patient-facing dental website
- `artifacts/fairgrounds-dental/src/pages/marketing-pages.tsx` — marketing page content and sections
- `artifacts/fairgrounds-dental/src/components/site-shell.tsx` — header, footer, urgent bar, mobile sticky actions
- `artifacts/fairgrounds-dental/src/components/appointment-form.tsx` — frontend appointment request form
- `artifacts/fairgrounds-dental/src/index.css` — theme, typography, and global accessibility styling

## Architecture decisions

- The site is optimized for a 55+ dental audience: readable type, simple navigation, high-contrast CTAs, and persistent mobile call/appointment actions.
- The appointment form is frontend-only until a scheduling, CRM, or email endpoint is selected.
- GitHub remote for this project is `https://github.com/Kompweb/FairgroundsDental.git`; do not force-push.

## Product

- Practice overview, doctors, services, insurance/financing guidance, patient reviews, contact details, Google map, and appointment request flow.

## User preferences

- Audience is mostly age 55+.
- Prioritize phone calls, clear appointment paths, readable text, simple navigation, and trust-building copy.

## Gotchas

- Replit Agent credits may be unavailable; shell changes should be validated with `pnpm run typecheck` and `pnpm run build`.
- Do not commit pasted prompt files or generated scratch assets unless intentionally needed.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
