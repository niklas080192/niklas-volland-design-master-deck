# Agents.md – Corporate-Design-Präsentationen bauen

> Dieses Dokument enthält alles, was ein AI-Agent braucht, um Präsentationen im Corporate Design von Niklas Volland zu erstellen. Lies es vollständig, bevor du eine Präsentation baust.

---

## 1. Tech-Stack & Architektur

| Technologie | Verwendung |
|---|---|
| React 18 + TypeScript | UI-Framework |
| framer-motion | Alle Animationen (Slide-Einblendungen, Reveal-Steps) |
| Tailwind CSS | Utility-Klassen, aber **Spacing/Sizing immer in absoluten Pixel-Werten** (siehe Regeln) |
| Vite | Build-Tool |

### Feste Auflösung: 1920 × 1080 px

Alle Slides werden in einer fixen 1920×1080-Leinwand gerendert und per `ScaledSlide`-Wrapper skaliert, damit sie in jede Viewport-Größe passen. **Alle Positionierungen und Größen innerhalb einer Slide sind in absoluten Pixelwerten** (z.B. `px-[100px]`, `top-[60px]`, `gap-[40px]`).

### Kernkomponenten

```
src/components/slides/
├── ScaledSlide.tsx       # Skaliert 1920×1080 auf den Container
├── SlideLayout.tsx       # Basis-Layout mit Noise, Progress Bar, Varianten
├── RevealItem.tsx        # Click-to-Reveal-Wrapper
├── TitleSlide.tsx        # Template: Titelfolie
├── SectionSlide.tsx      # Template: Kapitelstart
├── ContentSlide.tsx      # Template: Bullet-Points
├── ImageTextSlide.tsx    # Template: Bild + Text
├── VideoSlide.tsx        # Template: Video-Platzhalter
├── TwoColumnSlide.tsx    # Template: Zwei-Spalten-Vergleich
├── StatsSlide.tsx        # Template: Kennzahlen
├── QuoteSlide.tsx        # Template: Zitat
└── ClosingSlide.tsx      # Template: Abschluss/Danke
```

### Slide-Konfiguration in `src/pages/Index.tsx`

Alle Slides werden als `slideConfigs`-Array konfiguriert:

```tsx
interface SlideConfig {
  key: string;
  totalSteps: number;  // 0 = kein Reveal, alles sofort sichtbar
  render: (props: { slideIndex: number; totalSlides: number; revealStep?: number }) => ReactNode;
}

const slideConfigs: SlideConfig[] = [
  { key: "title",    totalSteps: 0, render: (p) => <TitleSlide {...p} /> },
  { key: "section",  totalSteps: 0, render: (p) => <SectionSlide number="01" title="Mein Kapitel" {...p} /> },
  { key: "content",  totalSteps: 4, render: (p) => <ContentSlide title="Key Points" bullets={[...]} {...p} /> },
  // ...weitere Slides
];
```

**Regeln für neue Präsentationen:**
- Erstelle ein neues `slideConfigs`-Array in `Index.tsx`
- Setze `totalSteps` passend zur Anzahl der Reveal-Elemente (0 = alles sofort)
- Übergib immer `{...p}` um `slideIndex`, `totalSlides` und `revealStep` weiterzureichen

---

## 2. Design Tokens (Farben & Font)

### Font

**DM Sans** – einzige Schriftart, importiert via Google Fonts.

```css
--font-sans: 'DM Sans', system-ui, sans-serif;
```

### Farbsystem (HSL-Werte in CSS Custom Properties)

| Token | HSL-Wert | Beschreibung |
|---|---|---|
| `--slide-bg` | `0 0% 7%` | Fast-Schwarz, Slide-Hintergrund |
| `--slide-fg` | `0 0% 98%` | Fast-Weiß, Haupttext |
| `--slide-muted` | `0 0% 55%` | Grau, Untertitel/Meta-Text |
| `--slide-primary` | `0 100% 45%` | **Rot** – Akzentfarbe Nr. 1 |
| `--slide-secondary` | `43 99% 50%` | **Gold/Gelb** – Akzentfarbe Nr. 2 |
| `--slide-accent` | `0 88% 26%` | **Dunkelrot** – für Accent-Variante |
| `--slide-surface` | `0 0% 12%` | Leicht heller als BG, für Karten/Buttons |

### Gradienten

| Token | Wert |
|---|---|
| `--slide-gradient` | `linear-gradient(135deg, hsl(0 100% 45%), hsl(25 95% 50%), hsl(43 99% 50%))` |
| `--slide-gradient-soft` | `linear-gradient(135deg, hsl(0 60% 80%/0.4), hsl(25 80% 65%/0.5), hsl(43 90% 60%/0.3))` |

### Tailwind-Klassen für Slide-Farben

Verwende die `slide-*` Tailwind-Klassen:

```
text-slide-fg        bg-slide-bg         border-slide-primary
text-slide-muted     bg-slide-surface    text-slide-primary
text-slide-primary   bg-slide-primary
```

### Schriftgrößen (überschrieben in `.slide-content`)

Tailwind-Klassen werden in Slides auf feste Pixelwerte gemappt:

| Klasse | Pixel | Verwendung |
|---|---|---|
| `text-xs`, `text-sm` | 20px | Pills, Meta |
| `text-base` | 24px | Fließtext |
| `text-lg` | 28px | Untertitel |
| `text-xl` | 32px | Stat-Labels, Body |
| `text-2xl` | 40px | Subtitel, Bullets |
| `text-3xl` | 48px | Mittlere Überschriften |
| `text-4xl` | 56px | Zitate |
| `text-5xl` | 72px | Slide-Titel |
| `text-6xl` | 88px | Section-Titel |
| `text-7xl` | 104px | Hero-Titel, Stat-Werte |
| `text-8xl` | 128px | Zitatzeichen |

---

## 3. SlideLayout – Basis-Wrapper

Jede Slide wird in `<SlideLayout>` gewrappt. Es stellt bereit:
- `ScaledSlide` (1920×1080 Skalierung)
- Noise-Texture-Overlay (außer bei `variant="light"`)
- Progress Bar (unten, Gradient, basierend auf `slideIndex/totalSlides`)

### Varianten

```tsx
<SlideLayout variant="dark">    // Schwarzer BG (Standard, 95% aller Slides)
<SlideLayout variant="light">   // Weißer BG, dunkler Text, kein Noise
<SlideLayout variant="accent">  // Dunkelrot-BG
<SlideLayout variant="gradient"> // Rot→Gold-Gradient als BG
```

**Standard ist immer `dark`.** Andere Varianten sparsam einsetzen.

---

## 4. Die 9 Slide-Templates

### 4.1 TitleSlide – Eröffnungsfolie

**Wann nutzen:** Immer als erste Folie.

```tsx
interface TitleSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}
```

**Feste Inhalte (im Template):** Logo oben links, Glassmorphism-Pills oben rechts ("Keynote", "2025"), Haupttitel, Untertitel, Presenter-Name unten links, Accent-Bar unten rechts.

**Visuelle Elemente:** Gradient-Blob (unten rechts), Grid-Overlay, Logo-Glow.

**totalSteps: 0**

---

### 4.2 SectionSlide – Kapitelstart

**Wann nutzen:** Zwischen inhaltlichen Abschnitten als Trenner.

```tsx
interface SectionSlideProps {
  number?: string;     // z.B. "01", "02"
  title?: string;      // Kapitelüberschrift
  subtitle?: string;   // Kurze Beschreibung
  slideIndex?: number;
  totalSlides?: number;
}
```

**Visuelle Elemente:** Vertikale rote Linie links, Gradient-Blob, Grid-Overlay, Glassmorphism-Pill mit "Section XX".

**totalSteps: 0**

---

### 4.3 ContentSlide – Bullet-Points

**Wann nutzen:** Für Aufzählungen, Key Points, Agendapunkte.

```tsx
interface ContentSlideProps {
  title?: string;        // Slide-Titel
  bullets?: string[];    // Array von Textpunkten
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;   // Click-to-Reveal
}
```

**Reveal:** Jeder Bullet ist ein eigener Step. `totalSteps` = Anzahl der Bullets.

**Visuelle Elemente:** Logo oben rechts (gedimmt), Glassmorphism-Pill ("Overview"), nummerierte Bullets mit Glassmorphism-Quadraten, Accent-Bar unten rechts.

---

### 4.4 ImageTextSlide – Bild + Text

**Wann nutzen:** Wenn ein Bild/Visual mit Text kombiniert werden soll.

```tsx
interface ImageTextSlideProps {
  title?: string;
  text?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

**Layout:** Links Text (Pill, Titel, Beschreibung), rechts großer Glassmorphism-Container (720×720px) für ein Bild.

**totalSteps: 0** (kann erweitert werden)

---

### 4.5 VideoSlide – Video-Platzhalter

**Wann nutzen:** Wenn ein Video eingebettet werden soll.

```tsx
interface VideoSlideProps {
  title?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

**Layout:** Pill + Titel oben, großer Glassmorphism-Container mit Play-Button als Platzhalter.

**totalSteps: 0**

---

### 4.6 TwoColumnSlide – Zwei-Spalten-Vergleich

**Wann nutzen:** Vorher/Nachher, Pro/Contra, Vergleiche.

```tsx
interface TwoColumnSlideProps {
  title?: string;
  leftTitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightItems?: string[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}
```

**Reveal:** Step 1 = linke Spalte, Step 2 = rechte Spalte. `totalSteps: 2`.

**Visuelle Elemente:** Jede Spalte ist eine Glassmorphism-Karte mit Accent-Bar oben (grau vs. rot), Label ("A"/"B"), Bullet-Points mit roten Dots.

---

### 4.7 StatsSlide – Kennzahlen

**Wann nutzen:** Für KPIs, Zahlen, Metriken.

```tsx
interface Stat {
  value: string;   // z.B. "95%", "250+"
  label: string;   // z.B. "Kundenzufriedenheit"
}

interface StatsSlideProps {
  title?: string;
  stats?: Stat[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}
```

**Reveal:** Jede Stat-Karte ist ein eigener Step. `totalSteps` = Anzahl der Stats.

**Visuelle Elemente:** Glassmorphism-Karten mit Accent-Bar oben, Glow hinter der Zahl, große rote Zahl.

---

### 4.8 QuoteSlide – Zitat

**Wann nutzen:** Für inspirierende Zitate, Kundenstimmen, Testimonials.

```tsx
interface QuoteSlideProps {
  quote?: string;
  author?: string;
  role?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

**Layout:** Zentriert, großes `"` Zeichen (rot, gedimmt), Zitattext, Author + Role mit Accent-Bar.

**Visuelle Elemente:** Gradient-Blob (zentriert, unten), Grid-Overlay, Glow hinter Anführungszeichen.

**totalSteps: 0**

---

### 4.9 ClosingSlide – Abschluss

**Wann nutzen:** Immer als letzte Folie.

```tsx
interface ClosingSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}
```

**Feste Inhalte:** Logo (quadratisch, groß), "Vielen Dank", Untertitel, Kontakt-Pills (Website, LinkedIn, E-Mail).

**Visuelle Elemente:** Gradient-Blob (zentriert), Grid-Overlay, Logo-Glow.

**totalSteps: 0**

---

## 5. Visuelle Patterns

### 5.1 Glassmorphism-Pills

Verwendet für Tags, Labels, Kategorien:

```tsx
<span className="px-[24px] py-[10px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[16px] text-slide-muted">
  Label
</span>
```

### 5.2 Glassmorphism-Karten

Verwendet für Stat-Cards, Spalten, Bild-Container:

```tsx
<div className="p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden">
  {/* Accent-Bar oben */}
  <div className="absolute top-0 left-0 right-0 h-[3px] bg-slide-primary opacity-60" />
  {/* Inhalt */}
</div>
```

### 5.3 Noise Texture

Automatisch via `SlideLayout` (außer `variant="light"`). Feines SVG-Rauschen bei 3.5% Opacity.

### 5.4 Grid Overlay

Subtiles 32×32px Gitter mit Fade-Mask:

```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    opacity: 0.02,
    maskImage: "linear-gradient(to bottom, white 0%, transparent 70%)",
    WebkitMaskImage: "linear-gradient(to bottom, white 0%, transparent 70%)",
  }}
/>
```

**Verwenden auf:** TitleSlide, SectionSlide, QuoteSlide, ClosingSlide (also Slides ohne viel Textinhalt).

### 5.5 Gradient Blob

Hintergrundelement aus `src/assets/gradient-blob.png`:

```tsx
<img
  src={gradientBlob}
  alt=""
  className="absolute right-[-100px] bottom-[-400px] w-[1000px] h-[1000px] opacity-50 pointer-events-none"
/>
```

Position und Opacity variieren je Slide. Immer `pointer-events-none`.

### 5.6 Logo-Platzierung

- **Oben links (TitleSlide):** `top-[60px] left-[100px]`, `h-[44px]`, `logo-white-wide.png`
- **Oben rechts (Content-Slides):** `top-[60px] right-[100px]`, `h-[36px] opacity-40`, `logo-white-wide.png`
- **Zentriert groß (ClosingSlide):** `h-[160px]`, `logo-white-square.png`

### 5.7 Bottom Accent Bar

Fast alle Slides haben unten rechts eine kleine rote Linie:

```tsx
<div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
  <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
</div>
```

### 5.8 Glow-Effekte

Subtile farbige Blur-Kreise hinter wichtigen Elementen:

```tsx
<div className="absolute top-[20px] left-[30px] w-[120px] h-[80px] bg-slide-primary/15 blur-[50px] rounded-full" />
```

---

## 6. Animation Pattern

### Standard-Varianten (in jeder Slide identisch)

```tsx
const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};
```

### Verwendung

```tsx
<motion.div variants={container} initial="initial" animate="animate">
  <motion.h2 variants={fadeUp}>Titel</motion.h2>
  <motion.p variants={fadeUp}>Text</motion.p>
</motion.div>
```

- `container` auf dem Parent-Element → staggert die Kinder
- `fadeUp` auf jedem Kind → Fade-In + 20px nach oben

### Slide-Übergang (in Index.tsx)

```tsx
<motion.div
  key={current}
  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
/>
```

---

## 7. Reveal-System (Click-to-Reveal)

### RevealItem-Komponente

```tsx
import RevealItem from "./RevealItem";

<RevealItem step={1} currentStep={revealStep}>
  <div>Wird bei Step 1 eingeblendet</div>
</RevealItem>

<RevealItem step={2} currentStep={revealStep}>
  <div>Wird bei Step 2 eingeblendet</div>
</RevealItem>
```

### Verhalten

- `currentStep >= step` → Element sichtbar (opacity 1, y: 0)
- `currentStep < step` → Element unsichtbar (opacity 0, y: 16px)
- `currentStep === undefined` → Alles sichtbar (Thumbnails/Grid)

### Konfiguration

In `slideConfigs` setzt du `totalSteps`:

```tsx
{ key: "myslide", totalSteps: 3, render: (p) => <MySlide {...p} /> }
```

Die Navigation in `Index.tsx` handled den Rest:
- **Next:** Wenn `currentStep < totalSteps` → Step++, sonst nächste Slide
- **Prev:** Wenn `currentStep > 0` → Step--, sonst vorherige Slide (mit `totalSteps` als Start)

---

## 8. Logo-Assets

| Datei | Verwendung |
|---|---|
| `src/assets/logo-white-wide.png` | Standard-Logo auf dunklen Slides (oben links/rechts) |
| `src/assets/logo-white-square.png` | Großes Logo auf ClosingSlide |
| `src/assets/logo-color-wide.png` | Logo auf hellen Slides |
| `src/assets/logo-color-square.png` | Quadratisches farbiges Logo |
| `src/assets/gradient-blob.png` | Hintergrund-Dekoelement |

---

## 9. Regeln & Konventionen

### DO ✅

- **Absolute Pixel-Werte** für alle Abstände und Größen: `px-[100px]`, `gap-[40px]`, `top-[60px]`
- **DM Sans** als einzige Schriftart
- **`slide-*` Tailwind-Klassen** für Farben: `text-slide-fg`, `bg-slide-primary`
- **`SlideLayout`** als äußersten Wrapper für jede Slide
- **`container`/`fadeUp`** Variants für jede animierte Slide kopieren
- **Glassmorphism-Pattern** für alle interaktiven/hervorgehobenen Elemente
- **RevealItem** für schrittweise Einblendungen
- Jede Slide bekommt `slideIndex` und `totalSlides` Props
- Alle Bilder/Blobs mit `pointer-events-none`

### DON'T ❌

- **Keine Tailwind-Spacing-Klassen** (`p-4`, `mt-8`) – immer `p-[16px]`, `mt-[32px]`
- **Keine anderen Fonts** als DM Sans
- **Keine hardcoded Farben** (`text-white`, `bg-black`) – immer Design-Tokens (`text-slide-fg`, `bg-slide-bg`)
- **Keine `rem`/`em`-Werte** – alles in `px`
- **Keine neuen CSS-Dateien** – alles via Tailwind-Klassen oder bestehende `index.css`-Tokens
- **Kein `light` Variant** als Standard – dark ist Standard

---

## 10. Neue Slide erstellen – Schritt für Schritt

1. **Datei erstellen:** `src/components/slides/MeineSlide.tsx`
2. **Imports:** `motion` von framer-motion, `SlideLayout`, ggf. `RevealItem`, Logo-Assets
3. **Animation-Variants kopieren:** `container` + `fadeUp` (exakt wie oben)
4. **Props-Interface definieren** mit `slideIndex?`, `totalSlides?`, `revealStep?`
5. **JSX:** `<SlideLayout variant="dark">` als Wrapper
6. **Logo** oben rechts platzieren (bei Content-Slides)
7. **Content** mit `motion.div variants={container}` + `motion.* variants={fadeUp}` animieren
8. **RevealItem** um schrittweise Elemente legen
9. **In `Index.tsx` registrieren:** `slideConfigs`-Array erweitern mit `key`, `totalSteps`, `render`

### Beispiel: Neue Custom-Slide

```tsx
import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import RevealItem from "./RevealItem";
import logoWhite from "@/assets/logo-white-wide.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface CustomSlideProps {
  title?: string;
  items?: string[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}

const CustomSlide = ({
  title = "Mein Titel",
  items = ["Punkt 1", "Punkt 2", "Punkt 3"],
  slideIndex,
  totalSlides,
  revealStep,
}: CustomSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex flex-col justify-center px-[100px]"
      >
        <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-[60px] text-slide-fg">
          {title}
        </motion.h2>

        {items.map((item, i) => (
          <RevealItem key={i} step={i + 1} currentStep={revealStep}>
            <motion.p variants={fadeUp} className="text-2xl text-slide-fg/90 mb-[24px]">
              {item}
            </motion.p>
          </RevealItem>
        ))}
      </motion.div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default CustomSlide;
```

Registrierung in `Index.tsx`:

```tsx
import CustomSlide from "@/components/slides/CustomSlide";

// Im slideConfigs-Array:
{ key: "custom", totalSteps: 3, render: (p) => <CustomSlide title="Mein Thema" items={["A", "B", "C"]} {...p} /> },
```

---

## 11. Tastatur-Shortcuts

| Taste | Aktion |
|---|---|
| `→` / `Space` | Nächster Step oder nächste Slide |
| `←` | Vorheriger Step oder vorherige Slide |
| `F` / `F5` | Fullscreen toggle |
| `G` | Grid-Ansicht toggle |
| `Esc` | Grid schließen |
