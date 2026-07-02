import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  label: string;
};

export function IconBadge({ icon: Icon, label }: IconBadgeProps) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-border-soft bg-cream/82 px-3 py-2 text-deep-olive sm:gap-3 sm:rounded-full sm:px-4">
      <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" strokeWidth={1.5} />
      <span className="truncate text-[0.88rem] font-medium sm:text-sm">{label}</span>
    </div>
  );
}
