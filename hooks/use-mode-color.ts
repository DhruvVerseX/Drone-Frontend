"use client";

import { useMemo } from "react";

export function useModeColor(color: string) {
  return useMemo(
    () => ({
      boxShadow: `0 0 0 1px color-mix(in srgb, ${color} 35%, transparent), 0 0 48px color-mix(in srgb, ${color} 16%, transparent)`,
      borderColor: `color-mix(in srgb, ${color} 28%, rgba(190, 215, 237, 0.16))`
    }),
    [color]
  );
}
