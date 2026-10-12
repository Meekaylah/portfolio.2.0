"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { pulse } from "@/lib/motion";

/**
 * The pink availability dot. Once the hero's entrance has finished, a soft
 * ring radiates from it every couple of seconds, like a "live" light.
 *
 * The endless pulse is a deliberate design choice: it fails WCAG 2.2.2
 * (Pause, Stop, Hide), which was accepted. With reduced motion the dot is
 * simply still.
 */
export function PulseDot({ delay }: { delay: number }) {
  const reduced = useReducedMotion();

  return (
    <span aria-hidden="true" className="relative size-2 flex-none">
      {/* Always rendered so server and browser markup match; with reduced
          motion it just fades out of sight behind the dot at once */}
      <m.span
        className="absolute inset-0 rounded-full bg-pink"
        initial={{ scale: 1, opacity: pulse.opacity }}
        animate={reduced ? { scale: 1, opacity: 0 } : { scale: pulse.scale, opacity: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: pulse.duration,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: pulse.rest,
                delay,
              }
        }
      />
      <span className="absolute inset-0 rounded-full bg-pink" />
    </span>
  );
}
