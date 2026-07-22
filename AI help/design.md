# Design — Visual & Interaction Specifications

## 1. Hero Section
**Layout:** Full-viewport 3D scene. Foreground: glass panel (bottom-left on desktop, bottom-center on mobile) containing the wordmark treatment ("Mashriq" script echo), tagline ("Every Meal, EVERY FLAVOUR"), and two neumorphic CTAs — "Reserve a Table" (primary, gold accent) and "See the Menu" (secondary).
**3D content:** 1–2 floating generative dish images (Chicken Mandi, Mixed Grill Platter) rendered as slightly-tilted image planes with clay-style rounded-corner geometry, antigravity float applied. Background: Google Flow ambient video loop (warm steam/smoke drift or slow charcoal-grill glow) OR a shader-driven warm gradient if video is cut for time.
**Motion:** on load, floating dishes fade+rise in staggered (rules.md §7); on scroll, hero content parallax-recedes (0.5x) while the fixed nav (glass) stays locked.
**Generative media integration:** hero background = Prompt Suite B output #1; floating dish planes = Prompt Suite A outputs.
**Micro-interaction:** cursor-follow subtle tilt on the floating dish planes (desktop only, disabled on touch).

## 2. About Section
**Layout:** Two-column on desktop (generative atmospheric image left, copy right on a clay-block background), single column stacked on mobile.
**Copy source:** menu's own About Us text — "MASHRIQ, meaning the East, is a celebration of warmth, hospitality, and flavours that bring people together..." (reuse verbatim/near-verbatim — it's already good, on-brand copy).
**Motion:** scroll-triggered fade+rise entrance, image has a slow Ken-Burns-style micro-zoom (4% over 8s) for subtle life without being an animation showpiece.

## 3. Menu Explorer
**Layout:** Sticky glass filter bar (category chips: Signatures, Starters, Salads, Soups, Grill-Kebabs, Grill-Boti, Grill-Bones, Arabic Signatures, Karahi, Handi, Continental, Pan-Asian, Pasta, Pizza, Breads, Sides) above a responsive grid of clay cards (3-col desktop / 2-col tablet / 1-col mobile).
**Card anatomy:** generative or extracted dish image (top, rounded per clay radius) → dish name (brown-900, semibold) → short description (brown-700) → price (semibold, distinct from accent colors) → "Signature" gold badge if applicable (pulled from the menu's own SIGNATURE tags — Hummus Bil Dajaj, Chicken Shish Taouk, Chicken Mandi, Smoked Chicken Tagliatelle, Mashriq Special Pizza, etc.).
**Hover state (desktop):** card lifts 8px, shadow expands, image micro-zooms 6%, neumorphic "Add to favorites/wishlist" icon fades in top-right (optional should-have, non-transactional — just a save-for-later, no account needed, stored in localStorage).
**Tap state (mobile):** card taps open a glass modal with full description, larger image, and a "Call to Order" / WhatsApp CTA.
**Data-priority build order:** ship Signatures + Grill + Arabic categories first (highest brand-defining items), Continental/Pan-Asian/Pasta/Pizza can follow in a second content pass if timeline is tight — they're real menu sections but less differentiating than the Arabic/grill core.

## 4. Reservation Section
**Layout:** Centered glass panel over a blurred generative ambiance background (dim dining room glow). Form fields on neumorphic inputs: Name, Phone, Party Size (stepper), Date, Time, Notes (optional).
**Motion:** panel scale+fade in on scroll into view; field focus state = neumorphic inset deepens slightly (tactile "pressed" feedback).
**Submit flow:** primary neumorphic gold button → loading state (subtle pulse) → success state (glass checkmark card: "We've received your request — we'll confirm by phone shortly") or error state with retry.
**Secondary path:** a visible "Prefer WhatsApp?" link/button beside the form, `wa.me` deep link pre-filled with a template message — GT Road audiences often prefer WhatsApp confirmation over forms.

## 5. Location Section
**Layout:** Embedded Google Maps (place ID from the provided link) in a clay-framed container, address + "on GT Road, Gujrat" landmark copy beside it, hours list, tap-to-call button, "Get Directions" button (deep-links to the Maps place).
**Motion:** minimal — this section is utility-first, don't over-animate it (accessibility + "I just need the address" pragmatism).

## 6. Footer
**Layout:** Clay block, full-width. Social icons (glass circular buttons) linking Facebook (confirmed active, 22.5k likes) and Instagram if available. Quick links (Menu, Reserve, Location). Copyright + "by Ahmad" nod matching the menu's own sub-branding.

## 7. Key Micro-Interactions Summary
| Element | Interaction | Feedback |
|---|---|---|
| Nav glass bar | scroll past hero | blur intensifies, background opacity increases slightly |
| CTA buttons | hover | neumorphic shadow tightens, 2px lift |
| CTA buttons | press | inset shadow (per rules.md §4) |
| Menu category chip | select | neumorphic pressed state, active chip gets gold underline |
| Menu card | hover | lift + image zoom (desktop only) |
| Reservation input | focus | inset shadow deepens, border glows terracotta |
| Floating hero dishes | idle | antigravity float loop |
| Floating hero dishes | cursor proximity (desktop) | subtle tilt toward cursor |

## 8. High-Impact, Low-Effort Priority (for the solo timeline)
Rank order of what earns the most "wow" per hour invested:
1. Menu card clay+neumorphic hover (cheap, touched constantly, high perceived polish)
2. Hero glass panel + antigravity floating dish images (the single most "non-generic" visual signature)
3. Scroll entrance choreography (GSAP ScrollTrigger fade+rise) — reusable pattern across every section, not custom per-section
4. Reservation form neumorphic tactile feedback (small but this is the conversion moment)
5. (Lower priority) Google Flow video backgrounds — highest visual ceiling but highest time cost; do this last, and only if Phases 1–3 finished early
