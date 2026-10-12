"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";
import { finePointer } from "@/lib/motion";

/* Features load as their own chunk. Drag only ships in domMax, so only
   devices with a mouse or trackpad download it. */
const loadFeatures = () =>
  (window.matchMedia(finePointer).matches
    ? import("@/lib/motion-features-max")
    : import("@/lib/motion-features")
  ).then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
