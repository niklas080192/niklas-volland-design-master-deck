import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";

const container = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface VideoSlideProps {
  title?: string;
  slideIndex?: number;
  totalSlides?: number;
}

const VideoSlide = ({
  title = "Video",
  slideIndex,
  totalSlides,
}: VideoSlideProps) => {
  return (
    <SlideLayout variant="dark" slideIndex={slideIndex} totalSlides={totalSlides}>
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex flex-col px-[100px] pt-[50px] pb-[60px]"
      >
        <div className="flex items-center gap-[16px] mb-[24px]">
          <motion.span variants={fadeUp} className="inline-block px-[20px] py-[8px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] text-slide-muted">Video</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-slide-fg">{title}</motion.h2>
        </div>

        <motion.div
          variants={fadeUp}
          className="flex-1 rounded-[24px] overflow-hidden relative bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer group"
        >
          <div className="w-[100px] h-[100px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:bg-white/15 transition-colors">
            <Play className="w-[40px] h-[40px] text-slide-fg/70 ml-[4px]" />
          </div>
          <span className="absolute bottom-[32px] text-lg text-slide-fg/30 font-light">Klicke um das Video abzuspielen</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default VideoSlide;
