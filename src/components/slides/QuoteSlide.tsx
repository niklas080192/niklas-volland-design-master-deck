import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import gradientBlob from "@/assets/gradient-blob.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface QuoteSlideProps {
  quote?: string;
  author?: string;
  role?: string;
  slideIndex?: number;
  totalSlides?: number;
}

const QuoteSlide = ({
  quote = "Das beste Ergebnis entsteht, wenn alle im Team das tun, was für die Gruppe am besten ist.",
  author = "Niklas Volland",
  role = "Berater & Speaker",
  slideIndex,
  totalSlides,
}: QuoteSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      <img
        src={gradientBlob}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-25 pointer-events-none"
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
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-[200px]"
      >
        {/* Glow behind quote mark */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-slide-primary/10 blur-[80px] rounded-full" />

        <motion.span variants={fadeUp} className="text-[180px] leading-none font-bold text-slide-primary opacity-20 mb-[-50px]">
          &ldquo;
        </motion.span>

        <motion.blockquote variants={fadeUp} className="text-4xl font-light leading-relaxed max-w-[1200px] mb-[48px] text-slide-fg">
          {quote}
        </motion.blockquote>

        <motion.div variants={fadeUp} className="flex items-center gap-[16px]">
          <div className="w-[32px] h-[3px] rounded-full bg-slide-primary" />
          <span className="text-xl font-semibold text-slide-fg">{author}</span>
          <span className="text-lg text-slide-muted">·</span>
          <span className="text-lg text-slide-muted">{role}</span>
        </motion.div>
      </motion.div>
    </SlideLayout>
  );
};

export default QuoteSlide;
