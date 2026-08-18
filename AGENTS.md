# AGENTS.md

Codex-facing instructions for this repository. `CLAUDE.md` in this same directory covers the
same ground for Claude Code — this file is kept as its own copy (not a symlink) per this
workspace's convention, so update both when something structural changes.

## What this is

Senior-friendly React/Vite marketing website for Fairgrounds Dental Practice (Vallejo, CA), in a
pnpm workspace (`artifacts/*`, `lib/*`, `scripts`). The site (`artifacts/fairgrounds-dental`) is
the whole shipped product; `lib/db` and `artifacts/api-server` are unused backend scaffolding
(empty schema, health-check-only API). GitHub remote: `Kompweb/FairgroundsDental.git` — normal
commits/pushes, no force-push.

## Commands

```bash
pnpm install                                                              # pnpm only — preinstall blocks npm/yarn
pnpm --filter @workspace/fairgrounds-dental-practice-website run dev      # dev server (needs PORT + BASE_PATH env, see .replit-artifact/artifact.toml)
pnpm --filter @workspace/fairgrounds-dental-practice-website run build
pnpm --filter @workspace/fairgrounds-dental-practice-website run typecheck
pnpm run typecheck                                                        # whole workspace
pnpm run build                                                            # whole workspace
```

No test suite exists. Typecheck + build is the verification bar for every change.

## Preserve existing work

- Run `git status` before editing, and re-read a file immediately before changing it — this repo
  is actively touched by more than one tool/session (Replit Agent, other CLIs), so the working
  tree can differ from what you last saw even a few minutes ago.
- Review `git diff --stat` before calling a change done. Call out any removal you didn't intend
  rather than silently reconciling it — don't assume a diff you didn't make is wrong; it may be
  another session's in-progress work.
- Don't revert changes you didn't make unless asked.

## Agent roles

- Hermes, if invoked on this machine for this project, is read-only: it audits, diagnoses, and
  recommends, but cannot write files, patch, or manage todos.
- Codex and Claude Code both implement approved changes directly and are expected to verify with
  typecheck/build before reporting done.

## Architecture pointers

- `artifacts/fairgrounds-dental/src/App.tsx` — wouter routes.
- `artifacts/fairgrounds-dental/src/pages/marketing-pages.tsx` — all page content (large file:
  Home, About, Services, service subpages under `/services/*`, New Patients, Reviews, Contact).
- `artifacts/fairgrounds-dental/src/components/site-shell.tsx` — shared header/footer/CTA chrome,
  plus `PageIntro`/`SectionHeading`/`Breadcrumbs` layout primitives reused across pages.
- `artifacts/fairgrounds-dental/src/components/seo.tsx` — `PageMeta`: per-page title/OG tags plus
  a shared practice JSON-LD schema, and an optional `structuredData` prop for page-specific
  schema (e.g. `BreadcrumbList`, `MedicalProcedure`).
- `artifacts/fairgrounds-dental/src/components/appointment-form.tsx` — submits to a live Google
  Apps Script endpoint into a Google Sheet. This is real patient intake, not a stub. Keep it
  minimal — don't add fields/options without asking first.
- `artifacts/fairgrounds-dental/public/images/{doctors,services,office}/` — image assets. New
  photos should be renamed to a descriptive, keyword-relevant kebab-case filename, resized to the
  display width actually needed, and given real `alt` text — don't drop in unoptimized originals.
- `lib/api-spec/openapi.yaml` is the source of truth for the unused API; codegen regenerates
  `lib/api-client-react` and `lib/api-zod` — don't hand-edit their `src/generated`.

## Product notes

- Audience is mostly 55+: large readable text, simple navigation, persistent call/appointment
  CTAs, high-contrast buttons.
- No analytics (GA4/GTM) installed by design — don't add placeholder tracking IDs.
