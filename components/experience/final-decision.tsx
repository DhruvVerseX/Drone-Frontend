"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SystemButton } from "@/components/ui/system-button";

export function FinalDecision() {
  const reduced = useReducedMotion();

  return (
    <section
      id="deploy"
      className="relative px-4 pb-16 pt-[var(--space-section)] sm:px-6 lg:px-10 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5 }}
          className="panel-strong mission-gradient overflow-hidden rounded-[2.25rem] p-6 sm:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="tech-label">Decision moment / final close</div>
              <div className="mt-4 text-hero max-w-3xl text-[clamp(3rem,8vw,6rem)]">
                Choose
                <br />
                mission
                <br />
                command
              </div>
            </div>

            <div className="flex flex-col justify-end gap-5">
              <p className="max-w-lg text-subhead">
                No soft handoff. Pick the operating frame and move. Deployment starts when intention becomes
                explicit.
              </p>
              <div className="flex flex-wrap gap-3">
                <SystemButton label="Request Deployment" />
                <SystemButton label="Configure Fleet" variant="ghost" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
