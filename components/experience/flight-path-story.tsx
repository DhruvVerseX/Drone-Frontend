"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";

const pathStops = [
  ["Rise", "Clean air."],
  ["Read", "Terrain live."],
  ["Scan", "Target lock."],
  ["Return", "Reserve holds."]
];

export function FlightPathStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !pathRef.current) {
      return;
    }

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { yPercent: 12, opacity: 0.4 },
        {
          yPercent: -12,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: true
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".path-stop").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              end: "bottom 52%",
              scrub: 0.6
            },
            delay: index * 0.04
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      id="path"
      ref={sectionRef}
      className="relative px-4 py-[var(--space-section)] sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex max-w-3xl flex-col gap-4">
          <div className="tech-label">Mission path / scroll narrative</div>
          <h2 className="text-section">Follow the route.</h2>
        </div>

        <div
          ref={pathRef}
          className="panel-strong relative overflow-hidden rounded-[2rem] px-5 py-6 sm:px-8 sm:py-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[480px] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--surface-line)] bg-[rgba(5,8,13,0.84)]">
              <div className="absolute inset-0 opacity-80">
                <div className="absolute left-[10%] top-[18%] h-[3px] w-[68%] -rotate-[18deg] rounded-full bg-[color:var(--cyan)] shadow-[0_0_18px_rgba(119,229,255,0.4)]" />
                <div className="absolute left-[22%] top-[38%] h-[3px] w-[52%] rotate-[9deg] rounded-full bg-[color:var(--green)] shadow-[0_0_16px_rgba(128,255,180,0.35)]" />
                <div className="absolute left-[40%] top-[64%] h-[3px] w-[38%] -rotate-[16deg] rounded-full bg-[color:var(--amber)] shadow-[0_0_16px_rgba(255,196,107,0.32)]" />
                {["16%", "38%", "62%", "78%"].map((left, index) => (
                  <div
                    key={left}
                    className="absolute top-[18%] h-4 w-4 rounded-full border border-[color:var(--surface-strong)] bg-[rgba(5,8,13,0.9)]"
                    style={{ left, top: `${18 + index * 18}%` }}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-[color:var(--cyan)]" />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["Altitude", "1,260 m"],
                  ["Range", "42 km"],
                  ["Phase", "active"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[var(--radius-md)] border border-[color:var(--surface-line)] bg-black/30 px-3 py-3">
                    <div className="tech-label">{label}</div>
                    <div className="mt-2 text-lg uppercase tracking-[0.12em]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {pathStops.map(([title, copy], index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="path-stop rounded-[var(--radius-lg)] border border-[color:var(--surface-line)] bg-[rgba(8,12,19,0.7)] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-headline text-[1.15rem]">{title}</div>
                    <div className="tech-label">{`0${index + 1}`}</div>
                  </div>
                  <p className="mt-4 max-w-xl text-subhead">{copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
