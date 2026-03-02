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
        <h2 className="text-5xl font-bold tracking-tight mb-[64px]">{title}</h2>

        <div className="flex gap-[48px]">
          {[{ title: leftTitle, items: leftItems }, { title: rightTitle, items: rightItems }].map(
            (col, ci) => (
              <div key={ci} className="flex-1 p-[48px] rounded-[24px] bg-slide-surface border border-slide-fg/5">
                <h3
                  className="text-2xl font-bold mb-[32px] bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--slide-gradient)" }}
                >
                  {col.title}
                </h3>
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

      <div className="absolute bottom-[60px] right-[100px]">
        <div className="w-[60px] h-[3px] rounded-full" style={{ background: "var(--slide-gradient)" }} />
      </div>
    </SlideLayout>
  );
};

export default TwoColumnSlide;
