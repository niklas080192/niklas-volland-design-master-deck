

# Plan: Presenter-System in Agents.md dokumentieren

## Was fehlt

Die Agents.md beschreibt aktuell nur die Slide-Templates und Design-Tokens, aber **nicht den Presenter** — also die komplette `Index.tsx` mit Sidebar, Toolbar, Grid-View, Fullscreen-Modus, Step-Navigation und Keyboard-Shortcuts. Ein Agent, der eine Praesentation baut, muss auch wissen wie die Praesentation **praesentiert** wird.

## Aenderungen an Agents.md

### Neue Sektion "Presenter & Navigation" (nach Sektion 7, vor Logo-Assets)

Dokumentiert:

1. **Drei Ansichtsmodi:**
   - **Editor** (Standard): Sidebar links (200px, Thumbnails), Toolbar oben (56px), Slide-Canvas mittig (max 1200x675, rounded-xl, shadow), Nav-Pfeile links/rechts
   - **Fullscreen**: `document.documentElement.requestFullscreen()`, schwarzer BG, cursor-none, nur die Slide
   - **Grid**: Alle Slides als Thumbnail-Grid (2/3/4 Spalten responsive), Klick navigiert zur Slide

2. **Navigation-Logik (next/prev):**
   - `next()`: Wenn `currentStep < totalSteps` → Step++, sonst naechste Slide mit `currentStep = 0`
   - `prev()`: Wenn `currentStep > 0` → Step--, sonst vorherige Slide mit `currentStep = prevSlide.totalSteps`
   - Thumbnails/Grid: `revealStep = undefined` (alles sichtbar)

3. **Toolbar-Elemente:**
   - Links: "Slide X / Y" + optional "Step X / Y" (wenn `totalSteps > 0`)
   - Rechts: Grid-Button (G), Fullscreen-Button (F)

4. **Sidebar:**
   - 200px breit, Thumbnails mit aspect-video, aktive Slide mit `border-slide-primary` + ring

5. **Slide-Uebergang (AnimatePresence):**
   - Exakte motion-Werte: `opacity 0→1`, `scale 0.98→1→1.02`, `blur 4px→0→4px`, duration 0.35s

6. **Keyboard-Shortcuts** (bereits in Sektion 11, aber hier im Kontext der Navigation nochmal referenziert)

### Exakter Code-Block fuer `renderSlide` und `renderThumbnail`

Damit der Agent versteht wie `revealStep` an Slides weitergegeben wird vs. Thumbnails.

## Betroffene Datei

| Datei | Aktion |
|-------|--------|
| `Agents.md` | Neue Sektion 8 "Presenter & Navigation" einfuegen, bestehende Sektionen 8-11 werden zu 9-12 |

