import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { ReactNode } from "react";

interface SlideConfig {
  key: string;
  totalSteps: number;
  render: (props: { slideIndex: number; totalSlides: number; revealStep?: number }) => ReactNode;
}

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/**
 * Copy all CSS custom properties from :root to a target element
 */
const copyCSSCustomProperties = (target: HTMLElement) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const allSheets = Array.from(document.styleSheets);

  // Collect all --var names from stylesheets
  const varNames = new Set<string>();
  for (const sheet of allSheets) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
          for (const prop of Array.from(rule.style)) {
            if (prop.startsWith("--")) varNames.add(prop);
          }
        }
      }
    } catch {
      // Cross-origin sheets — skip
    }
  }

  // Apply each custom property to the target
  for (const name of varNames) {
    const value = rootStyles.getPropertyValue(name).trim();
    if (value) target.style.setProperty(name, value);
  }
};

/**
 * Wait for all images inside a container to finish loading.
 */
const waitForImages = (container: HTMLElement): Promise<void[]> => {
  const images = Array.from(container.querySelectorAll("img"));
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
};

/**
 * Render a single slide into an on-screen (but visually hidden) container and capture it.
 */
const captureSlide = async (
  config: SlideConfig,
  index: number,
  totalSlides: number,
  container: HTMLElement
): Promise<HTMLCanvasElement> => {
  // Clear previous content
  container.innerHTML = "";

  // Create a wrapper div for this slide's React root
  const wrapper = document.createElement("div");
  wrapper.style.width = `${SLIDE_W}px`;
  wrapper.style.height = `${SLIDE_H}px`;
  wrapper.style.position = "relative";
  wrapper.style.overflow = "hidden";
  container.appendChild(wrapper);

  // Render slide with all steps revealed
  const revealStep = config.totalSteps > 0 ? config.totalSteps : undefined;
  const element = config.render({ slideIndex: index, totalSlides, revealStep });

  const root = createRoot(wrapper);
  root.render(element as any);

  // Wait for React flush
  await new Promise((r) => setTimeout(r, 500));
  // Wait for images
  await waitForImages(wrapper);
  // Wait for fonts
  await document.fonts.ready;
  // Extra settle time
  await new Promise((r) => setTimeout(r, 300));

  // Fix html2canvas limitations: hide noise overlay (SVG filter), fix grid overlays (mask-image not supported)
  // Hide noise textures
  wrapper.querySelectorAll<HTMLElement>('.slide-noise').forEach(el => {
    el.style.display = 'none';
  });
  // Remove mask-image from grid overlays (html2canvas ignores it, showing grid at full opacity)
  wrapper.querySelectorAll<HTMLElement>('[style*="maskImage"], [style*="mask-image"]').forEach(el => {
    el.style.display = 'none';
  });
  // Fix blur filters - html2canvas doesn't render CSS blur well
  wrapper.querySelectorAll<HTMLElement>('[class*="blur-"]').forEach(el => {
    el.style.filter = 'none';
    el.style.opacity = '0.3';
  });

  const canvas = await html2canvas(wrapper, {
    width: SLIDE_W,
    height: SLIDE_H,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#121212",
    logging: false,
    // Ensure we capture the element in its actual position
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0,
    windowWidth: SLIDE_W,
    windowHeight: SLIDE_H,
  });

  root.unmount();
  return canvas;
};

export const exportPdf = async (
  slideConfigs: SlideConfig[],
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  // Wait for fonts before starting
  await document.fonts.ready;

  // Create container — on-screen but visually hidden (not off-screen, so html2canvas works)
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    overflow: "hidden",
    opacity: "0",
    pointerEvents: "none",
    zIndex: "-9999",
  });

  // Copy CSS custom properties so slide tokens work
  copyCSSCustomProperties(container);
  // Set font family explicitly
  container.style.fontFamily = "'DM Sans', system-ui, sans-serif";

  document.body.appendChild(container);

  // PDF: 16:9 landscape, use point units (1pt = 1/72 inch)
  // 1920×1080 at 72dpi → 1920pt × 1080pt, but that's huge.
  // Use mm: 338.67mm × 190.5mm (≈ standard 16:9)
  const pdfW = 338.667;
  const pdfH = 190.5;
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [pdfW, pdfH] });

  const totalSlides = slideConfigs.length;

  try {
    for (let i = 0; i < totalSlides; i++) {
      onProgress?.(i + 1, totalSlides);

      const canvas = await captureSlide(slideConfigs[i], i, totalSlides, container);
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      if (i > 0) pdf.addPage([pdfW, pdfH], "landscape");
      pdf.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
    }

    pdf.save("presentation.pdf");
  } finally {
    document.body.removeChild(container);
  }
};
