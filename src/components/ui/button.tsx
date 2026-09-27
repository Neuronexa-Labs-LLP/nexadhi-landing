import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#312E81] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#312E81] text-white shadow-2xs hover:bg-[#252269] hover:opacity-95 active:scale-[0.98]",
        primary:
          "bg-[#312E81] text-white shadow-xs hover:bg-[#252269] hover:opacity-95 active:scale-[0.98]",
        secondary:
          "bg-violet-50 text-[#312E81] hover:bg-violet-100/80 active:scale-[0.98]",
        outline:
          "border border-slate-200 bg-white text-[#312E81] hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]",
        accent:
          "bg-[#7C3AED] text-white font-semibold hover:bg-[#6D28D9] active:scale-[0.98] shadow-2xs",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-[#312E81]",
        link:
          "text-[#312E81] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs font-medium",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
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
        suppressHydrationWarning
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
