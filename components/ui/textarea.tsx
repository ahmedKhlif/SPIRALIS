import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-36 w-full rounded-2xl border border-border-soft bg-cream px-4 py-3 text-sm text-text-dark outline-none transition focus:border-deep-olive focus:ring-2 focus:ring-deep-olive/10",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
