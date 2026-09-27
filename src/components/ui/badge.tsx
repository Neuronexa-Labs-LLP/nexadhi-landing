import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#312E81] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200 bg-white text-[#312E81] shadow-2xs",
        accent:
          "border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] font-bold",
        navy:
          "bg-[#312E81] text-white border border-[#312E81]",
        secondary:
          "border border-slate-200 bg-slate-50 text-slate-700",
        outline:
          "border border-slate-200 text-[#312E81] bg-white",
        success:
          "border border-emerald-200 bg-emerald-50 text-emerald-800",
        destructive:
          "border border-red-200 bg-red-50 text-red-700",
        purple:
          "border border-violet-200 bg-violet-50 text-[#7C3AED]",
        amber:
          "border border-[#10B981]/40 bg-[#10B981]/15 text-emerald-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
