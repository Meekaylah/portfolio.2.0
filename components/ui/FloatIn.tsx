"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeIn, floatIn } from "@/lib/motion";

/**
 * Rises 14px and fades in the first time it scrolls into view. Used on each
 * section's heading (order 0) and first block (order 1), 80ms apart.
 */
export function FloatIn({ order = 0, className, children }: { order?: number; className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <m.div
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={floatIn}
      transition={reduced ? { duration: 0 } : { ...fadeIn, delay: order * 0.08 }}
    >
      {children}
    </m.div>
  );
}
