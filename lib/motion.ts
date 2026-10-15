import type { Transition, Variants } from "motion/react";

export const easeSoft = [0.22, 1, 0.36, 1] as const; // matches --ease-soft in globals.css

export const drawIn: Transition = { duration: 1.1, ease: easeSoft };
export const fadeIn: Transition = { duration: 0.5, ease: easeSoft };

/* Hover wiggle and the spring that carries a dragged doodle home. */
export const wiggle = { rotate: -6, scale: 1.06 };
export const softSpring: Transition = { type: "spring", stiffness: 300, damping: 20 };
export const snapHome = { bounceStiffness: 300, bounceDamping: 20 };

/* A 14px rise. Used with transition={{ ...fadeIn, delay }} so each element can be staggered. */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
};

/* Devices with a real hover pointer: the only ones that get doodle drag. */
export const finePointer = "(hover: hover) and (pointer: fine)";

/* Hero headline: starts as the last doodles begin drawing, lead first, then the rest. */
export const headline = { delay: 0.9, stagger: 0.055, pause: 0.25 };

/* TextReveal timing: each word takes 0.6s, and the stagger between words is
   squeezed so a whole line never takes longer than 1.6s. Shared here so the
   hero can tell when its headline has finished. */
const wordDuration = 0.6;
export function revealTiming(text: string, stagger = headline.stagger) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const step = words.length > 1 ? Math.min(stagger, (1.6 - wordDuration) / (words.length - 1)) : 0;
  return { words, step, wordDuration, total: Math.max(0, words.length - 1) * step + wordDuration };
}

/* The availability dot's ring: a soft pulse every couple of seconds, forever. */
export const pulse = { scale: 2.5, opacity: 0.35, duration: 1.6, rest: 0.6 };
