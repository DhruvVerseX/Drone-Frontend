"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BootSequence } from "@/components/experience/boot-sequence";
import { FinalDecision } from "@/components/experience/final-decision";
import { FlightPathStory } from "@/components/experience/flight-path-story";
import { LiveTelemetry } from "@/components/experience/live-telemetry";
import { MissionModes } from "@/components/experience/mission-modes";
import { SystemBreakdown } from "@/components/experience/system-breakdown";
import { UseCaseReveal } from "@/components/experience/use-case-reveal";
import { MobileMissionDock } from "@/components/navigation/mobile-mission-dock";
import { SystemNav } from "@/components/navigation/system-nav";
import { CommandOverlay } from "@/components/scene/command-overlay";
import { TacticalCursor } from "@/components/system/tactical-cursor";

export function DroneExperience() {
  const [activeMode, setActiveMode] = useState("survey");
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.25 });

  return (
    <main className="relative">
      <TacticalCursor />
      <SystemNav />
      <MobileMissionDock activeMode={activeMode} onChange={setActiveMode} />

      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-[linear-gradient(90deg,var(--cyan),var(--green))]"
      />

      <BootSequence />

      <motion.section
        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.45 }}
        className="relative px-4 py-6 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="panel-strong grid gap-4 rounded-[var(--radius-lg)] p-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Fleet", "12 units"],
              ["Mesh", "global"],
              ["Pilot", "assist"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-black/20 px-4 py-4">
                <div className="tech-label">{label}</div>
                <div className="mt-2 text-lg uppercase tracking-[0.12em] text-[color:var(--muted)]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <CommandOverlay />
      <MissionModes activeMode={activeMode} onChange={setActiveMode} />
      <FlightPathStory />
      <SystemBreakdown />
      <LiveTelemetry />
      <UseCaseReveal />
      <FinalDecision />
    </main>
  );
}
