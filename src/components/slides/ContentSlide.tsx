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
        <div className="flex items-center gap-[16px] mb-[16px]">
          <span className="px-[20px] py-[8px] rounded-full border border-slide-fg/10 text-[15px] text-slide-muted">Overview</span>
        </div>
        <h2 className="text-5xl font-bold tracking-tight mb-[60px] text-slide-fg">{title}</h2>

        <div className="space-y-[32px] max-w-[1400px]">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-[24px] group">
              <div className="mt-[4px] w-[32px] h-[32px] rounded-lg bg-slide-surface border border-slide-fg/5 flex items-center justify-center shrink-0">
                <span className="text-[14px] text-slide-primary font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-2xl font-light leading-relaxed text-slide-fg/90">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default ContentSlide;
