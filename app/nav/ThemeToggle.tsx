"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Theme = "system" | "dark" | "light";

const themeConfig: Record<Theme, { next: Theme; display: string }> = {
  system: {
    next: "dark",
    display: "System theme",
  },
  dark: {
    next: "light",
    display: "Dark theme",
  },
  light: {
    next: "system",
    display: "Light theme",
  },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = (theme ?? "system") as Theme;
  const config = themeConfig[currentTheme];

  return (
    <button
      onClick={() => setTheme(config.next)}
      className="rounded border px-2 hover:cursor-pointer"
      title={`${currentTheme} → ${config.next}`}
    >
      {config.display}
    </button>
  );
}
