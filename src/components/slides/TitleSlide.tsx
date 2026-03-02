import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";
import gradientBlob from "@/assets/gradient-blob.png";

const TitleSlide = () => {
  return (
    <SlideLayout variant="dark">
      {/* Gradient blob - more present */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute -right-[100px] -top-[100px] w-[1000px] h-[1000px] opacity-50 pointer-events-none"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-[60px] left-[100px]">
        <img src={logoWhite} alt="Niklas Volland" className="h-[44px]" />
      </div>

      {/* Pills */}
      <div className="absolute top-[60px] right-[100px] flex gap-[12px]">
        <span className="px-[20px] py-[8px] rounded-full border border-slide-fg/10 text-[14px] text-slide-muted">Keynote</span>
        <span className="px-[20px] py-[8px] rounded-full border border-slide-fg/10 text-[14px] text-slide-muted">2025</span>
      </div>

      {/* Main title */}
      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <h1 className="text-7xl font-bold tracking-tight leading-none max-w-[1200px] text-slide-fg">
          Präsentationstitel
          <br />
          <span className="text-slide-primary">hier einfügen</span>
        </h1>
        <p className="text-2xl text-slide-muted mt-[40px] max-w-[700px] font-light">
          Untertitel oder kurze Beschreibung deiner Präsentation
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-[60px] left-[100px] right-[100px] flex justify-between items-center">
        <span className="text-lg text-slide-muted">Niklas Volland</span>
        <div className="flex items-center gap-[16px]">
          <div className="w-[40px] h-[3px] rounded-full bg-slide-primary" />
          <span className="text-lg text-slide-muted">01</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default TitleSlide;
