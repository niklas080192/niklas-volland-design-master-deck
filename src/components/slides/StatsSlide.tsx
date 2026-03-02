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
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <span className="inline-block px-[14px] py-[5px] rounded-full border border-slide-fg/10 text-[13px] text-slide-muted mb-[20px] w-fit">Metrics</span>
        <h2 className="text-5xl font-bold tracking-tight mb-[80px] text-slide-fg">{title}</h2>

        <div className="flex gap-[40px]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex-1 p-[48px] rounded-[24px] bg-slide-surface border border-slide-fg/5 relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-slide-primary opacity-60" />
              <span className="text-7xl font-bold text-slide-primary block mb-[16px]">
                {stat.value}
              </span>
              <span className="text-xl text-slide-muted font-light">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[60px] right-[100px] flex items-center gap-[12px]">
        <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
      </div>
    </SlideLayout>
  );
};

export default StatsSlide;
