import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import logoWhiteSquare from "@/assets/logo-white-square.png";
import gradientBlob from "@/assets/gradient-blob.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface ClosingSlideProps {
  slideIndex?: number;
  totalSlides?: number;
}

const ClosingSlide = ({ slideIndex, totalSlides }: ClosingSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      {/* Gradient blob */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-30 pointer-events-none"
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

      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex flex-col justify-center items-center text-center"
      >
        {/* Logo glow */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-slide-primary/15 blur-[100px] rounded-full" />

        <motion.img variants={fadeUp} src={logoWhiteSquare} alt="Niklas Volland" className="h-[160px] mb-[48px] relative z-10" />
        <motion.h2 variants={fadeUp} className="text-6xl font-bold tracking-tight mb-[24px] text-slide-fg">Vielen Dank</motion.h2>
        <motion.p variants={fadeUp} className="text-2xl text-slide-muted font-light mb-[64px]">
          Fragen? Lass uns sprechen.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-[16px]">
          <span className="px-[24px] py-[12px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[18px] text-slide-muted">niklasvolland.de</span>
          <span className="px-[24px] py-[12px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[18px] text-slide-muted">LinkedIn</span>
          <span className="px-[24px] py-[12px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[18px] text-slide-muted">kontakt@niklasvolland.de</span>
        </motion.div>
      </motion.div>
    </SlideLayout>
  );
};

export default ClosingSlide;
