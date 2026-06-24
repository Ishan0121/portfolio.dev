type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-6 text-center mb-16 pt-10">
      <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}