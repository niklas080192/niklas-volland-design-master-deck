import { ReactNode } from "react";
import ScaledSlide from "./ScaledSlide";

interface SlideLayoutProps {
  children: ReactNode;
  variant?: "dark" | "light" | "accent" | "gradient";
}

const SlideLayout = ({ children, variant = "dark" }: SlideLayoutProps) => {
  const bgClasses: Record<string, string> = {
    dark: "bg-slide-bg text-slide-fg",
    light: "bg-white text-slide-bg",
    accent: "bg-slide-accent text-slide-fg",
    gradient: "text-slide-fg",
  };

  return (
    <ScaledSlide>
      <div
        className={`relative w-full h-full overflow-hidden font-sans ${bgClasses[variant] || bgClasses.dark}`}
        style={
          variant === "gradient"
            ? { background: "var(--slide-gradient)" }
            : undefined
        }
      >
        {children}
      </div>
    </ScaledSlide>
  );
};

export default SlideLayout;
