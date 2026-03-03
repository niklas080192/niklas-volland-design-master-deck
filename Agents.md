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

## 2. HARD RULES — NIEMALS VERLETZEN

Diese Regeln haben höchste Priorität. Bei Verstoß ist das Ergebnis **grundlegend falsch**.

### ❌ KEIN Gradient auf Text

Stat-Werte sind **`text-slide-primary`** (solides Rot `hsl(0 100% 45%)`). Titel sind **`text-slide-fg`** (Weiß). **Niemals** `background-clip: text`, `text-transparent`, `-webkit-background-clip: text` oder CSS-Gradient auf Text anwenden.

```css
/* FALSCH — niemals so: */
background: linear-gradient(...);
-webkit-background-clip: text;
color: transparent;

/* RICHTIG: */
color: hsl(0 100% 45%);  /* = text-slide-primary */
```

### ❌ Logo ist IMMER ein Bild (PNG)

Logo wird **immer** als `<img src="...logo-white-wide.png">` eingebunden. Niemals als Text, SVG-Text oder CSS-generiertes Element rendern.

### ✅ Noise-Opacity exakt 0.035

Die Noise-Textur hat **genau `opacity: 0.035`** (3.5%). Kein anderer Wert.

### ✅ Progress Bar exakt 1px hoch, opacity 0.4

```css
height: 1px;
opacity: 0.4;
background: var(--slide-gradient);
```

### ✅ Alle Pixel-Werte exakt wie dokumentiert

Keine Approximationen. Wenn hier `px-[100px]` steht, dann ist es `100px` — nicht `96px`, nicht `6rem`.

### ❌ Keine hardcoded Farben

Niemals `text-white`, `bg-black`, `text-red-500` etc. Immer Design-Tokens: `text-slide-fg`, `bg-slide-bg`, `text-slide-primary`.

### ❌ Kein `text-white` — immer `text-slide-fg`

`text-slide-fg` ist `hsl(0 0% 98%)` — fast weiß, aber nicht rein weiß. Das ist gewollt.

---

## 3. Design Tokens (Farben & Font)

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
| `text-8xl` | 128px | – |
| `text-[180px]` | 180px | Zitatzeichen (QuoteSlide) |

---

## 4. SlideLayout – Basis-Wrapper

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

## 5. Die 9 Slide-Templates — Exakte Layouts

Jedes Template wird mit einer vollständigen Positionstabelle dokumentiert. **Diese Werte sind verbindlich.**

### 5.1 TitleSlide – Eröffnungsfolie

**Wann nutzen:** Immer als erste Folie. **totalSteps: 0**

```tsx
interface TitleSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Gradient Blob | `absolute right-[-100px] bottom-[-400px] w-[1000px] h-[1000px] opacity-50 pointer-events-none` |
| Logo-Glow | `absolute top-[30px] left-[80px] w-[200px] h-[80px] bg-slide-primary/20 blur-[60px] rounded-full` |
| Grid Overlay | `absolute inset-0`, 32px Raster, `opacity: 0.02`, Fade-Mask nach unten 70% |
| Logo (wide, weiß) | `absolute top-[60px] left-[100px]`, `h-[44px]`, **volle Opacity** |
| Pills (2×) | `absolute top-[60px] right-[100px] flex gap-[14px]` |
| Pill-Stil (Title) | `px-[24px] py-[10px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[16px] text-slide-muted` |
| Pill-Texte | "Keynote", "2025" (anpassbar) |
| Titel | `text-7xl font-bold tracking-tight leading-none max-w-[1200px] text-slide-fg` |
| Untertitel | `text-2xl text-slide-muted mt-[40px] max-w-[700px] font-light` |
| Content-Container | `absolute inset-0 flex flex-col justify-center px-[100px]` |
| Bottom Bar | `absolute bottom-[60px] left-[100px] right-[100px] flex justify-between items-center` |
| Presenter-Name | `text-lg text-slide-muted` |
| Accent Bar (Bottom) | `w-[40px] h-[3px] rounded-full bg-slide-primary` |
| Slide-Nummer | `text-lg text-slide-muted` neben Accent Bar |

**Stagger:** `0.12`

---

### 5.2 SectionSlide – Kapitelstart

**Wann nutzen:** Zwischen inhaltlichen Abschnitten. **totalSteps: 0**

```tsx
interface SectionSlideProps {
  number?: string;     // z.B. "01", "02"
  title?: string;
  subtitle?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Gradient Blob | `absolute right-[-200px] bottom-[-400px] w-[800px] h-[800px] opacity-35 pointer-events-none` |
| Grid Overlay | `absolute inset-0`, 32px, `opacity: 0.02`, Fade-Mask 70% |
| Vertikale Linie | `absolute left-[100px] top-[50%] -translate-y-1/2 w-[4px] h-[200px] rounded-full bg-slide-primary` |
| Content-Container | `absolute inset-0 flex flex-col justify-center pl-[160px]` |
| Pill | `px-[22px] py-[9px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px]` |
| **Pill-Textfarbe** | **`text-slide-primary font-medium`** (NICHT text-slide-muted!) |
| Pill-Text | `"Section {number}"` |
| Pill-Abstand | `mb-[24px]`, `gap-[16px]` im Flex-Container |
| Titel | `text-6xl font-bold tracking-tight text-slide-fg` |
| Untertitel | `text-2xl text-slide-muted mt-[24px] max-w-[800px] font-light` |

**Stagger:** `0.12`

---

### 5.3 ContentSlide – Bullet-Points

**Wann nutzen:** Für Aufzählungen, Key Points. **totalSteps: Anzahl der Bullets**

```tsx
interface ContentSlideProps {
  title?: string;
  bullets?: string[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Logo (wide, weiß) | `absolute top-[60px] right-[100px]`, `h-[36px] opacity-40` |
| Content-Container | `absolute inset-0 flex flex-col justify-center px-[100px]` |
| Pill | `px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted` |
| Pill-Text | "Overview" (anpassbar) |
| Pill → Titel Abstand | `mb-[16px]`, `gap-[16px]` |
| Titel | `text-5xl font-bold tracking-tight mb-[60px] text-slide-fg` |
| Bullets-Container | `space-y-[32px] max-w-[1400px]` |
| Bullet-Nummer-Box | `w-[32px] h-[32px] rounded-lg bg-white/5 backdrop-blur-md border border-white/10`, Nummer `text-[14px] text-slide-primary font-semibold` |
| Bullet-Text | `text-2xl font-light leading-relaxed text-slide-fg/90` |
| Bullet-Gap | `gap-[24px]` zwischen Nummer-Box und Text |
| Accent Bar (Bottom) | `absolute bottom-[60px] right-[100px]`, `w-[40px] h-[3px] rounded-full bg-slide-primary` |

**⚠️ Stagger: `0.1`** (nicht 0.12 wie bei anderen Slides!)

---

### 5.4 ImageTextSlide – Bild + Text

**Wann nutzen:** Bild/Visual mit Text kombiniert. **totalSteps: 0**

```tsx
interface ImageTextSlideProps {
  title?: string;
  text?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Logo (wide, weiß) | `absolute top-[60px] right-[100px]`, `h-[36px] opacity-40` |
| Layout-Container | `absolute inset-0 flex items-center px-[100px] gap-[80px]` |
| Linke Spalte (Text) | `flex-1` |
| Pill | `px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted mb-[20px]` |
| Pill-Text | "Visual" |
| Titel | `text-5xl font-bold tracking-tight mb-[32px] text-slide-fg` |
| Beschreibung | `text-xl text-slide-muted font-light leading-relaxed max-w-[600px]` |
| Bild-Container | **`w-[720px] h-[720px] rounded-[32px]`** `overflow-hidden relative bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center` |
| Bild-Container Animation | `initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}` |
| Blob im Container | `absolute inset-0 w-full h-full object-cover opacity-70` |
| Placeholder-Text | `text-xl text-slide-fg/50 font-light`, "Dein Bild hier" |
| Accent Bar (Bottom) | `absolute bottom-[60px] right-[100px]`, `w-[40px] h-[3px] rounded-full bg-slide-primary` |

**Stagger:** `0.12`

---

### 5.5 VideoSlide – Video-Platzhalter

**Wann nutzen:** Wenn ein Video eingebettet werden soll. **totalSteps: 0**

```tsx
interface VideoSlideProps {
  title?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Logo (wide, weiß) | `absolute top-[60px] right-[100px]`, `h-[36px] opacity-40` |
| Content-Container | `absolute inset-0 flex flex-col px-[100px] pt-[50px] pb-[60px]` |
| Header | `flex items-center gap-[16px] mb-[24px]` |
| Pill | `px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted` |
| Pill-Text | "Video" |
| Titel | `text-3xl font-bold tracking-tight text-slide-fg` |
| Video-Container | `flex-1 rounded-[24px] overflow-hidden relative bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer group` |
| Play-Button | **`w-[100px] h-[100px]`** `rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center` |
| Play-Icon | **`w-[40px] h-[40px]`** `text-slide-fg/70 ml-[4px]` (Lucide `Play`) |
| Hover-Effekt | `group-hover:bg-white/15 transition-colors` auf Play-Button |
| Hinweistext | `absolute bottom-[32px]`, `text-lg text-slide-fg/30 font-light`, **"Klicke um das Video abzuspielen"** (Deutsch!) |
| Accent Bar (Bottom) | `absolute bottom-[60px] right-[100px]`, `w-[40px] h-[3px] rounded-full bg-slide-primary` |

**Stagger:** `0.12`

---

### 5.6 TwoColumnSlide – Zwei-Spalten-Vergleich

**Wann nutzen:** Vorher/Nachher, Pro/Contra. **totalSteps: 2**

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

| Element | Exakte Position / Klassen |
|---|---|
| Logo (wide, weiß) | `absolute top-[60px] right-[100px]`, `h-[36px] opacity-40` |
| Content-Container | `absolute inset-0 flex flex-col justify-center px-[100px]` |
| Pill | `px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted mb-[20px] w-fit` |
| Pill-Text | "Comparison" |
| Titel | `text-5xl font-bold tracking-tight mb-[64px] text-slide-fg` |
| Spalten-Container | `flex gap-[40px]` |
| Spalte | `flex-1 p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden` |
| Accent Bar (Spalte oben) | `absolute top-0 left-0 right-0 h-[3px]` — Linke Spalte: `hsl(var(--slide-muted))` (grau), Rechte Spalte: `hsl(var(--slide-primary))` (rot) |
| Spalten-Label | `px-[12px] py-[4px] rounded-full bg-white/5 border border-white/10 text-[12px] text-slide-muted`, "A" / "B" |
| Spalten-Titel | `text-2xl font-bold text-slide-fg`, `gap-[12px] mb-[32px]` |
| Items | `space-y-[24px]` |
| Item-Dot | `mt-[8px] w-[8px] h-[8px] rounded-full bg-slide-primary shrink-0` |
| Item-Text | `text-xl font-light text-slide-fg/85` |
| Reveal | Step 1 = linke Spalte, Step 2 = rechte Spalte |
| Accent Bar (Bottom) | `absolute bottom-[60px] right-[100px]`, `w-[40px] h-[3px] rounded-full bg-slide-primary` |

**Stagger:** `0.12`

---

### 5.7 StatsSlide – Kennzahlen

**Wann nutzen:** Für KPIs, Zahlen, Metriken. **totalSteps: Anzahl der Stats**

```tsx
interface Stat {
  value: string;   // z.B. "95%", "250+"
  label: string;
}

interface StatsSlideProps {
  title?: string;
  stats?: Stat[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Logo (wide, weiß) | `absolute top-[60px] right-[100px]`, `h-[36px] opacity-40` |
| Content-Container | `absolute inset-0 flex flex-col justify-center px-[100px]` |
| Pill | `px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted mb-[20px] w-fit` |
| Pill-Text | "Metrics" |
| Titel | `text-5xl font-bold tracking-tight mb-[80px] text-slide-fg` |
| Karten-Container | `flex gap-[40px]` |
| Stat-Karte | `flex-1 p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden` |
| Accent Bar (Karte oben) | `absolute top-0 left-0 right-0 h-[3px] bg-slide-primary opacity-60` |
| Glow hinter Zahl | `absolute top-[20px] left-[30px] w-[120px] h-[80px] bg-slide-primary/15 blur-[50px] rounded-full` |
| **Stat-Wert** | **`text-7xl font-bold text-slide-primary`** `block mb-[16px] relative z-10` — **SOLIDES ROT, KEIN GRADIENT!** |
| Stat-Label | `text-xl text-slide-muted font-light` |
| Accent Bar (Bottom) | `absolute bottom-[60px] right-[100px]`, `w-[40px] h-[3px] rounded-full bg-slide-primary` |

**Stagger:** `0.12`

---

### 5.8 QuoteSlide – Zitat

**Wann nutzen:** Inspirierende Zitate, Kundenstimmen. **totalSteps: 0**

```tsx
interface QuoteSlideProps {
  quote?: string;
  author?: string;
  role?: string;
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Gradient Blob | `absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-25 pointer-events-none` |
| Grid Overlay | `absolute inset-0`, 32px, `opacity: 0.02`, Fade-Mask 70% |
| Content-Container | `absolute inset-0 flex flex-col justify-center items-center text-center` **`px-[200px]`** |
| Glow hinter Anführungszeichen | `absolute top-[25%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-slide-primary/10 blur-[80px] rounded-full` |
| Anführungszeichen | **`text-[180px]`** (nicht text-8xl!) `leading-none font-bold text-slide-primary opacity-20 mb-[-50px]` |
| Zitattext | `text-4xl font-light leading-relaxed max-w-[1200px] mb-[48px] text-slide-fg` |
| Author-Leiste | `flex items-center gap-[16px]` |
| Accent Bar (Author) | `w-[32px] h-[3px] rounded-full bg-slide-primary` |
| Author-Name | `text-xl font-semibold text-slide-fg` |
| Trenner | `text-lg text-slide-muted`, "·" |
| Role | `text-lg text-slide-muted` |

**Stagger:** `0.12`

---

### 5.9 ClosingSlide – Abschluss

**Wann nutzen:** Immer als letzte Folie. **totalSteps: 0**

```tsx
interface ClosingSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}
```

| Element | Exakte Position / Klassen |
|---|---|
| Gradient Blob | `absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-30 pointer-events-none` |
| Grid Overlay | `absolute inset-0`, 32px, `opacity: 0.02`, Fade-Mask 70% |
| Content-Container | `absolute inset-0 flex flex-col justify-center items-center text-center` |
| Logo-Glow | `absolute top-[35%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-slide-primary/15 blur-[100px] rounded-full` |
| Logo (square, weiß) | `h-[160px] mb-[48px] relative z-10`, **`logo-white-square.png`** |
| Überschrift | `text-6xl font-bold tracking-tight mb-[24px] text-slide-fg`, "Vielen Dank" |
| Untertitel | `text-2xl text-slide-muted font-light mb-[64px]`, "Fragen? Lass uns sprechen." |
| Contact-Pills | `flex gap-[16px]` |
| **Pill-Stil (Closing)** | **`px-[24px] py-[12px]`** `rounded-full bg-white/5 backdrop-blur-md border border-white/10` **`text-[18px]`** `text-slide-muted` |
| Pill-Texte | "niklasvolland.de", "LinkedIn", "kontakt@niklasvolland.de" |

**Stagger:** `0.12`

---

## 6. Visuelle Patterns

### 6.1 Glassmorphism-Pills — Zwei Varianten

**Title-Pill** (TitleSlide, ClosingSlide):
```tsx
<span className="px-[24px] py-[10px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[16px] text-slide-muted">
```
ClosingSlide-Kontakt-Pills sind noch größer: `py-[12px] text-[18px]`

**Content-Pill** (alle anderen Slides):
```tsx
<span className="px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted">
```

**SectionSlide-Pill** (Sonderfall — rote Textfarbe):
```tsx
<span className="px-[22px] py-[9px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-primary font-medium">
```

### 6.2 Glassmorphism-Karten

Verwendet für Stat-Cards, TwoColumn-Spalten:

```tsx
<div className="flex-1 p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden">
  {/* Accent-Bar oben */}
  <div className="absolute top-0 left-0 right-0 h-[3px] bg-slide-primary opacity-60" />
  {/* Inhalt */}
</div>
```

### 6.3 Noise Texture

Automatisch via `SlideLayout` (außer `variant="light"`). Exakter CSS-Code:

```css
.slide-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}
```

### 6.4 Grid Overlay

Subtiles 32×32px Gitter mit Fade-Mask. Verwenden auf: TitleSlide, SectionSlide, QuoteSlide, ClosingSlide.

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

### 6.5 Gradient Blob — Positionen pro Slide

Hintergrundelement aus `src/assets/gradient-blob.png`. **Position und Opacity variieren!**

| Slide | Position | Größe | Opacity |
|---|---|---|---|
| TitleSlide | `right-[-100px] bottom-[-400px]` | `w-[1000px] h-[1000px]` | `0.50` |
| SectionSlide | `right-[-200px] bottom-[-400px]` | `w-[800px] h-[800px]` | `0.35` |
| QuoteSlide | `left-1/2 -translate-x-1/2 bottom-[-500px]` | `w-[1200px] h-[1200px]` | `0.25` |
| ClosingSlide | `left-1/2 -translate-x-1/2 bottom-[-500px]` | `w-[1200px] h-[1200px]` | `0.30` |
| ImageTextSlide | Im Bild-Container, `inset-0 object-cover` | `w-full h-full` | `0.70` |

Alle anderen Slides (Content, Stats, TwoColumn, Video): **kein Blob**.

### 6.6 Logo-Platzierung

| Slide | Logo-Datei | Position | Höhe | Opacity |
|---|---|---|---|---|
| TitleSlide | `logo-white-wide.png` | `top-[60px] left-[100px]` | `h-[44px]` | 1.0 (voll) |
| ClosingSlide | `logo-white-square.png` | Zentriert | `h-[160px]` | 1.0 (voll) |
| Alle Content-Slides | `logo-white-wide.png` | `top-[60px] right-[100px]` | `h-[36px]` | `opacity-40` |
| SectionSlide, QuoteSlide | — | Kein Logo | — | — |

### 6.7 Bottom Accent Bar

Fast alle Slides haben unten rechts eine rote Linie:

```tsx
<div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
  <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
</div>
```

### 6.8 Glow-Effekte pro Slide

| Slide | Glow-Position | Glow-Größe | Glow-Farbe |
|---|---|---|---|
| TitleSlide (Logo) | `top-[30px] left-[80px]` | `w-[200px] h-[80px]` | `bg-slide-primary/20 blur-[60px]` |
| ClosingSlide (Logo) | `top-[35%] left-1/2 -translate-x-1/2` | `w-[300px] h-[300px]` | `bg-slide-primary/15 blur-[100px]` |
| QuoteSlide (Anführungszeichen) | `top-[25%] left-1/2 -translate-x-1/2` | `w-[200px] h-[200px]` | `bg-slide-primary/10 blur-[80px]` |
| StatsSlide (pro Karte) | `top-[20px] left-[30px]` | `w-[120px] h-[80px]` | `bg-slide-primary/15 blur-[50px]` |

---

## 7. Animation Pattern

### Standard-Varianten

```tsx
// Standard (die meisten Slides):
const container = { animate: { transition: { staggerChildren: 0.12 } } };

// ContentSlide AUSNAHME:
const container = { animate: { transition: { staggerChildren: 0.1 } } };

// fadeUp (immer identisch):
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

---

## 8. Reveal-System (Click-to-Reveal)

### RevealItem-Komponente

```tsx
import RevealItem from "./RevealItem";

<RevealItem step={1} currentStep={revealStep}>
  <div>Wird bei Step 1 eingeblendet</div>
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

---

## 9. Presenter & Navigation

Der Presenter ist die komplette UI in `src/pages/Index.tsx`, die Slides darstellt, navigiert und zwischen drei Ansichtsmodi wechselt.

### 9.1 State

```tsx
const [current, setCurrent] = useState(0);         // Aktive Slide (0-basiert)
const [currentStep, setCurrentStep] = useState(0);  // Aktueller Reveal-Step
const [isFullscreen, setIsFullscreen] = useState(false);
const [showGrid, setShowGrid] = useState(false);
```

### 9.2 Drei Ansichtsmodi

#### Editor (Standard)

```
┌──────────┬──────────────────────────────────────────┐
│ Sidebar  │  Toolbar (56px)                          │
│ 200px    ├──────────────────────────────────────────┤
│ Thumbs   │                                          │
│          │  ◀  [ Slide Canvas ]  ▶                  │
│          │     max 1200×675, rounded-xl              │
│          │     shadow-2xl shadow-black/40            │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

- **Sidebar:** `w-[200px]`, `border-r border-slide-fg/5`, Thumbnails mit `aspect-video`, `rounded-lg`
- Aktive Slide: `border-slide-primary ring-1 ring-slide-primary/30`
- Inaktiv: `border-slide-fg/10 hover:border-slide-fg/20`
- Slide-Nummer: `absolute bottom-1 left-1.5 text-[10px] text-slide-muted`

- **Toolbar:** `h-[56px]`, `border-b border-slide-fg/5`
  - Links: `"Slide {current+1} / {totalSlides}"` + optional `"Step {currentStep} / {totalSteps}"` (rot)
  - Rechts: Grid-Button (`Grid3X3` Icon, Shortcut G) + Fullscreen-Button (`Maximize` Icon, Shortcut F)

- **Nav-Pfeile:** Links/rechts vom Canvas, `bg-slide-surface/80`, `rounded-full`, disabled bei erster/letzter Position

#### Fullscreen

```tsx
<div className="fixed inset-0 bg-slide-bg cursor-none">
  <div className="relative w-full h-full overflow-hidden">
    {renderSlide(current, currentStep)}
  </div>
</div>
```

- **CSS-basiert** — kein `requestFullscreen()`, sondern rein per React-State (`isFullscreen`) und `fixed inset-0`
- Browser-Tabs bleiben sichtbar, kein nativer Vollbild-Modus
- Schwarzer Hintergrund, kein Cursor (`cursor-none`)
- Nur die Slide, keine UI-Elemente
- Toggle via `F`-Taste oder Button, Schließen via `Escape`

#### Grid

- Überschrift "Alle Slides" + X-Button zum Schließen
- `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`
- Aktive Slide: `border-slide-primary shadow-lg shadow-slide-primary/20`
- Klick → navigiert zur Slide und schließt Grid

### 9.3 Navigation-Logik (next / prev)

```tsx
const next = useCallback(() => {
  const cfg = slideConfigs[current];
  if (cfg.totalSteps > 0 && currentStep < cfg.totalSteps) {
    setCurrentStep((s) => s + 1);          // Nächster Reveal-Step
  } else {
    if (current < slideConfigs.length - 1) {
      setCurrent((c) => c + 1);            // Nächste Slide
      setCurrentStep(0);                   // Steps zurücksetzen
    }
  }
}, [current, currentStep]);

const prev = useCallback(() => {
  if (config.totalSteps > 0 && currentStep > 0) {
    setCurrentStep((s) => s - 1);          // Vorheriger Step
  } else if (current > 0) {
    const prevConfig = slideConfigs[current - 1];
    setCurrent((c) => c - 1);              // Vorherige Slide
    setCurrentStep(prevConfig.totalSteps); // Letzten Step zeigen
  }
}, [current, currentStep, config]);
```

**Wichtig:** `prev()` setzt `currentStep` auf `prevConfig.totalSteps`, damit man beim Zurückgehen den letzten sichtbaren Zustand der vorherigen Slide sieht.

### 9.4 renderSlide vs. renderThumbnail

```tsx
// Hauptansicht: revealStep wird weitergegeben
const renderSlide = (index: number, revealStep?: number) => {
  const cfg = slideConfigs[index];
  return cfg.render({
    slideIndex: index,
    totalSlides,
    revealStep: cfg.totalSteps > 0 ? revealStep : undefined,
  });
};

// Thumbnails/Grid: revealStep = undefined → alles sichtbar
const renderThumbnail = (index: number) => {
  const cfg = slideConfigs[index];
  return cfg.render({
    slideIndex: index,
    totalSlides,
    revealStep: undefined,
  });
};
```

### 9.5 Slide-Übergang (AnimatePresence)

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={current}
    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    className="relative w-full h-full"
  >
    {renderSlide(current, currentStep)}
  </motion.div>
</AnimatePresence>
```

### 9.6 Keyboard-Shortcuts

| Taste | Aktion |
|---|---|
| `→` / `Space` | Nächster Step oder nächste Slide |
| `←` | Vorheriger Step oder vorherige Slide |
| `F` / `F5` | Fullscreen toggle |
| `G` | Grid-Ansicht toggle |
| `Esc` | Grid schließen |

---

## 10. Logo-Assets

| Datei | Verwendung |
|---|---|
| `src/assets/logo-white-wide.png` | Standard-Logo auf dunklen Slides (oben links/rechts) |
| `src/assets/logo-white-square.png` | Großes Logo auf ClosingSlide |
| `src/assets/logo-color-wide.png` | Logo auf hellen Slides |
| `src/assets/logo-color-square.png` | Quadratisches farbiges Logo |
| `src/assets/gradient-blob.png` | Hintergrund-Dekoelement |

---

## 11. Regeln & Konventionen

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

- **Kein `background-clip: text`** oder CSS-Gradient auf Text — Stat-Werte sind `text-slide-primary` (solides Rot), **niemals** Gradient-Text
- **Kein Text-Logo** — immer `<img>` mit PNG
- **Keine abweichende Noise-Opacity** — nur `0.035`
- **Kein `text-white`** — immer `text-slide-fg`
- **Keine Tailwind-Spacing-Klassen** (`p-4`, `mt-8`) – immer `p-[16px]`, `mt-[32px]`
- **Keine anderen Fonts** als DM Sans
- **Keine hardcoded Farben** (`text-white`, `bg-black`, `text-red-500`) – immer Design-Tokens
- **Keine `rem`/`em`-Werte** – alles in `px`
- **Keine neuen CSS-Dateien** – alles via Tailwind-Klassen oder bestehende `index.css`-Tokens
- **Kein `light` Variant** als Standard – dark ist Standard

---

## 12. Neue Slide erstellen – Schritt für Schritt

1. **Datei erstellen:** `src/components/slides/MeineSlide.tsx`
2. **Imports:** `motion` von framer-motion, `SlideLayout`, ggf. `RevealItem`, Logo-Assets
3. **Animation-Variants kopieren:** `container` + `fadeUp` (exakt wie oben, Stagger `0.12`)
4. **Props-Interface definieren** mit `slideIndex?`, `totalSlides?`, `revealStep?`
5. **JSX:** `<SlideLayout variant="dark">` als Wrapper
6. **Logo** oben rechts platzieren (bei Content-Slides): `top-[60px] right-[100px] h-[36px] opacity-40`
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

## 13. Standalone-HTML-Boilerplate

Für externe Tools die kein React nutzen — ein komplettes Template als Ausgangspunkt.

### CSS Custom Properties & Base Styles

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Präsentation</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --slide-bg: 0 0% 7%;
  --slide-fg: 0 0% 98%;
  --slide-muted: 0 0% 55%;
  --slide-primary: 0 100% 45%;
  --slide-secondary: 43 99% 50%;
  --slide-accent: 0 88% 26%;
  --slide-surface: 0 0% 12%;
  --slide-gradient: linear-gradient(135deg, hsl(0 100% 45%), hsl(25 95% 50%), hsl(43 99% 50%));
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: hsl(var(--slide-bg));
  color: hsl(var(--slide-fg));
  overflow: hidden;
}

/* Slide Container */
.presentation { position: relative; width: 100vw; height: 100vh; }
.slide {
  position: absolute; top: 0; left: 0;
  width: 1920px; height: 1080px;
  transform-origin: top left;
  display: none;
  overflow: hidden;
  background: hsl(var(--slide-bg));
}
.slide.active { display: block; }

/* Noise Texture */
.slide-noise {
  position: absolute; inset: 0;
  pointer-events: none; z-index: 1;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}

/* Progress Bar */
.slide-progress-bar {
  position: absolute; bottom: 0; left: 0;
  height: 1px; z-index: 50; opacity: 0.4;
  background: var(--slide-gradient);
  transition: width 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Grid Overlay */
.slide-grid {
  position: absolute; inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.02;
  -webkit-mask-image: linear-gradient(to bottom, white 0%, transparent 70%);
  mask-image: linear-gradient(to bottom, white 0%, transparent 70%);
}

/* Glassmorphism Pill (Content-Size) */
.pill {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 15px;
  color: hsl(var(--slide-muted));
}

/* Glassmorphism Pill (Title-Size) */
.pill-lg {
  padding: 10px 24px;
  font-size: 16px;
}

/* Glassmorphism Card */
.glass-card {
  padding: 48px;
  border-radius: 24px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.glass-card .accent-bar {
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: hsl(var(--slide-primary));
  opacity: 0.6;
}

/* Bottom Accent */
.bottom-accent {
  position: absolute; bottom: 60px; right: 100px;
  display: flex; align-items: center; gap: 12px;
}
.bottom-accent .bar {
  width: 40px; height: 3px;
  border-radius: 9999px;
  background: hsl(var(--slide-primary));
}

/* Typography */
.text-title { font-size: 72px; font-weight: 700; letter-spacing: -0.02em; color: hsl(var(--slide-fg)); }
.text-hero  { font-size: 104px; font-weight: 700; letter-spacing: -0.02em; line-height: 0.95; color: hsl(var(--slide-fg)); }
.text-section { font-size: 88px; font-weight: 700; letter-spacing: -0.02em; color: hsl(var(--slide-fg)); }
.text-subtitle { font-size: 40px; font-weight: 300; color: hsl(var(--slide-muted)); }
.text-body  { font-size: 32px; font-weight: 300; color: hsl(var(--slide-fg)); opacity: 0.9; }
.text-stat  { font-size: 104px; font-weight: 700; color: hsl(var(--slide-primary)); } /* SOLIDES ROT, KEIN GRADIENT! */
.text-stat-label { font-size: 32px; font-weight: 300; color: hsl(var(--slide-muted)); }
</style>
</head>
<body>

<div class="presentation" id="presentation">

  <!-- Slide 1: Title -->
  <div class="slide active" data-slide="0">
    <div class="slide-noise"></div>
    <div class="slide-grid"></div>
    <!-- Logo Glow -->
    <div style="position:absolute;top:30px;left:80px;width:200px;height:80px;background:hsl(0 100% 45%/0.2);filter:blur(60px);border-radius:9999px"></div>
    <!-- Logo -->
    <img src="logo-white-wide.png" alt="Logo" style="position:absolute;top:60px;left:100px;height:44px">
    <!-- Pills -->
    <div style="position:absolute;top:60px;right:100px;display:flex;gap:14px">
      <span class="pill pill-lg">Keynote</span>
      <span class="pill pill-lg">2025</span>
    </div>
    <!-- Content -->
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 100px">
      <h1 class="text-hero" style="max-width:1200px">Präsentationstitel<br>hier einfügen</h1>
      <p class="text-subtitle" style="margin-top:40px;max-width:700px">Untertitel oder kurze Beschreibung</p>
    </div>
    <!-- Bottom -->
    <div style="position:absolute;bottom:60px;left:100px;right:100px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:28px;color:hsl(var(--slide-muted))">Niklas Volland</span>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="width:40px;height:3px;border-radius:9999px;background:hsl(var(--slide-primary))"></div>
        <span style="font-size:28px;color:hsl(var(--slide-muted))">01</span>
      </div>
    </div>
    <div class="slide-progress-bar" style="width:11%"></div>
  </div>

  <!-- Slide 2: Stats -->
  <div class="slide" data-slide="1">
    <div class="slide-noise"></div>
    <img src="logo-white-wide.png" alt="Logo" style="position:absolute;top:60px;right:100px;height:36px;opacity:0.4">
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 100px">
      <span class="pill" style="margin-bottom:20px;width:fit-content">Metrics</span>
      <h2 class="text-title" style="margin-bottom:80px">Zahlen & Fakten</h2>
      <div style="display:flex;gap:40px">
        <div class="glass-card" style="flex:1">
          <div class="accent-bar"></div>
          <div style="position:absolute;top:20px;left:30px;width:120px;height:80px;background:hsl(0 100% 45%/0.15);filter:blur(50px);border-radius:9999px"></div>
          <span class="text-stat" style="display:block;margin-bottom:16px;position:relative;z-index:10">95%</span>
          <span class="text-stat-label">Kundenzufriedenheit</span>
        </div>
        <div class="glass-card" style="flex:1">
          <div class="accent-bar"></div>
          <div style="position:absolute;top:20px;left:30px;width:120px;height:80px;background:hsl(0 100% 45%/0.15);filter:blur(50px);border-radius:9999px"></div>
          <span class="text-stat" style="display:block;margin-bottom:16px;position:relative;z-index:10">250+</span>
          <span class="text-stat-label">Projekte</span>
        </div>
        <div class="glass-card" style="flex:1">
          <div class="accent-bar"></div>
          <div style="position:absolute;top:20px;left:30px;width:120px;height:80px;background:hsl(0 100% 45%/0.15);filter:blur(50px);border-radius:9999px"></div>
          <span class="text-stat" style="display:block;margin-bottom:16px;position:relative;z-index:10">12</span>
          <span class="text-stat-label">Jahre Erfahrung</span>
        </div>
      </div>
    </div>
    <div class="bottom-accent"><div class="bar"></div></div>
    <div class="slide-progress-bar" style="width:22%"></div>
  </div>

</div>

<script>
// Scaling Engine
function scaleSlides() {
  const slides = document.querySelectorAll('.slide');
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (window.innerWidth - 1920 * scale) / 2;
  const offsetY = (window.innerHeight - 1080 * scale) / 2;
  slides.forEach(s => {
    s.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  });
}
window.addEventListener('resize', scaleSlides);
scaleSlides();

// Navigation
let current = 0;
const slides = document.querySelectorAll('.slide');
const total = slides.length;

function goTo(i) {
  if (i < 0 || i >= total) return;
  slides[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active');
}

let isFullscreen = false;
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
  if (e.key === 'f' || e.key === 'F5') {
    e.preventDefault();
    isFullscreen = !isFullscreen;
    document.body.classList.toggle('fullscreen', isFullscreen);
  }
  if (e.key === 'Escape' && isFullscreen) {
    isFullscreen = false;
    document.body.classList.remove('fullscreen');
  }
});
</script>
</body>
</html>
```

---
