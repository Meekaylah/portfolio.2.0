import type { Transition, Variants } from "motion/react";

/* Mirrors the motion tokens in app/globals.css. */
export const easeSoft = [0.22, 1, 0.36, 1] as const; // --ease-soft

export const drawIn: Transition = { duration: 1.1, ease: easeSoft }; // --animate-draw
export const fadeIn: Transition = { duration: 0.5, ease: easeSoft };

/* Hover wiggle and the spring that carries a dragged doodle home. */
export const wiggle = { rotate: -6, scale: 1.06 };
export const softSpring: Transition = { type: "spring", stiffness: 300, damping: 20 };
export const snapHome = { bounceStiffness: 300, bounceDamping: 20 };

/* --animate-float-in: 14px rise over 0.5s, children staggered 80ms. */
export const floatInGroup: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};
/* Used with transition={{ ...fadeIn, delay }} so each element can be staggered. */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
};

/* Devices with a real hover pointer: the only ones that get doodle drag. */
export const finePointer = "(hover: hover) and (pointer: fine)";

/* Hero headline: starts as the last doodles begin drawing, lead first, then the rest. */
export const headline = { delay: 0.9, stagger: 0.055, pause: 0.25 };

/* How long a TextReveal takes to finish, mirroring its own timing
   (0.6s per word, stagger squeezed to keep the whole under 1.6s). */
export function revealDuration(text: string, stagger = headline.stagger) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words <= 1) return 0.6;
  return (words - 1) * Math.min(stagger, (1.6 - 0.6) / (words - 1)) + 0.6;
}

/* The availability dot's ring: a soft pulse every couple of seconds, forever. */
export const pulse = { scale: 2.5, opacity: 0.35, duration: 1.6, rest: 0.6 };
