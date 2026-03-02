import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealItemProps {
  step: number;
  currentStep?: number;
  children: ReactNode;
}

const RevealItem = ({ step, currentStep, children }: RevealItemProps) => {
  // If currentStep is undefined (thumbnails/grid), show everything
  const isVisible = currentStep === undefined || currentStep >= step;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 16,
      }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default RevealItem;
