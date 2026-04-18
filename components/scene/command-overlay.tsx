"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SystemButton } from "@/components/ui/system-button";

const commandData = [
  ["Vector sync", "stable"],
  ["Payload class", "cinematic / survey"],
  ["Route pressure", "moderate"],
  ["Air density", "nominal"]
];

export function CommandOverlay() {
  const reduced = useReducedMotion();

  return (
    <section className="relative px-4 py-[var(--space-group)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]"
        >
          <div className="panel-strong overflow-hidden rounded-[2rem] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {commandData.map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: reduced ? 0 : -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="rounded-[var(--radius-lg)] border border-[color:var(--surface-line)] bg-black/25 p-4"
                >
                  <div className="tech-label">{label}</div>
                  <div className="mt-3 text-xl uppercase tracking-[0.14em] text-[color:var(--muted)]">{value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="panel-strong rounded-[2rem] p-6">
            <div className="tech-label">Command note</div>
            <div className="mt-4 max-w-lg text-headline text-2xl">
              Sparse by default.
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <SystemButton label="Enter Control" />
              <SystemButton label="View Fleet Map" variant="ghost" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
