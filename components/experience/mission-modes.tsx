"use client";

import { motion, LayoutGroup, useReducedMotion } from "framer-motion";
import { missionModes } from "@/data/mission";
import { useModeColor } from "@/hooks/use-mode-color";

type MissionModesProps = {
  activeMode: string;
  onChange: (id: string) => void;
};

export function MissionModes({ activeMode, onChange }: MissionModesProps) {
  const reduced = useReducedMotion();
  const active = missionModes.find((mode) => mode.id === activeMode) ?? missionModes[0];
  const accentStyles = useModeColor(active.accent);
  const Icon = active.icon;

  return (
    <section id="modes" className="relative px-4 py-[var(--space-section)] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-5">
          <div className="tech-label">Mission modes / interface switching</div>
          <h2 className="text-section max-w-sm">Switch the mission.</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <LayoutGroup>
            <div className="panel-strong rounded-[var(--radius-lg)] p-3">
              {missionModes.map((mode) => {
                const ItemIcon = mode.icon;
                const isActive = mode.id === activeMode;

                return (
                  <motion.button
                    key={mode.id}
                    onClick={() => onChange(mode.id)}
                    whileHover={reduced ? undefined : { x: 4 }}
                    whileTap={reduced ? undefined : { scale: 0.99 }}
                    className="relative mb-2 flex w-full items-center gap-4 overflow-hidden rounded-[var(--radius-md)] px-4 py-4 text-left"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="mission-active"
                        className="absolute inset-0 rounded-[var(--radius-md)] border"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                          borderColor: "color-mix(in srgb, var(--surface-strong) 90%, transparent)"
                        }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    ) : null}

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/20">
                      <ItemIcon className="h-5 w-5 text-[color:var(--text)]" />
                    </div>
                    <div className="relative z-10">
                      <div className="text-headline text-base">{mode.label}</div>
                      <div className="tech-label mt-2">{mode.code}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="panel-strong relative overflow-hidden rounded-[var(--radius-lg)] p-6"
            style={accentStyles}
          >
            <div className="absolute inset-0 opacity-70">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 70% 25%, color-mix(in srgb, ${active.accent} 30%, transparent), transparent 28%)`
                }}
              />
              <div className="absolute inset-x-6 top-1/2 h-px bg-[color:var(--surface-line)]" />
              <div className="absolute right-10 top-8 h-48 w-48 rounded-full border border-[color:var(--surface-line)]" />
            </div>

            <div className="relative z-10 grid h-full gap-8 lg:grid-cols-[1fr_0.88fr]">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/35">
                    <Icon className="h-6 w-6" style={{ color: active.accent }} />
                  </div>
                  <div>
                    <div className="tech-label">Mode {active.code}</div>
                    <div className="text-section text-3xl sm:text-5xl">{active.label}</div>
                  </div>
                </div>
                <p className="max-w-xl text-subhead">{active.summary}</p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {active.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-black/20 px-4 py-4">
                      <div className="tech-label">{metric.label}</div>
                      <div className="mt-3 text-2xl">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 self-end">
                {active.panels.map((panel, index) => (
                  <motion.div
                    key={panel}
                    initial={{ opacity: 0, x: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-[rgba(5,8,13,0.72)] px-4 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="tech-label">{`panel 0${index + 1}`}</span>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: active.accent }}
                      />
                    </div>
                    <div className="mt-3 text-lg uppercase tracking-[0.12em] text-[color:var(--muted)]">
                      {panel}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
