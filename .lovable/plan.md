

# Plan: Agents.md praezisieren — exakte Design-Abbildung

## Problem

Die Agents.md fuehrt zu falschem Output weil sie zu abstrakt ist. Konkret fehlen:
- Verbot von Gradient-Text (groeßter Fehler im generierten HTML)
- Exakte Werte pro Slide (Blob-Position, Glow, Pill-Groessen variieren)
- Standalone-HTML-Boilerplate fuer externe Tools
- Mehrere falsche/ungenaue Werte

## Aenderungen

### 1. Neue Sektion "HARD RULES" ganz oben (nach Tech-Stack, vor Design Tokens)

Prominente Regeln die NIEMALS verletzt werden duerfen:

- **KEIN Gradient auf Text** — Stat-Werte sind `text-slide-primary` (solides Rot), Titel sind `text-slide-fg` (Weiss). Niemals `background-clip: text` oder `text-gradient`.
- **Logo ist IMMER ein Bild** (PNG), nie Text-Rendering
- **Noise-Opacity exakt 0.035** (3.5%)
- **Progress Bar exakt 1px hoch, opacity 0.4**
- **Alle Pixel-Werte exakt wie dokumentiert** — keine Approximationen

### 2. Pill-Groessen korrigieren (Sektion 5.1)

Zwei Varianten dokumentieren:
- **Title-Pill** (TitleSlide, ClosingSlide): `px-[24px] py-[10px] text-[16px]` bzw. ClosingSlide `py-[12px] text-[18px]`
- **Content-Pill** (alle anderen): `px-[20px] py-[8px] text-[15px]`

### 3. Pro-Slide exakte Layout-Spezifikation (Sektion 4 erweitern)

Jedes Template bekommt eine vollstaendige Positionstabelle statt nur Props-Interface. Beispiel fuer TitleSlide:

| Element | Position/Klassen |
|---------|-----------------|
| Blob | `right-[-100px] bottom-[-400px] w-[1000px] h-[1000px] opacity-50` |
| Logo-Glow | `top-[30px] left-[80px] w-[200px] h-[80px] bg-slide-primary/20 blur-[60px]` |
| Logo | `top-[60px] left-[100px] h-[44px]` (wide, volle Opacity) |
| Pills | `top-[60px] right-[100px] gap-[14px]`, grosse Variante |
| Titel | `text-7xl font-bold max-w-[1200px] text-slide-fg` |
| Untertitel | `text-2xl text-slide-muted mt-[40px] max-w-[700px] font-light` |
| Bottom Bar | `bottom-[60px] left-[100px] right-[100px]` |

Gleiche Detailtiefe fuer alle 9 Slides, inklusive:
- QuoteSlide: `text-[180px]` fuer Anfuehrungszeichen (nicht text-8xl), `px-[200px]` Content-Padding
- ContentSlide: stagger `0.1` (nicht 0.12)
- ClosingSlide: groessere Pills `py-[12px] text-[18px]`, Blob zentriert `bottom-[-500px] w-[1200px] opacity-30`
- SectionSlide: Pill-Text ist `text-slide-primary font-medium` (nicht muted)
- VideoSlide: Play-Button `100×100` Kreis, Icon `40×40`, deutscher Text
- ImageTextSlide: Container `rounded-[32px]` (nicht 24px)

### 4. Standalone-HTML-Boilerplate (neue Sektion 12)

Fuer externe Tools die kein React nutzen — ein komplettes Copy-Paste Template mit:
- Alle CSS Custom Properties
- `.slide-noise`, `.slide-progress-bar` Klassen exakt aus `index.css`
- Font-Scaling Overrides
- Scaling-Engine (JS: berechnet Scale-Faktor basierend auf Viewport)
- Keyboard-Navigation (Arrow, Space, F, Esc)
- Slide-Container Struktur
- Beispiel-Slides (Title, Content, Stats) als reines HTML/CSS

### 5. DON'T-Liste erweitern (Sektion 10)

Neue Eintraege:
- **Kein `background-clip: text`** oder CSS-Gradient auf Text
- **Kein Text-Logo** — immer `<img>` mit PNG
- **Keine abweichende Noise-Opacity** (nur 0.035)
- **Kein `text-white`** — immer `text-slide-fg`

## Betroffene Datei

| Datei | Aktion |
|-------|--------|
| `Agents.md` | Komplett ueberarbeiten mit allen Korrekturen |

