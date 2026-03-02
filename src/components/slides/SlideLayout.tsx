import { ReactNode } from "react";
import ScaledSlide from "./ScaledSlide";

interface SlideLayoutProps {
  children: ReactNode;
  variant?: "dark" | "light" | "accent" | "gradient";
  slideIndex?: number;
  totalSlides?: number;
}

const SlideLayout = ({ children, variant = "dark", slideIndex, totalSlides }: SlideLayoutProps) => {
  const bgClasses: Record<string, string> = {
    dark: "bg-slide-bg text-slide-fg",
    light: "bg-white text-slide-bg",
    accent: "bg-slide-accent text-slide-fg",
    gradient: "text-slide-fg",
  };

  const progressWidth = slideIndex !== undefined && totalSlides
    ? ((slideIndex + 1) / totalSlides) * 100
    : 0;

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
        {/* Animated Glow Line */}
        <div className="slide-glow-line" />

        {/* Noise Texture */}
        {variant !== "light" && <div className="slide-noise" />}

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>

        {/* Progress Bar */}
        {slideIndex !== undefined && totalSlides && (
          <div
            className="slide-progress-bar"
            style={{ width: `${progressWidth}%` }}
          />
        )}
      </div>
    </ScaledSlide>
  );
};

export default SlideLayout;
