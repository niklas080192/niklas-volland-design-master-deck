import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";

interface TwoColumnSlideProps {
  title?: string;
  leftTitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightItems?: string[];
}

const TwoColumnSlide = ({
  title = "Vergleich & Gegenüberstellung",
  leftTitle = "Vorher",
  leftItems = ["Manuelle Prozesse", "Hoher Zeitaufwand", "Fehleranfällig"],
  rightTitle = "Nachher",
  rightItems = ["Automatisierung", "Effiziente Workflows", "Qualitätsgesichert"],
}: TwoColumnSlideProps) => {
  return (
    <SlideLayout variant="dark">

      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <span className="inline-block px-[14px] py-[5px] rounded-full border border-slide-fg/10 text-[13px] text-slide-muted mb-[20px] w-fit">Comparison</span>
        <h2 className="text-5xl font-bold tracking-tight mb-[64px] text-slide-fg">{title}</h2>

        <div className="flex gap-[40px]">
          {[{ title: leftTitle, items: leftItems }, { title: rightTitle, items: rightItems }].map(
            (col, ci) => (
              <div key={ci} className="flex-1 p-[48px] rounded-[24px] bg-slide-surface border border-slide-fg/5 relative overflow-hidden">
                {/* Top accent - different for each column */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: ci === 1 ? "hsl(var(--slide-primary))" : "hsl(var(--slide-muted))" }}
                />
                <div className="flex items-center gap-[12px] mb-[32px]">
                  <span className="px-[12px] py-[4px] rounded-full border border-slide-fg/10 text-[12px] text-slide-muted">{ci === 0 ? "A" : "B"}</span>
                  <h3 className="text-2xl font-bold text-slide-fg">{col.title}</h3>
                </div>
                <div className="space-y-[24px]">
                  {col.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-[16px]">
                      <div className="mt-[8px] w-[8px] h-[8px] rounded-full bg-slide-primary shrink-0" />
                      <p className="text-xl font-light text-slide-fg/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default TwoColumnSlide;
