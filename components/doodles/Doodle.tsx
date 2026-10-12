"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";
import { drawIn, fadeIn, finePointer, snapHome, softSpring, wiggle } from "@/lib/motion";

/* Each stroke inside a doodle draws with the doodle's own delay. */
const DrawContext = createContext<{ delay: number; still: boolean }>({ delay: 0, still: false });

function subscribeToPointer(onChange: () => void) {
  const query = window.matchMedia(finePointer);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia(finePointer).matches,
    () => false,
  );
}

type DoodleProps = {
  /** Position within the nearest positioned ancestor, e.g. "left-[9%] top-[12%]". */
  className?: string;
  /** Seconds before this doodle starts drawing itself in. */
  delay?: number;
  width: number;
  height: number;
  viewBox: string;
  children: ReactNode;
};

/**
 * A decorative hand-drawn mark. Draws itself in once, wiggles on hover and,
 * with a mouse or trackpad, can be picked up and flung; it springs back home.
 * With reduced motion it simply appears, fully drawn and still.
 */
export function Doodle({ className = "", delay = 0, width, height, viewBox, children }: DoodleProps) {
  const still = useReducedMotion() ?? false;
  const canDrag = useFinePointer() && !still;

  return (
    <m.div
      aria-hidden="true"
      className={`absolute select-none ${canDrag ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      initial="hidden"
      animate="shown"
      variants={{
        hidden: { opacity: 0 },
        shown: {
          opacity: 1,
          transition: {
            opacity: still ? { duration: 0 } : { ...fadeIn, delay },
            default: softSpring,
          },
        },
      }}
      whileHover={still ? undefined : wiggle}
      drag={canDrag}
      dragSnapToOrigin
      dragTransition={snapHome}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className="block max-nav:scale-[.72]"
        focusable="false"
      >
        <DrawContext value={{ delay, still }}>{children}</DrawContext>
      </svg>
    </m.div>
  );
}

function useDraw() {
  const { delay, still } = useContext(DrawContext);
  return {
    hidden: { pathLength: 0 },
    shown: {
      pathLength: 1,
      transition: still ? { duration: 0 } : { ...drawIn, delay },
    },
  };
}

/** A path that draws itself in. Fills show straight away, under the doodle's fade. */
export function Stroke(props: ComponentProps<typeof m.path>) {
  return <m.path variants={useDraw()} {...props} />;
}

export function Oval(props: ComponentProps<typeof m.ellipse>) {
  return <m.ellipse variants={useDraw()} {...props} />;
}
