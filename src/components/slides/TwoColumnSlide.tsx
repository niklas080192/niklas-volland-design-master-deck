import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import RevealItem from "./RevealItem";
import logoWhite from "@/assets/logo-white-wide.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

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

const TwoColumnSlide = ({
  title = "Vergleich & Gegenüberstellung",
  leftTitle = "Vorher",
  leftItems = ["Manuelle Prozesse", "Hoher Zeitaufwand", "Fehleranfällig"],
  rightTitle = "Nachher",
  rightItems = ["Automatisierung", "Effiziente Workflows", "Qualitätsgesichert"],
  slideIndex,
  totalSlides,
  revealStep,
}: TwoColumnSlideProps) => {
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
        <motion.span variants={fadeUp} className="inline-block px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted mb-[20px] w-fit">Comparison</motion.span>
        <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-[64px] text-slide-fg">{title}</motion.h2>

        <div className="flex gap-[40px]">
          {[{ title: leftTitle, items: leftItems }, { title: rightTitle, items: rightItems }].map(
            (col, ci) => (
              <RevealItem key={ci} step={ci + 1} currentStep={revealStep}>
                <motion.div variants={fadeUp} className="flex-1 p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: ci === 1 ? "hsl(var(--slide-primary))" : "hsl(var(--slide-muted))" }}
                  />
                  <div className="flex items-center gap-[12px] mb-[32px]">
                    <span className="px-[12px] py-[4px] rounded-full bg-white/5 border border-white/10 text-[12px] text-slide-muted">{ci === 0 ? "A" : "B"}</span>
                    <h3 className="text-2xl font-bold text-slide-fg">{col.title}</h3>
                  </div>
                  <div className="space-y-[24px]">
                    {col.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-[16px]">
                        <div className="mt-[8px] w-[8px] h-[8px] rounded-full bg-slide-primary shrink-0" />
                        <p className="text-xl font-light text-slide-fg/85">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </RevealItem>
            )
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default TwoColumnSlide;
