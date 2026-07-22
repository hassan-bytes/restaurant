# Phases — Implementation Roadmap (Solo, Tight Timeline)

Assumes ~4 working weeks at a sustainable solo pace (adjust ratios if your real window is shorter/longer — the *sequence and dependency order* stays the same regardless of total duration).

## Phase 0 — Setup (0.5 day)
- Repo scaffold (Vite/Next + Tailwind + R3F installed), Vercel/Netlify project linked, design tokens from rules.md dropped into `tailwind.config` and CSS variables.
- Transcribe menu PDFs into `/data/menu.json` (this is the single most important non-glamorous task — do it before any visual work so every later component has real data to render against, not lorem ipsum).

## Phase 1 — Foundation (Days 1–5)
**Goal:** basic 3D scene mounts, design system components exist, core layout is navigable.
- Set up R3F canvas + camera rig, one placeholder floating plane to validate the pipeline works end-to-end.
- Build the glass/neu/clay base components (Button, Card, Panel, Chip) per rules.md — these get reused everywhere, so get them right once.
- Build page skeleton: Hero, About, Menu Explorer (empty state), Reservation, Location, Footer — routing/scroll structure in place.
- **Dependency:** none blocks this; can start immediately.
- **Effort estimate:** 4–5 days.

## Phase 2 — Content Integration (Days 6–12)
**Goal:** real menu data, real generated imagery, video assets in place.
1. **Google Maps image extraction** (0.5 day) — see Prompt Suite C. Screenshot/save the Maps photo gallery (Street View, uploaded customer/owner photos) as reference-only source images. Organize into `/reference/maps-photos/{exterior, interior, food, signage}/`. These are for informing Whisk prompts (ambiance, color, seating style), **not published directly**.
2. **Whisk image generation** (2 days) — run Prompt Suite A for hero imagery, 6–8 signature dish shots, 2–3 atmospheric textures. Export at 2048px, organize into `/reference/generated-stills/`.
3. **Google Flow video synthesis** (1.5 days) — run Prompt Suite B on the 2–3 highest-impact stills (hero background, one signature dish reveal). Do not video-ify every dish — that's a should-have/could-have tradeoff, not a must-have.
4. **EzGIF frame extraction** (0.5 day) — run Prompt Suite D on each video to get poster frames + fallback stills.
5. **Asset optimization pass** (0.5 day) — convert everything to WebP/AVIF + WebM/MP4 pairs, drop into `/public/media/`.
6. **Wire menu data into Menu Explorer component**, wire imagery into Hero/Signature Spotlight.
- **Dependency:** requires Phase 1 components to exist (nothing to wire imagery into otherwise).
- **Effort estimate:** 6–7 days total across the sub-steps above.

## Phase 3 — Motion & Interaction (Days 13–18)
**Goal:** antigravity physics, transitions, scroll triggers — the "non-generic" layer.
- Implement float/parallax per rules.md (§7) on hero and menu cards.
- GSAP ScrollTrigger sequences for section entrances.
- Hover/press micro-interactions on all neumorphic buttons and clay cards.
- Reservation form: validation, submit-to-Formspree/EmailJS wiring, success/error states, WhatsApp deep-link fallback.
- Reduced-motion and low-GPU-tier fallback paths implemented and tested (not an afterthought — test this in Phase 3, not Phase 4, since it changes component structure).
- **Dependency:** requires real content from Phase 2 (motion tuning on placeholder assets wastes time re-tuning later).
- **Effort estimate:** 5–6 days.

## Phase 4 — Optimization, Testing, Deployment (Days 19–22)
- Lighthouse pass against the performance budget (architecture.md §4); address the biggest offender first (usually hero video weight or JS bundle size).
- Cross-browser/device smoke test: iOS Safari, Android Chrome (this audience skews mobile), one low-tier Android device if available.
- Accessibility pass: keyboard nav through reservation form, alt text audit on all generative images, contrast spot-check.
- Content proofread against the menu PDFs one more time (prices are the thing users will notice being wrong).
- Deploy to production domain, submit to Google Search Console, verify the embedded map/place ID is correct.
- **Effort estimate:** 3–4 days.

## Total: ~19–22 working days (roughly 4 weeks solo)

## Where to Cut First If Timeline Shrinks
1. Drop Google Flow video entirely → ship with Whisk stills + CSS-driven parallax motion (still non-generic, dramatically less time).
2. Reduce Whisk generation from 8 dish shots to 3 (hero + top 2 signatures).
3. Simplify Phase 3 to fade/slide transitions only, skip full antigravity float choreography.
4. Never cut: Phase 0 menu JSON accuracy, Phase 2 step 6 (wiring real content), Phase 4 accessibility/mobile testing, or the reservation flow.
