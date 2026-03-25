import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

type ButtonVariantsOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-(--primary) text-white hover:opacity-90",
  outline: "border border-(--border) bg-(--surface) text-(--foreground) hover:bg-black/5 dark:hover:bg-white/5",
  ghost: "text-(--foreground) hover:bg-black/5 dark:hover:bg-white/5",
  link: "text-(--secondary) underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 rounded-lg px-4 py-2",
  sm: "h-9 rounded-lg px-3",
  lg: "h-11 rounded-xl px-6",
  icon: "h-10 w-10 rounded-lg",
};

export function buttonVariants({ variant = "default", size = "default" }: ButtonVariantsOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
  );
}

function Button({ className, variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantsOptions) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button };
