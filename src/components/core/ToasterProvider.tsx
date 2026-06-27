"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

/**
 * Wraps Sonner's Toaster so it always receives the correct resolved theme
 * (dark/light/system) from next-themes. Without this, Sonner ignores the
 * `.dark` class on <html> and defaults to its own system detection, which
 * causes white toasts in dark mode.
 */
export function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={(resolvedTheme as "light" | "dark") ?? "dark"}
      position="bottom-right"
      closeButton
      toastOptions={{
        className: "border-secondary/20 shadow-2xl backdrop-blur-md rounded-full !bg-card !text-foreground",
      }}
    />
  );
}
