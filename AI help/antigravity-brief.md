# Antigravity Kickoff Brief — Mashriq Restaurant 3D Website

Paste this as your opening mission to a Google Antigravity agent. It references the companion spec files (PRD.md, architecture.md, rules.md, phases.md, design.md, memory.md, prompts.md) — keep all seven in the project root so the agent's knowledge base can index them.

---

## Mission Statement (paste into Antigravity)

> Build a fully responsive, non-generic 3D website for Mashriq Restaurant, a real Arabic-Lebanese-and-Pakistani family restaurant on GT Road, Gujrat, Pakistan. Read `/memory.md` first for ground-truth brand facts — do not deviate from them (especially: the restaurant is in Gujrat, not Lahore; do not invent menu items not present in `/data/menu.json`).
>
> Design system: synthesize glassmorphism, neumorphism, and claymorphism per the exact rules in `/rules.md` — do not default to a generic Tailwind/shadcn look. Follow the color tokens, shadow specs, and design-language coexistence map exactly.
>
> Build order: follow `/phases.md` phase-by-phase. Do not skip ahead to motion polish (Phase 3) before content/data (Phase 2) is real. Confirm with me before starting each new phase.
>
> Reference `/design.md` for exact section-by-section layout and micro-interaction specs, and `/architecture.md` for the tech stack (Vite + React + R3F + Tailwind + Framer Motion/GSAP + Zustand, no backend/database for v1).
>
> A working reference prototype (glass/neu/clay applied to hero, menu explorer, reservation form) is at `/prototype.html` — treat its color tokens and component patterns as the visual baseline, then extend into the full 3D scene per architecture.md.

---

## Recommended Antigravity Task Breakdown
Antigravity works best when given discrete, verifiable tasks with clear artifacts (screenshots/walkthroughs) rather than one giant instruction. Feed it phases.md in this order, one task per agent run:

1. **Task 1 — Scaffold:** "Set up the Vite+React+Tailwind+R3F project per architecture.md §1, wire the design tokens from rules.md §1 into the Tailwind theme, transcribe `/data/menu.json` from the menu content in PRD.md §1." → verify artifact: repo builds, empty scene renders.
2. **Task 2 — Design system components:** "Build the Glass/Neu/Clay base components (Button, Card, Panel, Chip) exactly per rules.md §3–6." → verify artifact: Storybook-style page or screenshot showing all four states.
3. **Task 3 — Page skeleton:** "Build the six sections per design.md (Hero, About, Menu Explorer, Reservation, Location, Footer) using the base components, no motion yet." → verify artifact: full-page screenshot.
4. **Task 4 — Content wiring:** "Wire menu.json into Menu Explorer; placeholder imagery until Whisk/Flow assets are generated (see prompts.md)." → verify artifact: menu renders all categories correctly with correct prices.
5. **Task 5 — Motion:** "Implement antigravity float, scroll entrances, and hover states per rules.md §7 and prompts.md §F." → verify artifact: screen recording of scroll-through.
6. **Task 6 — Reservation flow:** "Wire the reservation form to Formspree/EmailJS per architecture.md §5, add WhatsApp deep-link fallback." → verify artifact: successful test submission.
7. **Task 7 — Performance & accessibility pass:** "Run Lighthouse against architecture.md §4 budget, fix the largest offender first; verify reduced-motion and keyboard nav." → verify artifact: Lighthouse report + before/after.

## Guardrails for the Agent
- Never let it invent menu items, prices, or restaurant claims not present in the source files — this is a real business.
- Never let it default to purple gradients, uniform 8px-radius cards, or Inter font — that's the generic AI-slop look the brand explicitly avoids (rules.md is the antidote).
- Have it stop and show you an artifact (screenshot/recording) at the end of every task above before proceeding to the next — this is exactly the Antigravity "Manager surface" workflow, use it.
- If the agent proposes adding a backend/database/CMS, push back — v1 is explicitly backend-free per architecture.md §5 and memory.md's "key technical decisions."

## What to Feed Its Knowledge Base
Antigravity treats learned context as a durable asset — dump these into its knowledge base up front so future tasks in the same project inherit them without re-explaining:
- The full contents of `/rules.md` (design tokens + coexistence map) — this is the single highest-leverage file to keep "hot" in agent memory.
- The corrected location fact from `/memory.md` (Gujrat, not Lahore).
- The menu.json schema from architecture.md §5.
