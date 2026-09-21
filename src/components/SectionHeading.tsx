import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-2xl")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-accent" : "text-accent-dark",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "gold-divider mt-4",
          align === "center" && "mx-auto",
        )}
      />
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
