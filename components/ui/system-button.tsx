"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SystemButtonProps = {
  label: string;
  variant?: "solid" | "ghost";
  className?: string;
};

export function SystemButton({
  label,
  variant = "solid",
  className
}: SystemButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.985, y: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className={cn(
        "group inline-flex items-center gap-3 rounded-[var(--radius-full)] border px-5 py-3 text-sm uppercase tracking-[0.24em]",
        variant === "solid"
          ? "border-[color:var(--surface-strong)] bg-[rgba(237,247,255,0.94)] text-black"
          : "border-[color:var(--surface-line)] bg-[rgba(12,16,22,0.5)] text-[color:var(--text)]",
        className
      )}
    >
      <span>{label}</span>
      <motion.span
        aria-hidden
        whileHover={reduced ? undefined : { x: 2, y: -2 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}
