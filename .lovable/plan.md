

# PDF Download Integration

## Approach

Use **html2canvas** + **jsPDF** to render each slide at 1920×1080 into a 16:9 PDF. Each slide gets rendered off-screen at native resolution, captured as canvas, then added as a PDF page.

## Steps

1. **Install** `html2canvas` and `jspdf`

2. **Create `src/utils/exportPdf.ts`**
   - Create a hidden off-screen container (1920×1080, `position: fixed`, `left: -9999px`)
   - Loop through all `slideConfigs`, render each slide (with full `revealStep` = `totalSteps` so all content visible) into the container using `ReactDOM.createRoot`
   - Capture each with `html2canvas` at scale 2 for quality
   - Add each canvas to jsPDF as a page (landscape A4 / custom 16:9 dimensions: 508mm × 285.75mm or use 1920×1080 px units)
   - Save as PDF
   - Clean up the off-screen container

3. **Add Download button to toolbar** in `Index.tsx`
   - Add a `Download` icon (from lucide) next to Grid/Fullscreen buttons
   - On click, call `exportPdf(slideConfigs)` with a loading toast via sonner
   - Show success/error toast when done

4. **Handle edge cases**
   - Wait for images/fonts to load before capture
   - Disable animations during capture (pass `revealStep` equal to `totalSteps`)
   - Use `allowTaint: true` and `useCORS: true` in html2canvas

