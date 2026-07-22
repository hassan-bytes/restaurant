# Memory — AI Reference & Continuity

This is the anchor document. If you (or a future AI session) are picking this project back up, read this first — it explains *why*, not just *what*.

## Ground-Truth Facts (do not drift from these)
- **Restaurant:** Mashriq Restaurant, "by Ahmad" — GT Road, Small Industry Estate, Gujrat, Punjab (near Kunjah). **Not Lahore** — an earlier framing of this brief incorrectly said Lahore; the actual Google Maps pin resolves to Gujrat's GT Road corridor. Every cultural/architectural reference should be grounded in GT Road/Gujrat, not Lahore.
- **Cuisine:** Arabic/Lebanese + Pakistani + continental/pan-Asian/pizza-pasta — a broad, high-volume family-dining menu, not a boutique single-cuisine concept.
- **Price tier:** Mid-range/accessible (Rs. 149 naan to Rs. 4,999 family platter). The 3D treatment should feel modern and considered, never exclusive or fine-dining-coded.
- **Brand voice (verbatim from the menu's own About Us):** "MASHRIQ, meaning the East, is a celebration of warmth, hospitality, and flavours that bring people together." Family- and friend-oriented, honest ingredients, generous portions.
- **Signatures called out by the restaurant itself:** Mashriq Royal Platter, Mashriq Chicken Mandi, Steamed Mutton Shank, Lamb Rosh, Hummus Bil Dajaj, Mashriq Special Kunafa — plus per-section SIGNATURE tags (Chicken Shish Taouk, Mashriq Summer Salad, Mashriq 19-B Soup, Smoked Chicken Tagliatelle, Mashriq Special Pizza).
- **A second, unrelated brand ("Créme by Ahmad," a café/coffee-and-desserts concept) was included in the uploaded files but is a separate business and is out of scope for this website** unless explicitly requested later.

## Design Philosophy — Why Glass + Neu + Clay
- **Glass** = the transactional/navigational layer (nav, panels, modals) — communicates clarity and "current focus."
- **Neumorphism** = the tactile/pressable layer (buttons, inputs, chips) — communicates "you can act here," which matters because reservation conversion is a primary goal.
- **Claymorphism** = the content/food layer (menu cards, about tiles) — organic, soft, appetite-appropriate; food should feel touchable and warm, not cold/glassy.
- They coexist by role, not by competing for the same surface — see rules.md §6 for the exact map. This is the single most important idea to preserve across iterations: **don't let all three styles bleed into one surface at once**, or the "intentional synthesis" becomes visual noise.

## Generative Media Workflow — Quick Reference
1. Maps photo gallery → reference-only (ambiance/color/material cues), never published directly (rights uncertain).
2. Whisk → original stills for hero, signature dishes, atmosphere (Prompt Suite A).
3. Google Flow → animates the 1–2 highest-impact stills only (hero bg, one signature reveal) — this is expensive in time, budget it last (Prompt Suite B).
4. EzGIF → extracts poster frames/fallback stills from Flow output for performance/accessibility fallback (Prompt Suite D).
5. Everything gets compressed to WebP/AVIF + WebM/MP4 pairs before going in `/public/media/`.

## Key Technical Decisions & Rationale
- **No backend/database for v1.** Reservation form posts to Formspree/EmailJS; menu is static JSON. This is the single biggest lever for solo-timeline feasibility — resist the urge to add a CMS or booking backend until there's real traffic justifying it.
- **R3F over raw Three.js.** Declarative React patterns let one person iterate on the 3D scene at the same speed as the rest of the UI, instead of context-switching into imperative Three.js code.
- **3 parallax layers max, GPU-tier fallback to static hero.** Chosen because GT Road's audience is majority mobile on variable-quality connections — a beautiful desktop-only experience that fails on a mid-tier Android phone fails the actual audience.

## Timeline Reality Check
~4 solo weeks assumed (phases.md). The generative media pipeline (Whisk → Flow → EzGIF) is the most time-elastic part of the project — it can be scaled from "3 hero assets" to "full dish photography replacement" depending on how much runway is actually available. Default to the smaller scope and expand only if ahead of schedule.

## Constraints to Never Relitigate
- Menu data must match the two PDFs exactly (dish names, descriptions, prices) — this is a real business, real prices, real customers checking against what they saw last time they dined in.
- Never reference "Lahore" in copy or metadata — it's factually wrong and would confuse local search/SEO for a GT Road, Gujrat business.
- Never let Créme (the café brand) content bleed into Mashriq's site unless the user explicitly asks for a combined multi-brand site.
