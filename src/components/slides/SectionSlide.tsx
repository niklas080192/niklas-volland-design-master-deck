import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import gradientBlob from "@/assets/gradient-blob.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface SectionSlideProps {
  number?: string;
  title?: string;
  subtitle?: string;
  slideIndex?: number;
  totalSlides?: number;
}

const SectionSlide = ({
  number = "01",
  title = "Kapitelüberschrift",
  subtitle = "Kurze Beschreibung des Abschnitts",
  slideIndex,
  totalSlides,
}: SectionSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      <img
        src={gradientBlob}
        alt=""
        className="absolute right-[-200px] bottom-[-400px] w-[800px] h-[800px] opacity-35 pointer-events-none"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.02,
          maskImage: "linear-gradient(to bottom, white 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 0%, transparent 70%)",
        }}
      />

      <div className="absolute left-[100px] top-[50%] -translate-y-1/2 w-[4px] h-[200px] rounded-full bg-slide-primary" />

      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex flex-col justify-center pl-[160px]"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-[16px] mb-[24px]">
          <span className="px-[22px] py-[9px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-primary font-medium">
            Section {number}
          </span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-6xl font-bold tracking-tight text-slide-fg">{title}</motion.h2>
        <motion.p variants={fadeUp} className="text-2xl text-slide-muted mt-[24px] max-w-[800px] font-light">
          {subtitle}
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
};

export default SectionSlide;
