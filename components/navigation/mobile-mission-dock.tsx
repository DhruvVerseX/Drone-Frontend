"use client";

import { motion, useReducedMotion } from "framer-motion";
import { missionModes } from "@/data/mission";
import { cn } from "@/lib/utils";

type MobileMissionDockProps = {
  activeMode: string;
  onChange: (id: string) => void;
};

export function MobileMissionDock({ activeMode, onChange }: MobileMissionDockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="safe-bottom fixed inset-x-3 bottom-0 z-50 lg:hidden"
    >
      <div className="panel-strong rounded-[1.75rem] px-3 py-3">
        <div className="mb-2 px-2">
          <div className="tech-label">Active mode switch</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {missionModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = mode.id === activeMode;

            return (
              <motion.button
                key={mode.id}
                onClick={() => onChange(mode.id)}
                whileTap={reduced ? undefined : { scale: 0.94 }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-[var(--radius-md)] border px-2 py-3",
                  isActive
                    ? "border-[color:var(--surface-strong)] bg-[rgba(255,255,255,0.08)]"
                    : "border-[color:var(--surface-line)] bg-black/20"
                )}
              >
                <Icon className="h-4 w-4" style={{ color: isActive ? mode.accent : "var(--muted)" }} />
                <span className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {mode.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
