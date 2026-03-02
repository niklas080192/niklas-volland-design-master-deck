

# Slide Deck Upgrade -- "Next Level"

Hier sind konkrete Ideen, die das Deck nochmal deutlich aufwerten:

## 1. Animated Glow Line am oberen Rand
Eine subtile, animierte Linie mit dem Brand-Gradient, die langsam von links nach rechts schimmert -- auf jeder Slide oben. Gibt einen Premium-Tech-SaaS-Feel (wie bei Linear, Vercel).

## 2. Noise/Grain Texture Overlay
Ein kaum sichtbares Noise-Overlay (CSS-generiert, kein Bild noetig) auf dem dunklen Hintergrund. Gibt Tiefe und verhindert "flat screen"-Look. Sehr subtil (opacity ~3-5%).

## 3. Glassmorphism-Elemente
Die Pills und Cards (Stats, TwoColumn) bekommen einen leichten `backdrop-blur` + semi-transparenten Hintergrund statt solidem `bg-slide-surface`. Wirkt moderner und layered.

## 4. Subtle Glow-Effekte
- Gradient-Glow hinter dem Logo auf Title/Closing Slide
- Sanfter roter Glow hinter den grossen Zahlen auf dem Stats-Slide
- Macht die Slides "lebendiger"

## 5. Progress Bar
Eine duenne Gradient-Linie ganz unten auf jeder Slide, die den Fortschritt im Deck zeigt (z.B. Slide 3/8 = 37.5% Breite). Nutzt den Brand-Gradient.

## 6. Staggered Entrance Animations
Slide-Inhalte (Titel, Bullets, Cards) erscheinen nacheinander mit leichtem Delay statt alle gleichzeitig. Gibt einen professionellen "Reveal"-Effekt.

---

## Technische Umsetzung

### Dateien die erstellt/geaendert werden:

**src/index.css** -- Noise-Texture als CSS-Pattern und Glow-Line Keyframe-Animation hinzufuegen

**src/components/slides/SlideLayout.tsx** -- Noise-Overlay und animierte Glow-Line integrieren, optionale Progress-Bar

**src/components/slides/TitleSlide.tsx** -- Logo-Glow, staggered Entrance via framer-motion

**src/components/slides/ClosingSlide.tsx** -- Logo-Glow hinzufuegen

**src/components/slides/StatsSlide.tsx** -- Glassmorphism Cards, Glow hinter Zahlen, staggered Entrance

**src/components/slides/ContentSlide.tsx** -- Staggered Bullet Entrance

**src/components/slides/TwoColumnSlide.tsx** -- Glassmorphism Cards

**src/components/slides/SectionSlide.tsx** -- Staggered Entrance

**src/components/slides/QuoteSlide.tsx** -- Subtle Glow hinter Anfuehrungszeichen

**src/components/slides/ImageTextSlide.tsx** -- Glassmorphism Image-Container

### Details:

- **Glow Line**: CSS `@keyframes` Animation, ein 200px breiter Gradient-Streifen der in 4s ueber die volle Breite gleitet, `infinite` loop
- **Noise**: CSS `background-image` mit kleinem SVG-basierten Noise-Pattern, ~3% opacity
- **Glassmorphism**: `bg-white/5 backdrop-blur-md border border-white/10` statt `bg-slide-surface`
- **Staggered Animations**: framer-motion `variants` mit `staggerChildren: 0.1` auf Container, `fadeUp` auf Kinder
- **Progress Bar**: Berechnung via Props (`slideIndex` und `totalSlides`) in SlideLayout, Gradient-Linie mit dynamischer Breite
