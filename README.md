# AI Resume & Cover Letter Builder — Project Overview

> A solo side project. Paste a job description and your background, get a tailored resume, cover letter, and ATS score — ready to export as PDF or Word.

---

## 1. Project Summary

A web app that uses AI to eliminate the most painful part of job hunting: rewriting your resume for every application. The user pastes a job description and their background, and the app generates a tailored resume, a matching cover letter, and an ATS keyword score — all exportable to PDF or DOCX.

**Primary goal:** Personal use, with a public launch planned.
**Team:** Solo developer.
**AI angle:** Content generation, keyword extraction, and ATS scoring — all powered by the Claude API.

---

## 2. Core Features (v1)

| Feature | Description |
|---|---|
| Resume generation | AI crafts a tailored resume that mirrors the job description's language and keywords |
| Cover letter generation | Separate AI call producing a focused, under-400-word cover letter |
| ATS score checker | Claude extracts top keywords from the JD, checks which appear in the resume, returns a score + missing keyword list |
| In-place editing | User can tweak the generated output directly in the browser before exporting |
| PDF export | Client-side export via `@react-pdf/renderer` |
| DOCX export | Server-side export via the `docx` npm package, returned as a blob download |

**Out of scope for v1:** User accounts, saved history, multiple resume versions. These are v2 features — validate demand first.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Comfortable stack; handles frontend, API routes, and streaming in one project — no separate backend needed |
| Language | TypeScript | Keeps the resume schema, prompt outputs, and export functions consistent — essential for a solo project |
| Styling | Tailwind CSS + shadcn/ui | Fast layout with pre-built accessible components |
| AI | Anthropic SDK — `claude-sonnet-4-6` | Best output quality for content generation; streaming enabled |
| PDF export | `@react-pdf/renderer` | Client-side; renders resume from a React component |
| DOCX export | `docx` (npm) | Server-side via API route; simpler to style than PDF |
| State management | React `useState` only | No database, no accounts — a few hooks covers everything in v1 |
| Deployment | Vercel (hobby tier) | Zero-config for Next.js; free for personal use |
| Database | None (v1) | No user accounts means no persistence needed |

---

## 4. Project Structure

```
ai-resume-builder/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Lint, typecheck, build on every push/PR
│   │   └── security.yml        # npm audit — every Monday + push to main
│   └── dependabot.yml          # Auto PRs for outdated packages
│
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page
│   ├── builder/
│   │   └── page.tsx            # ⭐ Main builder UI
│   └── api/
│       ├── generate/
│       │   └── route.ts        # Resume + cover letter (streamed response)
│       ├── ats/
│       │   └── route.ts        # ATS keyword scoring
│       └── export/
│           └── docx/
│               └── route.ts    # Generates and returns .docx blob
│
├── components/
│   ├── ui/                     # shadcn auto-generated components
│   ├── builder/
│   │   ├── InputPanel.tsx      # Job description + background form
│   │   ├── OutputPanel.tsx     # Tabbed output: resume / cover letter
│   │   ├── ATSScore.tsx        # Score ring + missing keywords display
│   │   └── ExportBar.tsx       # PDF + DOCX download buttons
│   └── layout/
│       └── Header.tsx
│
├── lib/
│   ├── anthropic.ts            # Anthropic SDK client singleton
│   ├── prompts.ts              # ⭐ All prompt templates in one place
│   ├── ats.ts                  # ATS keyword parsing and scoring logic
│   └── docx.ts                 # Word file builder helper
│
├── types/
│   └── index.ts                # Shared TypeScript types (Resume, CoverLetter, ATSResult)
│
├── .env.local                  # ANTHROPIC_API_KEY (never commit this)
├── .gitignore                  # Must include .env.local
├── next.config.ts
└── package.json
```

---

## 5. Key Architecture Decisions

**All Claude API calls go through Next.js API routes — never the browser.**
The `ANTHROPIC_API_KEY` must stay server-side. Set it in Vercel's environment variables dashboard before deploying. It must never appear in client-side code.

**`lib/prompts.ts` is the most important file in the project.**
All prompt templates live in one place. When output quality needs tuning — and it will — you fix it in a single file, not scattered across routes. Treat prompts as source code, version-control them, and iterate deliberately.

**Claude returns structured JSON, not raw text.**
The generation prompt instructs Claude to respond with a typed JSON object matching the `Resume` type. This ensures the same data structure flows through the UI renderer, the PDF exporter, and the DOCX exporter without any lossy parsing.

**Define `types/index.ts` on Day 1.**
Every layer of the app needs to agree on the shape of a resume. A shared type like this prevents the kind of silent mismatch that only shows up at export time:

```typescript
type Resume = {
  name: string
  summary: string
  experience: {
    role: string
    company: string
    dates: string
    bullets: string[]
  }[]
  skills: string[]
  education: {
    degree: string
    school: string
    year: string
  }[]
}
```

**Stream the AI response — don't wait for it.**
The generation API route uses streaming so the user sees the resume being written in real time. A 10-second blank wait feels broken; tokens appearing immediately feels fast and responsive.

---

## 6. Data Flow

```
User fills InputPanel (job description + background)
        │
        ▼
POST /api/generate  ──►  Claude API (streamed)
        │
        ▼
OutputPanel renders streamed response live
(user can edit inline)
        │
        ├──► POST /api/ats  ──►  Claude extracts keywords  ──►  ATSScore.tsx
        │
        ├──► [PDF button]  ──►  @react-pdf/renderer (client-side)  ──►  download
        │
        └──► [DOCX button]  ──►  POST /api/export/docx  ──►  docx npm  ──►  download
```

---

## 7. Development Phases

**Total estimate: 6–8 weeks at 10–20 hours/week.**

### Phase 1 — Foundation (Weeks 1–2, ~20–30 hrs)
- Next.js project scaffold with TypeScript, Tailwind, shadcn/ui
- Define `types/index.ts` — the `Resume` type and other shared interfaces
- Build `InputPanel.tsx` — two textareas with validation
- Wire up basic Anthropic SDK call in `/api/generate` (hardcoded test prompt first)
- Confirm streamed response renders in the UI

### Phase 2 — AI content generation (Weeks 3–4, ~30–40 hrs)
- Prompt engineering for resume generation — the core work of the project
  - Extract keywords from the JD verbatim
  - Match against candidate background
  - Output structured JSON matching the `Resume` type
  - Budget 20%+ of this phase on iteration
- Cover letter prompt — separate call, tone options, under 400 words
- `OutputPanel.tsx` with inline editing

### Phase 3 — ATS scoring + export (Weeks 5–6, ~25–35 hrs)
- `/api/ats` — Claude extracts top 15–20 JD keywords, checks resume coverage, returns score + gap list
- `ATSScore.tsx` — visual score display with missing keywords highlighted
- PDF export via `@react-pdf/renderer` — define one clean `ResumeDocument` component
- DOCX export via `/api/export/docx` + `lib/docx.ts`
- ⚠️ PDF styling is the highest-risk task in this phase — budget extra time

### Phase 4 — Polish + launch (Weeks 7–8, ~15–20 hrs)
- Loading states, streaming feedback, error handling, toast notifications
- Mobile responsiveness
- Landing page — one-page pitch with a screenshot and CTA
- Deploy to Vercel; set `ANTHROPIC_API_KEY` in environment settings
- Add rate limiting before opening to other users

---

## 8. CI/CD Setup (GitHub Actions)

Three automated workflows are configured inside `.github/`.

### Workflow 1 — CI (`ci.yml`)
Runs on every push and on PRs targeting `main`. Blocks merging if any check fails.

| Job | Steps | Teaches |
|---|---|---|
| quality | ESLint → TypeScript check | triggers, jobs, steps, caching |
| build | `npm run build` | `needs:` (job sequencing), secrets |

### Workflow 2 — Security audit (`security.yml`)
Runs on push to `main` and every Monday at 09:00 UTC. Runs `npm audit --audit-level=high`.

Teaches: `schedule:` trigger, cron syntax, multiple event triggers.

### Workflow 3 — Dependabot (`dependabot.yml`)
Not a workflow — a GitHub config file. Tells Dependabot to open weekly PRs for outdated packages, grouped into a single PR for minor/patch updates. Your CI workflow runs automatically on each Dependabot PR.

Teaches: automated dependency management, how CI and Dependabot work together.

### Required one-time setup
Go to: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.
Add `ANTHROPIC_API_KEY` with your actual key. The build job will fail without it.

---

## 9. Cost Estimate

| Item | Cost |
|---|---|
| Vercel (hobby tier) | Free |
| Domain name | ~$12/year |
| Claude API during development (~400 test generations) | ~$12 one-time |
| Claude API for personal use (~5–10 generations/week) | ~$1–3/month |

Each full generation (resume + cover letter + ATS) costs approximately $0.03 on `claude-sonnet-4-6`.

If opened to other users without a paywall, costs scale with traffic. At ~100 users × 3 generations/week, expect ~$40/month. Add a usage cap or switch to `claude-haiku-4-5` (3x cheaper, lower quality) before a public launch.

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Resume output feels generic | High — core value prop | Spend serious time on prompt iteration in Phase 2; test 10+ variations before moving on |
| PDF styling complexity | Medium — `@react-pdf/renderer` has its own layout engine | Define the resume template component early; use Puppeteer as a fallback if needed |
| API key exposed in client code | Critical — security | All Claude calls in API routes only; `.env.local` in `.gitignore`; key set via Vercel dashboard |
| API costs at scale | Low for personal use | Add rate limiting before public launch; consider Haiku if costs grow |

---

## 11. Post-Launch (v2 Ideas)

These are intentionally out of scope for v1. Add only if there's real user demand.

- User accounts and saved resume history (Clerk for auth, Supabase for storage)
- Multiple resume templates
- LinkedIn profile import as background input
- Job board integrations
- Resume version comparison

---

## 12. Quick Reference

| What | Where |
|---|---|
| All prompt templates | `lib/prompts.ts` |
| Shared TypeScript types | `types/index.ts` |
| Claude API client | `lib/anthropic.ts` |
| Main builder page | `app/builder/page.tsx` |
| Generation API route | `app/api/generate/route.ts` |
| ATS scoring route | `app/api/ats/route.ts` |
| DOCX export route | `app/api/export/docx/route.ts` |
| GitHub Actions workflows | `.github/workflows/` |
| Environment variables | `.env.local` (local) / Vercel dashboard (production) |