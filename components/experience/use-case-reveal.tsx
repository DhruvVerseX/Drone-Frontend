"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCases } from "@/data/mission";

export function UseCaseReveal() {
  const reduced = useReducedMotion();

  return (
    <section className="relative px-4 py-[var(--space-section)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex max-w-3xl flex-col gap-4">
          <div className="tech-label">Environmental shifts / use-case reveal</div>
          <h2 className="text-section">The same craft becomes a different world under a different mission.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="group panel-strong flex min-h-[260px] flex-col justify-between rounded-[var(--radius-lg)] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="tech-label">{item.code}</span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/25">
                    <Icon className="h-5 w-5 text-[color:var(--text)]" />
                  </div>
                </div>
                <div>
                  <div className="text-headline text-xl">{item.title}</div>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{item.statement}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
