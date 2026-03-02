import SlideLayout from "./SlideLayout";
import logoWhiteSquare from "@/assets/logo-white-square.png";
import gradientBlob from "@/assets/gradient-blob.png";

const ClosingSlide = () => {
  return (
    <SlideLayout variant="dark">
      <img
        src={gradientBlob}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <img src={logoWhiteSquare} alt="Niklas Volland" className="h-[180px] mb-[48px]" />

        <h2 className="text-6xl font-bold tracking-tight mb-[24px]">Vielen Dank</h2>
        <p className="text-2xl text-slide-muted font-light mb-[64px]">
          Fragen? Lass uns sprechen.
        </p>

        <div className="flex gap-[48px] text-xl text-slide-muted">
          <span>niklasvolland.de</span>
          <span className="text-slide-fg/20">|</span>
          <span>LinkedIn</span>
          <span className="text-slide-fg/20">|</span>
          <span>kontakt@niklasvolland.de</span>
        </div>
      </div>
    </SlideLayout>
  );
};

export default ClosingSlide;
