import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--foreground) outline-none transition placeholder:text-(--muted) focus-visible:ring-2 focus-visible:ring-(--secondary)/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
