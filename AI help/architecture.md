# Architecture — Mashriq Restaurant 3D Website

## 1. Tech Stack (solo-friendly, all free/low-cost tiers)

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React (or Next.js if SEO on menu pages matters) | Fast dev loop, huge R3F ecosystem |
| 3D rendering | React Three Fiber + drei | Declarative Three.js in React — far faster for one person than raw Three.js |
| Animation | Framer Motion (2D/DOM) + R3F's `useFrame` (3D) + GSAP ScrollTrigger (scroll-linked sequences) | Framer for glass/neu/clay micro-interactions, GSAP for the antigravity scroll choreography |
| Styling | Tailwind CSS + CSS custom properties for design tokens | Rules.md tokens map directly to Tailwind theme extension |
| State | Zustand (tiny, no boilerplate) | Menu filter state, reservation form state, scene-loaded state |
| Menu data | Static JSON (`/data/menu.json`), hand-transcribed once from the PDFs | No CMS needed for v1; solo dev edits JSON directly |
| Reservation submission | Formspree or EmailJS (no backend) → email to restaurant; optional WhatsApp `wa.me` deep-link as parallel option | Zero backend to build/host/secure |
| Location/Maps | Embedded Google Maps iframe (the existing place ID) + "Get Directions" deep link | No Maps API key/billing needed for a simple embed |
| Hosting | Vercel or Netlify (static/SSR) | Free tier, automatic CDN, instant deploys |
| Image/video CDN | Same host's asset pipeline, or Cloudinary free tier if video transforms needed | Keeps generative media optimized without custom infra |

## 2. Generative Media Pipeline (data flow)

```
[Google Maps photo gallery] ──extract──▶ raw-photos/ (source reference only, not published as-is)
                                              │
[Menu PDFs] ──dish list + descriptions──▶ Whisk prompts (Prompt Suite A) ──▶ generated stills (PNG, 2048×2048 or 16:9)
                                              │
                                    Google Flow (image→video) (Prompt Suite B) ──▶ short MP4 clips (4–6s)
                                              │
                                    EzGIF frame extraction (Prompt Suite D) ──▶ keyframe stills (fallback + poster images)
                                              │
                              optimize (WebP/AVIF stills, WebM+MP4 video, poster frame) ──▶ /public/media/
                                              │
                                    referenced by design.md components
```

- **Maps photo extraction is reference-only** — used to verify real ambiance/interior cues (lighting, seating style, signage color) that inform Whisk prompts, not published directly (uncertain licensing/rights on Google-hosted user photos; safer to regenerate original imagery inspired by them).
- Every generated asset gets 3 outputs: full-res still, compressed WebP, and (if animated) an MP4 + WebM pair with a static poster frame for slow connections.

## 3. Design Language — Technical Implementation

**Glassmorphism**
```css
.glass-panel {
  background: rgba(255, 250, 245, 0.12);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```
Used on: nav bar, hero overlay cards, reservation modal backdrop.

**Neumorphism**
```css
.neu-button {
  background: var(--clr-cream);
  box-shadow: 6px 6px 12px rgba(74, 46, 34, 0.15),
              -6px -6px 12px rgba(255, 255, 255, 0.7);
  border-radius: 16px;
}
.neu-button:active {
  box-shadow: inset 4px 4px 8px rgba(74, 46, 34, 0.15),
              inset -4px -4px 8px rgba(255, 255, 255, 0.7);
}
```
Used on: CTA buttons, menu category filter chips, reservation form inputs.

**Claymorphism**
```css
.clay-card {
  border-radius: 32px;
  background: linear-gradient(145deg, var(--clr-clay-light), var(--clr-clay-base));
  box-shadow: 8px 8px 24px rgba(74, 46, 34, 0.2),
              -4px -4px 16px rgba(255, 255, 255, 0.5);
}
```
Used on: menu item cards, signature dish spotlight, about-us tiles.

**3D shader/material notes:** for R3F elements (floating dish models or image planes), approximate clay/glass via `MeshPhysicalMaterial` (roughness ~0.3, clearcoat for glass surfaces, transmission for true glass panels) rather than hand-written GLSL — a solo timeline does not support custom shader authoring for a first launch. Reserve custom shaders only for the hero background (a single simple gradient/noise fragment shader is fine and high-impact).

## 4. Performance Budget (solo-executor reality check)

| Budget | Target | Fallback if exceeded |
|---|---|---|
| Total JS (gzipped) | < 350KB | Lazy-load R3F scene, code-split menu/reservation routes |
| Hero video | < 3MB per clip, WebM primary / MP4 fallback | Poster image only on `prefers-reduced-data` or slow connection detection |
| 3D scene draw calls | < 50 | Merge geometries, instance repeated elements (floating dish shots) |
| Time to Interactive | < 3.5s on 4G | Defer 3D scene mount until after LCP text/CTA render |
| Device tier fallback | GPU-tier detection (e.g. `detect-gpu` package) | On low-tier: swap R3F hero for a static parallax CSS/Framer Motion hero using the same generated imagery |

## 5. Data Flow Summary
- Menu JSON is the single source of truth, structured as:
```json
{
  "category": "Mashriq Arabic - Signatures",
  "items": [
    { "name": "Mashriq Chicken Mandi", "desc": "Slow-cooked spiced chicken over fragrant mandi rice...", "price": 2299, "signature": true, "image": "/media/chicken-mandi.webp" }
  ]
}
```
- Reservation form → validated client-side (Zustand + simple schema) → POST to Formspree/EmailJS → success state → optional WhatsApp confirmation link.
- No user auth, no database — deliberately, to keep this shippable solo.
