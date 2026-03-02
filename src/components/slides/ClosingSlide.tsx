import SlideLayout from "./SlideLayout";
import logoWhiteSquare from "@/assets/logo-white-square.png";
import gradientBlob from "@/assets/gradient-blob.png";

const ClosingSlide = () => {
  return (
    <SlideLayout variant="dark">
      {/* Gradient blob - cut by bottom */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 bottom-[-500px] w-[1200px] h-[1200px] opacity-30 pointer-events-none"
      />

      {/* Grid - small boxes */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <img src={logoWhiteSquare} alt="Niklas Volland" className="h-[160px] mb-[48px]" />

        <h2 className="text-6xl font-bold tracking-tight mb-[24px] text-slide-fg">Vielen Dank</h2>
        <p className="text-2xl text-slide-muted font-light mb-[64px]">
          Fragen? Lass uns sprechen.
        </p>

        <div className="flex gap-[16px]">
          <span className="px-[20px] py-[10px] rounded-full border border-slide-fg/10 text-lg text-slide-muted">niklasvolland.de</span>
          <span className="px-[20px] py-[10px] rounded-full border border-slide-fg/10 text-lg text-slide-muted">LinkedIn</span>
          <span className="px-[20px] py-[10px] rounded-full border border-slide-fg/10 text-lg text-slide-muted">kontakt@niklasvolland.de</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default ClosingSlide;
