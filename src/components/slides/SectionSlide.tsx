import SlideLayout from "./SlideLayout";
import gradientBlob from "@/assets/gradient-blob.png";

interface SectionSlideProps {
  number?: string;
  title?: string;
  subtitle?: string;
}

const SectionSlide = ({
  number = "01",
  title = "Kapitelüberschrift",
  subtitle = "Kurze Beschreibung des Abschnitts",
}: SectionSlideProps) => {
  return (
    <SlideLayout variant="dark">
      {/* Gradient blob - cut by bottom */}
      <img
        src={gradientBlob}
        alt=""
        className="absolute right-[-200px] bottom-[-400px] w-[800px] h-[800px] opacity-35 pointer-events-none"
      />

      {/* Accent line */}
      <div className="absolute left-[100px] top-[50%] -translate-y-1/2 w-[4px] h-[200px] rounded-full bg-slide-primary" />

      <div className="absolute inset-0 flex flex-col justify-center pl-[160px]">
        <div className="flex items-center gap-[16px] mb-[24px]">
          <span className="px-[16px] py-[6px] rounded-full border border-slide-primary/30 text-[14px] text-slide-primary font-medium">
            Section {number}
          </span>
        </div>
        <h2 className="text-6xl font-bold tracking-tight text-slide-fg">{title}</h2>
        <p className="text-2xl text-slide-muted mt-[24px] max-w-[800px] font-light">
          {subtitle}
        </p>
      </div>
    </SlideLayout>
  );
};

export default SectionSlide;
