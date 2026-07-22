Yeh rahi aap ki `guide.md` file jo aap ke project directory mein save ho gi. Is guide mein poori website ka **UI/UX architecture, warm natural color palette, typography hierarchy, aur micro-interactions** detail ke sath define kiye gaye hain taake aap ka AI editor exact usi standard ke mutabiq code generate kare.

```markdown
# Mashriq Restaurant — UI/UX Design & Implementation Guide

## 1. Design Philosophy & Vibe
* **Aesthetic Core:** "Warm Luxury & Natural Elegance." 
* **The Atmosphere:** Unlike generic dark/gloomy templates, the website reflects Mashriq's actual physical environment at GT Road, Gujrat — warm beige/cream tones, soft natural lighting, organic terracotta accents, and upscale family hospitality.
* **Tone:** Welcoming, grand yet approachable, family-friendly, and modern.

---

## 2. Color Tokens (Tailwind Extension)
Map these directly into `tailwind.config.js` to ensure brand consistency across all components:

```javascript
colors: {
  creamBg: '#FAF8F5',       // Primary warm background (matches real restaurant walls)
  cardLight: '#FFFFFF',     // Clean soft white for content containers
  espresso: '#2C221E',      // Deep rich brown for luxury headings & primary text
  taupeText: '#6B5E55',     // Muted warm grey for body descriptions & metadata
  royalGold: '#D4AF37',     // Premium accent for badges, prices, and highlights
  terracotta: '#C86D51',    // Warm secondary accent for tags and active states
  glassSurface: 'rgba(250, 248, 245, 0.85)', // Frosted glass backgrounds
}

```

---

## 3. Typography Hierarchy

Typography combines classic eastern royalty styling for headings with razor-sharp modern legibility for UI data and prices.

* **Headings & Brand Titles (`font-serif`):**
* *Font Family:* `"Playfair Display"`, serif
* *H1 Hero:* `font-serif font-bold text-espresso tracking-wide text-4xl md:text-6xl`
* *Section Titles:* `font-serif font-semibold text-espresso text-3xl md:text-4xl`


* **Body Text, UI Elements & Prices (`font-sans`):**
* *Font Family:* `"Plus Jakarta Sans"`, sans-serif
* *Body Copy:* `font-sans text-taupeText text-base leading-relaxed`
* *Menu Item Names:* `font-serif font-semibold text-espresso text-lg`
* *Prices & Badges:* `font-sans font-bold text-royalGold text-base` (Ensures numerical clarity at a glance)



---

## 4. Section-by-Section UI Blueprint

### A. Cinematic Intro & Pre-loader

* **Background:** Solid deep espresso/black (`#0F0F0F`) strictly for the 2-second boot sequence.
* **Animation:** Center-aligned gold logo (`mlogo2.jpg`) with a soft gold radial glow (`animate-pulse`).
* **Transition:** Curtain slides upwards (`translate-y-full` via GSAP/Framer Motion) to reveal the warm cream landing page.

### B. Cinematic Hero Section

* **Background:** The generated cinematic restaurant preview video looping smoothly (`autoplay loop muted playsinline`) with a soft warm amber overlay (`bg-black/30` blended with warm tones).
* **Foreground:** Centered glassmorphic card containing the metallic gold text logo, tagline (*"Every Meal, EVERY FLAVOUR"*), and two tactile CTAs:
1. *Primary Button:* Solid Gold background (`bg-royalGold text-espresso font-bold`) with a subtle neumorphic shadow.
2. *Secondary Button:* Frosted glass outline border (`border border-royalGold/50 text-espresso`).



### C. About Us Section (The Warmth of Mashriq)

* **Layout:** Asymmetric 2-column split on desktop (Image left, Story right).
* **Visuals:** Real restaurant interior/garden photography (`image_620e5b.png`) featuring a subtle Ken-Burns slow zoom effect inside a soft claymorphic frame.
* **Content:** Focuses on family gathering, heritage hospitality, and the unique dining space along the Gujrat GT Road corridor.

### D. Interactive Menu Explorer

* **Category Navigation Bar:** Sticky horizontal glassmorphic chip pills (Signatures, Arabic Mandi, Grill & BBQ, Desi Handi, Continental, Fast Food).
* **Menu Cards Grid:** Light claymorphic cards (`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`).
* **Visual Layering:** Transparent PNG food cutouts (`dish23.jpg`, `dish4e.jpg`) floating slightly above the card surface using an idle floating animation loop. Price tags clearly marked in bold Royal Gold.

### E. Ambiance & Lounge Spotlight (Crème by Ahmad)

* **Layout:** Pinned sticky background utilizing real garden cabana imagery (`image_620e79.png`).
* **Interaction:** As the user scrolls, a frosted glass card (`backdrop-blur-md bg-white/80`) slides over the background, highlighting the premium dessert lounge and outdoor private seating atmosphere.

### F. Smart AI Dining Assistant & Reservation Form

* **Background Wrapper:** Soft blurred restaurant interior aesthetic.
* **Form Inputs:** Neumorphic tactile fields (Name, Party Size, Date, Time). Inputs feature deep inner shadows (`shadow-inner`) and warm terracotta focus rings.
* **Dual Action:** Standard table reservation form submission alongside a prominent **"Instant WhatsApp Booking"** deep-link button (`wa.me`) tailored for regional user behavior.

### G. Location & Footer

* **Layout:** Integrated Google Maps location card (Gujrat GT Road corridor) paired with tap-to-call, operating hours, and Facebook community references (22.5k+ likes counter).

---

## 5. Micro-Interactions & Motion Rules

* **Antigravity Idle Float:** All cutout dish images have a continuous gentle 10–15px up-and-down CSS/Framer motion loop.
* **Tactile Button Press:** Buttons depress visually with an inset shadow effect on click.
* **Scroll Choreography:** Elements fade and rise gracefully via GSAP ScrollTrigger as the user moves down the page.

```Yeh rahi aap ki updated `guide.md` file. Is mein restaurant ke asli soft menu aur Crème cafe menu data ko shamil kar diya gaya hai taake aap ka AI editor inhein interactive 3D/claymorphic menu cards aur categories ke tor par structure kar sake.

```markdown
# Mashriq Restaurant — UI/UX Design & Implementation Guide

## 1. Design Philosophy & Vibe
* **Aesthetic Core:** "Warm Luxury & Natural Elegance." 
* **The Atmosphere:** Reflects Mashriq's actual physical environment at the GT Road corridor in Gujrat — warm cream/beige tones, soft natural lighting, organic terracotta accents, and upscale family hospitality.
* **Tone:** Welcoming, grand yet approachable, family-friendly, and modern.

---

## 2. Color Tokens (Tailwind Extension)
Map these directly into `tailwind.config.js` to ensure brand consistency across all components:

```javascript
colors: {
  creamBg: '#FAF8F5',       // Primary warm background (matches real restaurant walls)
  cardLight: '#FFFFFF',     // Clean soft white for content containers
  espresso: '#2C221E',      // Deep rich brown for luxury headings & primary text
  taupeText: '#6B5E55',     // Muted warm grey for body descriptions & metadata
  royalGold: '#D4AF37',     // Premium accent for badges, prices, and highlights
  terracotta: '#C86D51',    // Warm secondary accent for tags and active states
  glassSurface: 'rgba(250, 248, 245, 0.85)', // Frosted glass backgrounds
}

```

---

## 3. Typography Hierarchy

Typography combines classic eastern royalty styling for headings with razor-sharp modern legibility for UI data and prices.

* **Headings & Brand Titles (`font-serif`):**
* *Font Family:* `"Playfair Display"`, serif
* *H1 Hero:* `font-serif font-bold text-espresso tracking-wide text-4xl md:text-6xl`
* *Section Titles:* `font-serif font-semibold text-espresso text-3xl md:text-4xl`


* **Body Text, UI Elements & Prices (`font-sans`):**
* *Font Family:* `"Plus Jakarta Sans"`, sans-serif
* *Body Copy:* `font-sans text-taupeText text-base leading-relaxed`
* *Menu Item Names:* `font-serif font-semibold text-espresso text-lg`
* *Prices & Badges:* `font-sans font-bold text-royalGold text-base` (Ensures numerical clarity at a glance)



---

## 4. Section-by-Section UI Blueprint

### A. Cinematic Intro & Pre-loader

* **Background:** Solid deep espresso/black (`#0F0F0F`) strictly for the 2-second boot sequence.
* **Animation:** Center-aligned gold logo (`mlogo2.jpg`) with a soft gold radial glow (`animate-pulse`).
* **Transition:** Curtain slides upwards (`translate-y-full`) to reveal the warm cream landing page.

### B. Cinematic Hero Section

* **Background:** The generated cinematic restaurant preview video looping smoothly (`autoplay loop muted playsinline`) with a soft warm amber overlay (`bg-black/30` blended with warm tones).
* **Foreground:** Centered glassmorphic card containing the metallic gold text logo, tagline (*"Every Meal, EVERY FLAVOUR"*), and two tactile CTAs:
1. *Primary Button:* Solid Gold background (`bg-royalGold text-espresso font-bold`) with a subtle neumorphic shadow.
2. *Secondary Button:* Frosted glass outline border (`border border-royalGold/50 text-espresso`).



### C. About Us Section (The Warmth of Mashriq)

* **Layout:** Asymmetric 2-column split on desktop (Image left, Story right).
* **Visuals:** Real restaurant interior/garden photography (`image_620e5b.png`) featuring a subtle Ken-Burns slow zoom effect inside a soft claymorphic frame.
* **Content:** Sourced from the brand's narrative — emphasizing Eastern warmth, hospitality, and meaningful moments shared over food.

### D. Interactive Menu Explorer (Mashriq & Crème Catalogs)

* **Category Navigation Bar:** Sticky horizontal glassmorphic chip pills covering all verified menu sections from both soft launch catalogs:
* *Mashriq Categories:* Signatures (Royal Platter, Chicken Mandi, Lamb Rosh, Hummus Bil Dajaj, Special Kunafa), Starters & Appetizers, Salads, Soups, Grill (Kebabs, Boti, With Bones), Arabic Signatures, Karahi (Chicken & Mutton), Handi, Continental, Pan-Asian, Pasta, Neapolitan & Deep Pan Pizzas, Tandoor Breads, and Sides/Sauces.
* *Crème Cafe Categories:* Signature Coffee, Crème Signature Collection (Gold/Cloud Lattes), Iced Coffee & Frappés, Refreshers & Coolers, Affogatos, and Signature Shakes.


* **3D Clay Cards & Visual Layering:** Clean light claymorphic cards (`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`) showcasing items with precise prices (e.g., Chicken Mandi Rs. 2299, Mixed Grill Platter Rs. 4999).
* **Floating Dish Assets:** Transparent PNG food cutouts (`dish23.jpg`, `dish4e.jpg`, etc.) float slightly above the cards using an idle floating motion loop to create a tactile 3D depth effect.

### E. Ambiance & Lounge Spotlight (Crème by Ahmad)

* **Layout:** Pinned sticky background utilizing real garden cabana imagery (`image_620e79.png`).
* **Interaction:** As the user scrolls, a frosted glass card (`backdrop-blur-md bg-white/80`) slides over the background, highlighting the premium artisan coffee and dessert lounge atmosphere.

### F. Smart AI Dining Assistant & Reservation Form

* **Background Wrapper:** Soft blurred restaurant interior aesthetic (`image_620e5b.png`).
* **Form Inputs:** Neumorphic tactile fields (Name, Party Size, Date, Time). Inputs feature deep inner shadows (`shadow-inner`) and warm terracotta focus rings.
* **Dual Action:** Standard table reservation form alongside a prominent **"Instant WhatsApp Booking"** deep-link button (`wa.me`) tailored for regional user behavior.

### G. Location & Footer

* **Layout:** Integrated Google Maps location card (GT Road, Gujrat corridor) paired with tap-to-call, operating hours, and community references (22.5k+ likes counter).

---

## 5. Micro-Interactions & Motion Rules

* **Antigravity Idle Float:** All cutout dish images have a continuous gentle 10–15px up-and-down CSS/Framer motion loop.
* **Tactile Button Press:** Buttons depress visually with an inset shadow effect on click.
* **Scroll Choreography:** Elements fade and rise gracefully via GSAP ScrollTrigger as the user moves down the page.

```

```

```