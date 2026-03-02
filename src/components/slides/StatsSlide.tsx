import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";

interface Stat {
  value: string;
  label: string;
}

interface StatsSlideProps {
  title?: string;
  stats?: Stat[];
}

const StatsSlide = ({
  title = "Zahlen & Fakten",
  stats = [
    { value: "95%", label: "Kundenzufriedenheit" },
    { value: "250+", label: "Projekte abgeschlossen" },
    { value: "12", label: "Jahre Erfahrung" },
  ],
}: StatsSlideProps) => {
  return (
    <SlideLayout variant="dark">
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <h2 className="text-5xl font-bold tracking-tight mb-[80px]">{title}</h2>

        <div className="flex gap-[60px]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex-1 p-[48px] rounded-[24px] bg-slide-surface border border-slide-fg/5"
            >
              <span
                className="text-7xl font-bold bg-clip-text text-transparent block mb-[16px]"
                style={{ backgroundImage: "var(--slide-gradient)" }}
              >
                {stat.value}
              </span>
              <span className="text-xl text-slide-muted font-light">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[60px] right-[100px]">
        <div className="w-[60px] h-[3px] rounded-full" style={{ background: "var(--slide-gradient)" }} />
      </div>
    </SlideLayout>
  );
};

export default StatsSlide;
