import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";

interface ContentSlideProps {
  title?: string;
  bullets?: string[];
}

const ContentSlide = ({
  title = "Inhalt & Key Points",
  bullets = [
    "Erster wichtiger Punkt deiner Präsentation",
    "Zweiter Punkt mit mehr Details und Kontext",
    "Dritter Punkt für die finale Aussage",
    "Optionaler vierter Punkt",
  ],
}: ContentSlideProps) => {
  return (
    <SlideLayout variant="dark">
      {/* Logo top-right */}
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <h2 className="text-5xl font-bold tracking-tight mb-[60px]">{title}</h2>

        <div className="space-y-[36px] max-w-[1400px]">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-[24px]">
              <div
                className="mt-[6px] w-[12px] h-[12px] rounded-full shrink-0"
                style={{ background: "var(--slide-gradient)" }}
              />
              <p className="text-2xl font-light leading-relaxed text-slide-fg/90">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-[60px] right-[100px]">
        <div className="w-[60px] h-[3px] rounded-full" style={{ background: "var(--slide-gradient)" }} />
      </div>
    </SlideLayout>
  );
};

export default ContentSlide;
