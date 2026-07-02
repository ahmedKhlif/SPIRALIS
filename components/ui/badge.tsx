import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex min-w-0 items-center justify-center rounded-full border border-border-soft bg-cream/85 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-deep-olive sm:px-3 sm:text-xs sm:tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}
