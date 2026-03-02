import SlideLayout from "./SlideLayout";
import gradientBlob from "@/assets/gradient-blob.png";

interface QuoteSlideProps {
  quote?: string;
  author?: string;
  role?: string;
}

const QuoteSlide = ({
  quote = "Das beste Ergebnis entsteht, wenn alle im Team das tun, was für die Gruppe am besten ist.",
  author = "Niklas Volland",
  role = "Berater & Speaker",
}: QuoteSlideProps) => {
  return (
    <SlideLayout variant="dark">
      {/* Gradient blob - cut by bottom */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-25 pointer-events-none"
      />

      {/* Grid - fades to bottom */}
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

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[200px]">
        {/* Large quote mark */}
        <span className="text-[180px] leading-none font-bold text-slide-primary opacity-20 mb-[-50px]">
          "
        </span>

        <blockquote className="text-4xl font-light leading-relaxed max-w-[1200px] mb-[48px] text-slide-fg">
          {quote}
        </blockquote>

        <div className="flex items-center gap-[16px]">
          <div className="w-[32px] h-[3px] rounded-full bg-slide-primary" />
          <span className="text-xl font-semibold text-slide-fg">{author}</span>
          <span className="text-lg text-slide-muted">·</span>
          <span className="text-lg text-slide-muted">{role}</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default QuoteSlide;
