"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
      aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
    >
      Toggle Theme
    </Button>
  );
}
