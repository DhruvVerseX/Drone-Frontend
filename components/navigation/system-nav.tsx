"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Navigation, Orbit } from "lucide-react";

const navItems = ["Boot", "Modes", "Path", "Systems", "Live", "Deploy"];

export function SystemNav() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2"
    >
      <div className="panel-strong rounded-[var(--radius-full)] px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/30">
              <Orbit className="h-4 w-4 text-[color:var(--cyan)]" />
            </div>
            <div>
              <div className="tech-label">AERCTRL / Fleet Link</div>
              <div className="text-sm text-[color:var(--muted)]">Grid 19.324 / Active signal</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[color:var(--surface-line)] bg-black/25 px-2 py-2 lg:flex">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--subtle)] transition-colors duration-200 hover:text-[color:var(--text)]"
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1} {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <div className="hidden rounded-full border border-[color:var(--surface-line)] px-3 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)] sm:block">
              Mission UI
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/30 text-[color:var(--cyan)]">
              <Navigation className="h-4 w-4" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--surface-line)] bg-black/30 text-[color:var(--green)]">
              <Compass className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
