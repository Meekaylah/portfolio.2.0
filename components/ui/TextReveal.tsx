"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView, useReducedMotion } from "motion/react";
import { revealTiming } from "@/lib/motion";

const ease = [0.23, 1, 0.32, 1] as const;
const hidden = { opacity: 0, y: 10, filter: "blur(8px)" };
const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Text that arrives word by word, each rising out of a blur, once it scrolls
 * into view. Screen readers get the plain sentence; with reduced motion it
 * simply appears.
 */
export function TextReveal({
  text,
  delay = 0,
  stagger,
  className,
}: {
  text: string;
  /** Seconds to wait before the first word, for sequencing with other animation. */
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const { words, step, wordDuration } = revealTiming(text, stagger);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            {index > 0 && " "}
            <m.span
              data-reveal=""
              className="inline-block"
              initial={hidden}
              animate={inView ? shown : hidden}
              transition={reduced ? { duration: 0 } : { duration: wordDuration, ease, delay: inView ? delay + index * step : 0 }}
            >
              {word}
            </m.span>
          </span>
        ))}
      </span>
    </span>
  );
}
