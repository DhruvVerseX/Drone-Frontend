"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";

export function TacticalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const syncEnabled = () => setEnabled(!reduced && mediaQuery.matches);

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => {
      mediaQuery.removeEventListener("change", syncEnabled);
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !ringRef.current) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      gsap.set([cursor, ring], { autoAlpha: 1 });
      xToCursor(event.clientX);
      yToCursor(event.clientY);
      xToRing(event.clientX);
      yToRing(event.clientY);
    };

    const handleLeave = () => {
      gsap.to([cursor, ring], { autoAlpha: 0, duration: 0.2, overwrite: true });
    };

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, summary, [data-cursor='active']";

    const handleInteractiveEnter = () => {
      gsap.to(ring, { scale: 1.6, borderColor: "rgba(119, 229, 255, 0.6)", duration: 0.18, overwrite: true });
      gsap.to(cursor, { scale: 0.85, backgroundColor: "#80ffb4", duration: 0.18, overwrite: true });
    };

    const handleInteractiveLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(190, 215, 237, 0.3)", duration: 0.18, overwrite: true });
      gsap.to(cursor, { scale: 1, backgroundColor: "#77e5ff", duration: 0.18, overwrite: true });
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    const interactiveNodes = document.querySelectorAll<HTMLElement>(interactiveSelector);
    interactiveNodes.forEach((node) => {
      node.addEventListener("pointerenter", handleInteractiveEnter);
      node.addEventListener("pointerleave", handleInteractiveLeave);
    });

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      interactiveNodes.forEach((node) => {
        node.removeEventListener("pointerenter", handleInteractiveEnter);
        node.removeEventListener("pointerleave", handleInteractiveLeave);
      });
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(190,215,237,0.3)] opacity-0"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--cyan)] opacity-0 shadow-[0_0_18px_rgba(119,229,255,0.45)]"
      />
    </>
  );
}
