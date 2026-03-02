import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";

const container = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface ContentSlideProps {
  title?: string;
  bullets?: string[];
  slideIndex?: number;
  totalSlides?: number;
}

const ContentSlide = ({
  title = "Inhalt & Key Points",
  bullets = [
    "Erster wichtiger Punkt deiner Präsentation",
    "Zweiter Punkt mit mehr Details und Kontext",
    "Dritter Punkt für die finale Aussage",
    "Optionaler vierter Punkt",
  ],
  slideIndex,
  totalSlides,
}: ContentSlideProps) => {
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
        <motion.div variants={fadeUp} className="flex items-center gap-[16px] mb-[16px]">
          <span className="px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted">Overview</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-[60px] text-slide-fg">{title}</motion.h2>

        <div className="space-y-[32px] max-w-[1400px]">
          {bullets.map((bullet, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-[24px] group"
            >
              <div className="mt-[4px] w-[32px] h-[32px] rounded-lg bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-[14px] text-slide-primary font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-2xl font-light leading-relaxed text-slide-fg/90">
                {bullet}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default ContentSlide;
