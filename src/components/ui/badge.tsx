import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300",
  {
    variants: {
      variant: {
        primary: "bg-accent/12 text-accent ring-1 ring-accent/20",
        secondary: "bg-white/8 text-fg-dim ring-1 ring-white/12",
        outline: "text-fg-dim ring-1 ring-line-strong",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
