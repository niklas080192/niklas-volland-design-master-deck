

# Flexibles Reveal-System pro Slide

## Konzept

Jede Slide entscheidet selbst, ob und welche Elemente schrittweise eingeblendet werden. Slides ohne Steps (z.B. TitleSlide, ClosingSlide, VideoSlide) verhalten sich wie bisher -- alles erscheint sofort, naechster Klick geht zur naechsten Slide. Slides mit Steps (z.B. ContentSlide mit 4 Bullets) blenden Elemente einzeln ein.

## Architektur

Die Slides werden von einem einfachen `ReactNode[]`-Array zu einem **Konfigurationsobjekt** umgebaut, das pro Slide die Anzahl der Steps speichert:

```text
interface SlideConfig {
  component: (props) => ReactNode
  totalSteps: number   // 0 = alles sofort, keine Steps
}
```

Die Navigation-Logik in `Index.tsx` bekommt einen zweiten State `currentStep` und entscheidet bei jedem Klick: Step weiter oder Slide weiter.

## Technische Umsetzung

### 1. Neue Datei: `src/components/slides/RevealItem.tsx`

Einfache Wrapper-Komponente:

```text
Props: { step: number, currentStep: number, children }

- currentStep >= step: Einblenden mit fadeUp-Animation
- currentStep < step: Unsichtbar (opacity 0, kein Platz-Verlust)
```

Nutzt `framer-motion` `animate` basierend auf dem Vergleich `currentStep >= step`.

### 2. Aenderung: Slide-Props erweitern

Alle Slide-Komponenten bekommen eine neue optionale Prop:

```text
revealStep?: number  // aktueller Reveal-Schritt, undefined = alles zeigen
```

Wenn `revealStep` undefined ist (z.B. in Thumbnails, Grid-View), werden alle Elemente angezeigt. Das macht das System abwaertskompatibel und flexibel.

### 3. Aenderung: `src/pages/Index.tsx`

**Neuer State:**
- `currentStep: number` (startet bei 0)

**Neue Slide-Konfiguration:**
```text
const slideConfigs = [
  { key: "title",   totalSteps: 0 },   // alles sofort
  { key: "section",  totalSteps: 0 },
  { key: "content",  totalSteps: 4 },   // 4 Bullets einzeln
  { key: "imgtext",  totalSteps: 0 },
  { key: "video",    totalSteps: 0 },
  { key: "twocol",   totalSteps: 2 },   // linke Spalte, rechte Spalte
  { key: "stats",    totalSteps: 3 },   // 3 Stat-Karten
  { key: "quote",    totalSteps: 0 },
  { key: "closing",  totalSteps: 0 },
];
```

**Navigation-Logik:**
- `next()`: Wenn `currentStep < totalSteps` der aktuellen Slide, dann `currentStep++`. Sonst `currentStep = 0` und naechste Slide.
- `prev()`: Zurueck zur vorherigen Slide, `currentStep` auf `totalSteps` dieser Slide setzen (damit man rueckwaerts alles sieht). Alternativ: `currentStep = 0` und vorherige Slide.
- Tastatur: Space/ArrowRight ruft `next()`, ArrowLeft ruft `prev()`.

**Slide-Rendering:**
- Hauptansicht: `revealStep={currentStep}` wird an die aktuelle Slide uebergeben
- Thumbnails + Grid: `revealStep` wird NICHT uebergeben (undefined = alles sichtbar)

**Toolbar:**
- Wenn aktuelle Slide Steps hat: Anzeige "Step 2/4" neben "Slide 3/9"

### 4. Aenderung: `src/components/slides/ContentSlide.tsx`

- Neue Prop `revealStep?: number`
- Jeder Bullet wird in `<RevealItem step={i+1} currentStep={revealStep}>` gewrappt
- Logo, Pill, Ueberschrift bleiben immer sichtbar (kein RevealItem)
- Wenn `revealStep === undefined`: alle Bullets sichtbar (fuer Thumbnails)

### 5. Aenderung: `src/components/slides/StatsSlide.tsx`

- Neue Prop `revealStep?: number`
- Jede Stat-Karte in `<RevealItem step={i+1}>` gewrappt
- Titel + Pill immer sichtbar

### 6. Aenderung: `src/components/slides/TwoColumnSlide.tsx`

- Neue Prop `revealStep?: number`
- Linke Spalte: `<RevealItem step={1}>`
- Rechte Spalte: `<RevealItem step={2}>`
- Titel + Pill immer sichtbar

### 7. Keine Aenderung an anderen Slides

TitleSlide, SectionSlide, VideoSlide, ImageTextSlide, QuoteSlide, ClosingSlide bekommen zwar die `revealStep` Prop im Interface, aber da sie `totalSteps: 0` haben, wird `revealStep` nie uebergeben und sie verhalten sich exakt wie bisher. Falls du spaeter Steps brauchst, fuegst du einfach `RevealItem` Wrapper ein und erhoehst `totalSteps`.

## Zusammenfassung betroffener Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/slides/RevealItem.tsx` | Neu erstellen |
| `src/pages/Index.tsx` | Step-State, Navigation-Logik, Slide-Config |
| `src/components/slides/ContentSlide.tsx` | `revealStep` Prop + RevealItem Wrapper |
| `src/components/slides/StatsSlide.tsx` | `revealStep` Prop + RevealItem Wrapper |
| `src/components/slides/TwoColumnSlide.tsx` | `revealStep` Prop + RevealItem Wrapper |

## Flexibilitaet

- Jede Slide kann spaeter Steps bekommen: Einfach `totalSteps` erhoehen und `RevealItem` um die gewuenschten Elemente legen
- Steps koennen auch gruppiert werden (z.B. 2 Bullets gleichzeitig in einem Step)
- Thumbnails/Grid zeigen immer den vollstaendigen Inhalt
- Rueckwaerts-Navigation springt zur vorherigen Slide mit allem sichtbar

