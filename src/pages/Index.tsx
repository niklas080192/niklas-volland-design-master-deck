import { useState, useCallback, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Grid3X3, X } from "lucide-react";
import TitleSlide from "@/components/slides/TitleSlide";
import SectionSlide from "@/components/slides/SectionSlide";
import ContentSlide from "@/components/slides/ContentSlide";
import ImageTextSlide from "@/components/slides/ImageTextSlide";
import StatsSlide from "@/components/slides/StatsSlide";
import QuoteSlide from "@/components/slides/QuoteSlide";
import TwoColumnSlide from "@/components/slides/TwoColumnSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

const slides: ReactNode[] = [
  <TitleSlide key="title" />,
  <SectionSlide key="section" />,
  <ContentSlide key="content" />,
  <ImageTextSlide key="imgtext" />,
  <TwoColumnSlide key="twocol" />,
  <StatsSlide key="stats" />,
  <QuoteSlide key="quote" />,
  <ClosingSlide key="closing" />,
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), []);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Escape" && showGrid) { setShowGrid(false); }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "g") { setShowGrid((s) => !s); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, toggleFullscreen, showGrid]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-slide-bg cursor-none">
        <div className="relative w-full h-full overflow-hidden">
          {slides[current]}
        </div>
      </div>
    );
  }

  if (showGrid) {
    return (
      <div className="min-h-screen bg-slide-bg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slide-fg">Alle Slides</h2>
          <button onClick={() => setShowGrid(false)} className="text-slide-muted hover:text-slide-fg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setShowGrid(false); }}
              className={`relative aspect-video overflow-hidden rounded-xl border-2 transition-all hover:scale-[1.02] ${
                i === current ? "border-slide-primary shadow-lg shadow-slide-primary/20" : "border-slide-fg/10 hover:border-slide-fg/20"
              }`}
            >
              <div className="relative w-full h-full">{slide}</div>
              <div className="absolute bottom-2 left-3 text-xs text-slide-muted font-medium bg-slide-bg/80 px-2 py-0.5 rounded">
                {i + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slide-bg overflow-hidden">
      {/* Sidebar thumbnails */}
      <div className="w-[200px] border-r border-slide-fg/5 flex flex-col overflow-y-auto p-3 gap-2 shrink-0">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative aspect-video overflow-hidden rounded-lg border transition-all shrink-0 ${
              i === current ? "border-slide-primary ring-1 ring-slide-primary/30" : "border-slide-fg/10 hover:border-slide-fg/20"
            }`}
          >
            <div className="relative w-full h-full">{slide}</div>
            <div className="absolute bottom-1 left-1.5 text-[10px] text-slide-muted font-medium">
              {i + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Main canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-[56px] flex items-center justify-between px-6 border-b border-slide-fg/5 shrink-0">
          <span className="text-sm text-slide-muted font-medium">
            Slide {current + 1} / {slides.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(true)}
              className="p-2 rounded-lg text-slide-muted hover:text-slide-fg hover:bg-slide-surface transition-colors"
              title="Grid view (G)"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-slide-muted hover:text-slide-fg hover:bg-slide-surface transition-colors"
              title="Fullscreen (F)"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide area */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-[1200px] max-h-[675px] overflow-hidden rounded-xl shadow-2xl shadow-black/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-full"
              >
                {slides[current]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slide-surface/80 text-slide-fg/60 hover:text-slide-fg hover:bg-slide-surface transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slide-surface/80 text-slide-fg/60 hover:text-slide-fg hover:bg-slide-surface transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
