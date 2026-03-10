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
 * Render a single slide into an off-screen container and capture it as a canvas.
 */
const captureSlide = async (
  config: SlideConfig,
  index: number,
  totalSlides: number,
  container: HTMLElement
): Promise<HTMLCanvasElement> => {
  // Clear previous content
  container.innerHTML = "";

  // Render slide with all steps revealed
  const revealStep = config.totalSteps > 0 ? config.totalSteps : undefined;
  const element = config.render({ slideIndex: index, totalSlides, revealStep });

  const root = createRoot(container);
  root.render(element as any);

  // Wait for React to flush + images to load
  await new Promise((r) => setTimeout(r, 300));
  await waitForImages(container);
  // Extra settle time for fonts
  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(container, {
    width: SLIDE_W,
    height: SLIDE_H,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  root.unmount();
  return canvas;
};

export const exportPdf = async (
  slideConfigs: SlideConfig[],
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  // Create off-screen container at native slide resolution
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    overflow: "hidden",
    zIndex: "-1",
  });
  document.body.appendChild(container);

  // PDF in landscape 16:9 (mm units, 254mm × 142.875mm ≈ 10"×5.625")
  const pdfW = 508;
  const pdfH = 285.75;
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [pdfW, pdfH] });

  const totalSlides = slideConfigs.length;

  try {
    for (let i = 0; i < totalSlides; i++) {
      onProgress?.(i + 1, totalSlides);

      const canvas = await captureSlide(slideConfigs[i], i, totalSlides, container);
      const imgData = canvas.toDataURL("image/png");

      if (i > 0) pdf.addPage([pdfW, pdfH], "landscape");
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    }

    pdf.save("presentation.pdf");
  } finally {
    document.body.removeChild(container);
  }
};
