import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-2.5 sm:space-y-4",
        align === "center" ? "text-center" : "mx-0 text-left",
      )}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="text-balance font-heading text-[clamp(1.9rem,8.2vw,3rem)] font-semibold leading-[1.02] text-deep-olive sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-[0.98rem] leading-6 text-text-dark/70 sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
