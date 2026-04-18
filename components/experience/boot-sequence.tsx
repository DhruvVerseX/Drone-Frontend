"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const bootLines = [
  "vector aligned",
  "terrain live",
  "optic stable",
  "route ready"
];

const DroneCanvas = dynamic(
  () => import("@/components/scene/drone-canvas").then((module) => module.DroneCanvas),
  {
    ssr: false
  }
);

export function BootSequence() {
  const reduced = useReducedMotion();

  return (
    <section
      id="boot"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-14 pt-32 sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <div className="tech-label mb-6">System entry / boot sequence</div>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="text-hero">
              Drone
              <br />
              command
              <br />
              live
            </div>
            <p className="mt-6 max-w-md text-subhead">Flight. Scan. Deliver.</p>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:max-w-xl">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: reduced ? 0 : -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + index * 0.08 }}
                className="panel flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3"
              >
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[color:var(--subtle)]">
                  {`0${index + 1}`}
                </span>
                <span className="text-sm uppercase tracking-[0.16em] text-[color:var(--muted)]">{line}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--green)]" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="mission-gradient panel-strong relative min-h-[520px] overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 opacity-60">
              <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--surface-line)]" />
              <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--surface-line)]" />
              <div className="absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--surface-strong)]" />
              <div className="absolute left-[12%] top-[24%] h-px w-[76%] bg-[color:var(--surface-line)]" />
              <div className="absolute left-[24%] top-[12%] h-[76%] w-px bg-[color:var(--surface-line)]" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="tech-label">Flight object / aerial shell</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    VT-9 vector drone
                  </div>
                </div>
                <div className="rounded-full border border-[color:var(--surface-line)] px-3 py-2 text-xs uppercase tracking-[0.22em] text-[color:var(--cyan)]">
                  clearance granted
                </div>
              </div>

              <div className="relative mx-auto my-10 flex h-72 w-full max-w-md items-center justify-center">
                <motion.div
                  animate={reduced ? undefined : { y: [0, -6, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
                  className="relative h-full w-full will-transform"
                >
                  <DroneCanvas />
                </motion.div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Wind", "08 kn"],
                  ["Lock", "1,260 m"],
                  ["Hull", "37 C"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-black/20 px-4 py-3">
                    <div className="tech-label">{label}</div>
                    <div className="mt-2 text-2xl font-medium text-[color:var(--text)]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
