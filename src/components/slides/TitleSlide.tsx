import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";
import gradientBlob from "@/assets/gradient-blob.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface TitleSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}

const TitleSlide = ({ slideIndex, totalSlides }: TitleSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Gradient blob */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute right-[-100px] bottom-[-400px] w-[1000px] h-[1000px] opacity-50 pointer-events-none"
      />

      {/* Logo glow */}
      <div className="absolute top-[30px] left-[80px] w-[200px] h-[80px] bg-slide-primary/20 blur-[60px] rounded-full" />

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

      {/* Logo */}
      <div className="absolute top-[60px] left-[100px]">
        <img src={logoWhite} alt="Niklas Volland" className="h-[44px]" />
      </div>

      {/* Pills - glassmorphism */}
      <div className="absolute top-[60px] right-[100px] flex gap-[14px]">
        <span className="px-[24px] py-[10px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[16px] text-slide-muted">Keynote</span>
        <span className="px-[24px] py-[10px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[16px] text-slide-muted">2025</span>
      </div>

      {/* Main title - staggered */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex flex-col justify-center px-[100px]"
      >
        <motion.h1 variants={fadeUp} className="text-7xl font-bold tracking-tight leading-none max-w-[1200px] text-slide-fg">
          Präsentationstitel
          <br />
          hier einfügen
        </motion.h1>
        <motion.p variants={fadeUp} className="text-2xl text-slide-muted mt-[40px] max-w-[700px] font-light">
          Untertitel oder kurze Beschreibung deiner Präsentation
        </motion.p>
      </motion.div>

      {/* Bottom bar */}
      <div className="absolute bottom-[60px] left-[100px] right-[100px] flex justify-between items-center">
        <span className="text-lg text-slide-muted">Niklas Volland</span>
        <div className="flex items-center gap-[16px]">
          <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
          <span className="text-lg text-slide-muted">01</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default TitleSlide;
