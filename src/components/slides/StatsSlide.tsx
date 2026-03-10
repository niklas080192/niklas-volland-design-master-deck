import { motion } from "framer-motion";
import SlideLayout from "./SlideLayout";
import RevealItem from "./RevealItem";
import logoWhite from "@/assets/logo-white-wide.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface Stat {
  value: string;
  label: string;
}

interface StatsSlideProps {
  title?: string;
  stats?: Stat[];
  slideIndex?: number;
  totalSlides?: number;
  revealStep?: number;
}

const StatsSlide = ({
  title = "Zahlen & Fakten",
  stats = [
    { value: "95%", label: "Kundenzufriedenheit" },
    { value: "250+", label: "Projekte abgeschlossen" },
    { value: "12", label: "Jahre Erfahrung" },
  ],
  slideIndex,
  totalSlides,
  revealStep,
}: StatsSlideProps) => {
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
        <motion.span variants={fadeUp} className="inline-flex items-center justify-center px-[20px] py-[8px] rounded-full bg-white/15 border border-white/20 text-[15px] text-slide-muted leading-none mb-[20px] w-fit">Metrics</motion.span>
        <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-[80px] text-slide-fg">{title}</motion.h2>

        <div className="flex gap-[40px]">
          {stats.map((stat, i) => (
            <RevealItem key={i} step={i + 1} currentStep={revealStep}>
              <motion.div
                variants={fadeUp}
                className="flex-1 p-[48px] rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-slide-primary opacity-60" />
                {/* Glow behind number */}
                <div className="absolute top-[20px] left-[30px] w-[120px] h-[80px] bg-slide-primary/15 blur-[50px] rounded-full" />
                <span className="text-7xl font-bold text-slide-primary block mb-[16px] relative z-10">
                  {stat.value}
                </span>
                <span className="text-xl text-slide-muted font-light">{stat.label}</span>
              </motion.div>
            </RevealItem>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default StatsSlide;
