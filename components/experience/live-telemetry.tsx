"use client";

import { motion, useReducedMotion } from "framer-motion";
import { telemetryStats } from "@/data/mission";

export function LiveTelemetry() {
  const reduced = useReducedMotion();

  return (
    <section id="live" className="relative px-4 py-[var(--space-section)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="tech-label">Live data / telemetry environment</div>
            <h2 className="text-section max-w-lg">Live telemetry.</h2>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel-strong overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {telemetryStats.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={reduced ? undefined : { y: -3 }}
                  className="rounded-[var(--radius-lg)] border border-[color:var(--surface-line)] bg-[rgba(6,10,15,0.74)] p-5"
                >
                  <div className="tech-label">{stat.label}</div>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div className="text-4xl leading-none">{stat.value}</div>
                    <div className="rounded-full border border-[color:var(--surface-line)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--cyan)]">
                      {stat.delta}
                    </div>
                  </div>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      initial={{ scaleX: 0.15 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.05 }}
                      className="h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green))]"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="panel-strong rounded-[2rem] p-6">
            <div className="tech-label">Signal climate</div>
            <div className="mt-4 text-headline text-2xl">Weather. Load. Camera.</div>
            <div className="mt-8 space-y-4">
              {[
                "Wind corrected.",
                "Reserve balanced.",
                "Optics steady."
              ].map((item, index) => (
                <div key={item} className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] px-4 py-4">
                  <div className="tech-label">{`telemetry note 0${index + 1}`}</div>
                  <div className="mt-3 text-[color:var(--muted)]">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
