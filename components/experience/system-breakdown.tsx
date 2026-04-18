"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { systemNodes } from "@/data/mission";

export function SystemBreakdown() {
  const [active, setActive] = useState(systemNodes[0].id);
  const reduced = useReducedMotion();
  const activeNode = systemNodes.find((node) => node.id === active) ?? systemNodes[0];

  return (
    <section id="systems" className="relative px-4 py-[var(--space-section)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="tech-label">Drone systems / inspection mode</div>
            <h2 className="text-section max-w-md">Inspect the craft like engineering has the final word.</h2>
          </div>
          <p className="max-w-2xl text-subhead">
            Each node opens as a subsystem, not a brochure card. Touch the hull. Read the logic beneath the
            surface.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel-strong relative min-h-[580px] overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-0 opacity-75">
              <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--surface-line)]" />
              <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--surface-line)]" />
            </div>

            <div className="relative flex h-full items-center justify-center">
              <div className="relative h-[26rem] w-full max-w-3xl">
                <div className="absolute left-1/2 top-1/2 h-28 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-[color:var(--surface-strong)] bg-[rgba(8,12,18,0.94)]" />
                <div className="absolute left-[19%] top-[28%] h-px w-[22%] bg-[color:var(--surface-strong)]" />
                <div className="absolute right-[19%] top-[28%] h-px w-[22%] bg-[color:var(--surface-strong)]" />
                <div className="absolute left-[19%] bottom-[28%] h-px w-[22%] bg-[color:var(--surface-strong)]" />
                <div className="absolute right-[19%] bottom-[28%] h-px w-[22%] bg-[color:var(--surface-strong)]" />

                {[
                  ["propulsion", "left-[16%] top-[24%]"],
                  ["camera", "left-[50%] top-[36%]"],
                  ["sensors", "left-[78%] top-[24%]"],
                  ["stabilization", "left-[16%] top-[72%]"],
                  ["ai", "left-[50%] top-[60%]"],
                  ["battery", "left-[78%] top-[72%]"]
                ].map(([id, pos]) => {
                  const isActive = active === id;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setActive(id)}
                      whileHover={reduced ? undefined : { scale: 1.04 }}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                      className={`absolute ${pos} flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border ${
                        isActive ? "border-[color:var(--cyan)]" : "border-[color:var(--surface-line)]"
                      } bg-[rgba(6,9,14,0.88)]`}
                    >
                      <motion.span
                        animate={isActive && !reduced ? { scale: [1, 1.08, 1] } : undefined}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.4 }}
                        className={`h-3 w-3 rounded-full ${isActive ? "bg-[color:var(--cyan)]" : "bg-[color:var(--muted)]"}`}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="panel-strong rounded-[2rem] p-6">
            <div className="tech-label">Node output</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -18 }}
                transition={{ duration: 0.26 }}
                className="mt-5"
              >
                <div className="text-section text-3xl sm:text-4xl">{activeNode.title}</div>
                <p className="mt-5 text-subhead">{activeNode.blurb}</p>
                <div className="mt-8 space-y-3">
                  {["Integrity: 98.4%", "Thermal spread: nominal", "Latency: 12 ms"].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-black/25 px-4 py-4"
                    >
                      <div className="tech-label">{`readout 0${index + 1}`}</div>
                      <div className="mt-2 text-[color:var(--muted)]">{item}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
