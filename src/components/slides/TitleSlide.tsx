import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";
import gradientBlob from "@/assets/gradient-blob.png";

const TitleSlide = () => {
  return (
    <SlideLayout variant="dark">
      {/* Gradient blob decoration */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute -right-[200px] -top-[200px] w-[900px] h-[900px] opacity-40 pointer-events-none"
      />

      {/* Logo top-left */}
      <div className="absolute top-[60px] left-[100px]">
        <img src={logoWhite} alt="Niklas Volland" className="h-[44px]" />
      </div>

      {/* Main title */}
      <div className="absolute inset-0 flex flex-col justify-center px-[100px]">
        <h1 className="text-7xl font-bold tracking-tight leading-none max-w-[1200px]">
          Präsentationstitel
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--slide-gradient)" }}>
            hier einfügen
          </span>
        </h1>
        <p className="text-2xl text-slide-muted mt-[40px] max-w-[700px] font-light">
          Untertitel oder kurze Beschreibung deiner Präsentation
        </p>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-[60px] left-[100px] right-[100px] flex justify-between items-center">
        <span className="text-lg text-slide-muted">Niklas Volland</span>
        <span className="text-lg text-slide-muted">2025</span>
      </div>
    </SlideLayout>
  );
};

export default TitleSlide;
