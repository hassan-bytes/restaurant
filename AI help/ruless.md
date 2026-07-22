# Mashriq Restaurant - Website Development Rules

## Project Context
Build a premium, modern, and interactive single-page landing application for "Mashriq Restaurant" and its sub-brand "Crème by Ahmad". The objective is to create an ultra-luxurious, commercial-grade website featuring a cinematic video intro, gold logo reveal, and smooth parallax pseudo-3D scrolling layers.

## Tech Stack Requirements
* Framework: React (Next.js preferred for asset optimization).
* Styling: Tailwind CSS for layout, glassmorphism, and utility classes.
* Animation Engine: GSAP (ScrollTrigger) and Framer Motion for smooth transitions.
* AI Integration: Implement a modular chat/voice interface for an AI Dining Assistant.

## Global Design System & Assets
* Color Palette: Deep Charcoal/Black (#0F0F0F to #1A1A1A) and Royal Gold (#D4AF37).
* Typography: Modern serif for headings, clean sans-serif for body copy.
* Asset Inventory:
  * Logos: `mlogo1.jpg` (textured background logo), `mlogo2.jpg` (transparent gold vector/cutout text).
  * Video Intro/Hero: Generated cinematic restaurant transition video.
  * Base Backgrounds: `image_620e56.png` (Exterior/Garden), `image_620e5b.png` & `image_620e5d.png` (Interior dining), `image_620e75.png`, `image_620e79.png` (Garden cabanas), `image_620e95.png` (Outdoor seating).
  * Cutout Assets: Transparent PNG food items (`dish4e.jpg`, `dish23.jpg`, `dishes.jpg`, `dishe3.jpg`, `shake.jpg`) for floating parallax effects.

## Component Architecture & Flow

### 1. Cinematic Intro & Pre-loader
* **Logo & Welcome Animation:** Display `mlogo1.jpg` or `mlogo2.jpg` centered with a luxury gold glow effect on a deep black background. 
* Implement a smooth entry animation (fade-in and scale-up) accompanied by a welcoming message.
* After 2.5 seconds, slide up the intro curtain to reveal the main website.

### 2. Cinematic Hero Section (Video Background)
* Play the generated cinematic restaurant background video loop (`autoplay loop muted playsinline`).
* Layer a dark translucent overlay (`bg-black/50`) to maintain elite readability.
* Center a floating, glowing version of `mlogo2.jpg` over the video.

### 3. Signature Culinary Showcase (Pseudo-3D Parallax)
* Transition smoothly from the video into a solid dark layout.
* Implement **Z-pattern scrolling** utilizing the prepped cutout PNG dishes (`dish23.jpg`, `dish4e.jpg`, etc.).
* Enforce continuous, subtle floating animations (`y-axis` up-down movement) on all cutout dishes to create a tactile 3D depth illusion during scrolling.

### 4. Ambiance & Lounge Sections (Sticky Layouts)
* Pin interior images like `image_620e5b.png` and garden views like `image_620e79.png` as sticky backgrounds.
* Slide glassmorphic cards (frosted glass blur) over them to highlight spaces like "Crème by Ahmad" and the outdoor private cabanas.

### 5. Smart AI Dining Assistant & Reservation
* Set `image_620e5b.png` (dining setup) with a heavy blur effect as the section backdrop.
* Build a responsive, interactive chat UI where users can query menu specifics or simulate table reservations via natural language inputs.