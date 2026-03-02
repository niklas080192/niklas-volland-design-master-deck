import SlideLayout from "./SlideLayout";
import logoWhite from "@/assets/logo-white-wide.png";
import gradientBlob from "@/assets/gradient-blob.png";

interface ImageTextSlideProps {
  title?: string;
  text?: string;
}

const ImageTextSlide = ({
  title = "Bild & Text",
  text = "Hier steht ein erklärender Text, der das Bild ergänzt. Nutze dieses Layout für visuelle Inhalte kombiniert mit Erklärungen.",
}: ImageTextSlideProps) => {
  return (
    <SlideLayout variant="dark">
      {/* Logo */}
      <div className="absolute top-[60px] right-[100px]">
        <img src={logoWhite} alt="NV" className="h-[36px] opacity-40" />
      </div>

      <div className="absolute inset-0 flex items-center px-[100px] gap-[80px]">
        {/* Left: text */}
        <div className="flex-1">
          <h2 className="text-5xl font-bold tracking-tight mb-[32px]">{title}</h2>
          <p className="text-xl text-slide-muted font-light leading-relaxed max-w-[600px]">
            {text}
          </p>
        </div>

        {/* Right: image placeholder with gradient */}
        <div className="w-[720px] h-[720px] rounded-[32px] overflow-hidden relative bg-slide-surface flex items-center justify-center">
          <img
            src={gradientBlob}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <span className="relative z-10 text-xl text-slide-fg/60 font-light">Dein Bild hier</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-[60px] right-[100px]">
        <div className="w-[60px] h-[3px] rounded-full" style={{ background: "var(--slide-gradient)" }} />
      </div>
    </SlideLayout>
  );
};

export default ImageTextSlide;
