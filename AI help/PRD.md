# PRD — Mashriq Restaurant 3D Website

## 1. Context (corrected)
- **Restaurant:** Mashriq Restaurant ("by Ahmad") — Small Industry Estate, GT Road, Gujrat, Punjab (Kunjah-adjacent corridor). *Not Lahore* — the maps pin resolves to Gujrat's GT Road industrial/commercial belt, a major arterial road between Lahore and Islamabad with heavy through-traffic (families, business travelers, wedding parties).
- **Facebook presence:** 22,500+ likes, self-described as "Arabic, Lebanese and Pakistani cuisine."
- **Cuisine identity:** Not a niche Arabic restaurant — it's a broad, high-volume, family-dining menu: Arabic/Lebanese signatures (mandi, shawarma, kebabs, hummus) sit alongside desi karahi/handi, continental (cordon bleu, parmigiana), pan-Asian stir-fry, pasta, and Neapolitan/deep-pan pizza. This is a "something for everyone" GT Road destination, not a boutique Levantine spot.
- **Price tier:** Mid-range, accessible. Naan Rs. 149–649, mains Rs. 999–2,999, family platter Rs. 4,999. This is affordable, generous, crowd-pleasing food — not fine dining. The 3D/glass-neu-clay treatment should read as *elevated and modern*, not *expensive and exclusive*.
- **Brand voice (from menu "About Us"):** warmth, hospitality, "flavours that bring people together," honest ingredients, families and friends, generosity. Tagline: "Every Meal, EVERY FLAVOUR."

## 2. Core Value Proposition
Mashriq's website should feel like the physical warmth of the restaurant translated into a modern, tactile digital space — a place that signals "we take this seriously" (justifying the 3D/motion investment) while staying approachable to a GT Road family audience deciding where to eat tonight or book a platter for a gathering.

**One-line positioning:** *"Eastern warmth, modern craft — discover Mashriq's signature flavours and reserve your table in a space as considered as the food."*

## 3. Primary Goal & Constraint
- **Goal:** Balance brand storytelling (immersive, sensory, memorable) with transactional utility (reservations, and optionally online ordering/inquiry).
- **Constraint:** Solo developer, tight timeline. Every decision below is filtered through "can one person ship this alone, well, in weeks not months."

## 4. User Journeys
1. **Discovery → Trust:** Land on hero → get an immediate sense of cuisine + mood (imagery, motion) → scroll into "About" (the East, warmth, hospitality) → convinced this is a legitimate, well-run place worth visiting.
2. **Menu Browsing → Craving:** Explore menu by category (Signatures, Grill, Arabic, Karahi, Continental, Pan-Asian, Pizza, Pasta) → see prices clearly (this audience is price-aware) → identify 2–3 dishes they want.
3. **Reservation / Ordering → Conversion:** Reserve a table for a party size + date/time (form → WhatsApp/email, no complex backend needed for v1) OR tap "Order via WhatsApp/phone" for takeaway. Full e-commerce cart/checkout is explicitly **out of scope for v1** — see Feature Prioritization.
4. **Location / Logistics:** Find the restaurant on GT Road, see hours, tap-to-call, tap-to-navigate (embedded map or deep link to Google Maps).

## 5. Feature Prioritization (MoSCoW, tuned for solo + tight timeline)

**Must-have (v1 ships without these = incomplete):**
- 3D hero with brand imagery + signature dish visuals, glass/neu/clay design system applied consistently
- Menu explorer covering all real menu categories, with prices, signature-dish badges, and correct data (no placeholder dishes)
- Reservation form (name, phone, party size, date/time, notes) submitting via a no-backend service (Formspree/EmailJS/WhatsApp deep link)
- Location section: address, GT Road landmark description, embedded map, tap-to-call, hours
- Mobile-first responsive behavior (majority of GT Road traffic is mobile)
- Performance fallback: static imagery + no 3D on low-end devices / reduced-motion preference

**Should-have (do if timeline allows):**
- Google Flow-generated ambient video loops in hero/section backgrounds
- Scroll-triggered antigravity motion on menu cards
- "Mashriq Signatures" spotlight carousel (Royal Platter, Chicken Mandi, Mutton Shank, Lamb Rosh, Hummus Bil Dajaj, Special Kunafa)

**Could-have (defer to v2 without guilt):**
- Full online ordering with cart + payment
- Table availability calendar / real-time booking system
- Multi-language toggle (Urdu/English)
- User reviews/testimonials module

**Won't-have (explicitly out of scope):**
- User accounts / loyalty program
- CMS-driven menu editing (menu is static JSON for v1; editing means a code change)
- Native app

## 6. Success Metrics
- Reservation form submissions / week (primary conversion metric)
- Menu section engagement (scroll depth, category taps) — proxy for "did the food sell itself"
- Mobile Lighthouse Performance score ≥ 75 on a mid-tier Android device profile (see architecture.md for budget)
- Time-to-interactive on hero ≤ 3.5s on 4G
- Bounce rate on hero (did the 3D scene load fast enough to keep people)

## 7. Constraints
- **Performance targets:** LCP < 2.5s, CLS < 0.1, 3D scene degrades gracefully (see architecture.md budget). Pakistan mobile networks skew toward 4G/patchy connectivity — assets must be aggressively compressed.
- **Accessibility baseline:** semantic HTML under the 3D layer, alt text on all generative imagery, reduced-motion media query respected (disables antigravity float + parallax), color contrast checked against the warm terracotta/cream palette (see rules.md), keyboard-navigable reservation form.
- **Browser support:** last 2 versions of Chrome/Safari/Edge/Firefox, iOS Safari (large share of Pakistani mobile users). No IE support.
- **Timeline realism:** Assume 4 solo working weeks at a sustainable pace (see phases.md for the breakdown). If the timeline compresses further, cut in this order: (1) Google Flow video loops → static hero image, (2) antigravity scroll physics → simple fade/slide transitions, (3) claymorphic 3D card depth → flat clay-style CSS cards. Never cut: menu accuracy, reservation flow, mobile responsiveness.
- **3D/Generative media as means, not end:** every 3D or generative element must serve either brand storytelling or conversion — no motion for motion's sake, because that's the first thing a solo dev overspends time on.
