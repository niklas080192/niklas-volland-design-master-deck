import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";
import gradientBlob from "@/assets/gradient-blob.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface ImageTextSlideProps {
  title?: string;
  text?: string;
  slideIndex?: number;
  totalSlides?: number;
}

const ImageTextSlide = ({
  title = "Bild & Text",
  text = "Hier steht ein erklärender Text, der das Bild ergänzt. Nutze dieses Layout für visuelle Inhalte kombiniert mit Erklärungen.",
  slideIndex,
  totalSlides,
}: ImageTextSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex items-center px-[100px] gap-[80px]">
        {/* Left: text - staggered */}
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="flex-1"
        >
          <motion.span variants={fadeUp} className="inline-block px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted mb-[20px]">Visual</motion.span>
          <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-[32px] text-slide-fg">{title}</motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slide-muted font-light leading-relaxed max-w-[600px]">
            {text}
          </motion.p>
        </motion.div>

        {/* Right: glassmorphism image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="w-[720px] h-[720px] rounded-[32px] overflow-hidden relative bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center"
        >
          <img
            src={gradientBlob}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <span className="relative z-10 text-xl text-slide-fg/50 font-light">Dein Bild hier</span>
        </motion.div>
      </div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default ImageTextSlide;
