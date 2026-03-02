

# Neue Video-Slide

## Konzept
Eine neue Slide, die ein Video moeglichst gross darstellt -- aehnlich wie bei Keynote-Praesentationen. Das Video fuellt fast die gesamte Slide-Flaeche aus, mit nur minimalem Rand und einer kleinen Titelzeile oben.

## Layout
- Oben rechts: Logo (wie bei anderen Slides, dezent mit 40% Opacity)
- Oben links: Kleiner Titel + optionale Pill/Badge ("Video")
- Darunter: Video-Container der den restlichen Platz ausfuellt (~1720x880px), mit abgerundeten Ecken und Glassmorphism-Border
- Im Video-Container: Play-Button Overlay als Platzhalter (da kein echtes Video eingebettet ist)
- Staggered Entrance Animation wie bei den anderen Slides

## Technische Umsetzung

### Neue Datei: `src/components/slides/VideoSlide.tsx`
- Nutzt `SlideLayout` mit `variant="dark"`
- `framer-motion` Container/fadeUp Variants (gleiche Pattern wie andere Slides)
- Grosser Video-Container mit `bg-white/5 backdrop-blur-md border border-white/10` (Glassmorphism)
- Zentrierter Play-Button (Lucide `Play` Icon) als visueller Platzhalter
- Props: `title`, `slideIndex`, `totalSlides`

### Aenderung: `src/pages/Index.tsx`
- Import der neuen `VideoSlide` Komponente
- `totalSlides` von 8 auf 9 erhoehen
- VideoSlide nach ImageTextSlide einfuegen (Position 4, nach "Bild & Text")
- Alle nachfolgenden `slideIndex` Props um 1 erhoehen
