import SlideLayout from "./SlideLayout";

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
      {/* Accent line */}
      <div
        className="absolute left-[100px] top-[50%] -translate-y-1/2 w-[6px] h-[300px] rounded-full"
        style={{ background: "var(--slide-gradient)" }}
      />

      <div className="absolute inset-0 flex flex-col justify-center pl-[160px]">
        <span className="text-8xl font-bold text-slide-primary opacity-30 mb-[20px]">
          {number}
        </span>
        <h2 className="text-6xl font-bold tracking-tight">{title}</h2>
        <p className="text-2xl text-slide-muted mt-[24px] max-w-[800px] font-light">
          {subtitle}
        </p>
      </div>
    </SlideLayout>
  );
};

export default SectionSlide;
