import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-w-0 items-center justify-center gap-2 whitespace-normal rounded-full text-center text-sm font-semibold leading-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-olive/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shine-hover bg-deep-olive px-6 py-3 text-white shadow-soft hover:-translate-y-0.5 hover:bg-bottle-green",
        secondary:
          "border border-deep-olive bg-transparent px-6 py-3 text-deep-olive hover:-translate-y-0.5 hover:bg-deep-olive hover:text-white",
        ghost: "px-3 py-2 text-deep-olive hover:bg-pale-green/50",
        cream:
          "bg-cream px-6 py-3 text-deep-olive shadow-card hover:-translate-y-0.5",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-xs",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
