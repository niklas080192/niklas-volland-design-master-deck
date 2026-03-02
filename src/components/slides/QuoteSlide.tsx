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
      <img
        src={gradientBlob}
        alt=""
        className="absolute -left-[300px] -bottom-[300px] w-[800px] h-[800px] opacity-25 pointer-events-none"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[200px]">
        {/* Quote mark */}
        <span
          className="text-[200px] leading-none font-bold bg-clip-text text-transparent opacity-30 mb-[-60px]"
          style={{ backgroundImage: "var(--slide-gradient)" }}
        >
          "
        </span>

        <blockquote className="text-4xl font-light leading-relaxed max-w-[1200px] mb-[48px]">
          {quote}
        </blockquote>

        <div className="flex flex-col items-center gap-[8px]">
          <span className="text-xl font-semibold">{author}</span>
          <span className="text-lg text-slide-muted">{role}</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default QuoteSlide;
