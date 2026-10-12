"use client";

import { useReducedMotion } from "motion/react";

/* ← → for the project row. Hidden below 720px, where the row is swiped. */
export function ScrollButtons({ targetId }: { targetId: string }) {
  const reduced = useReducedMotion();

  function scroll(direction: 1 | -1) {
    const track = document.getElementById(targetId);
    if (!track) return;
    track.scrollBy({
      left: Math.max(300, track.clientWidth * 0.7) * direction,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div className="flex gap-2.5 max-nav:hidden">
      <button
        type="button"
        aria-label="Previous projects"
        className="btn-outline size-12 p-0 text-[1.125rem]"
        onClick={() => scroll(-1)}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next projects"
        className="btn-outline size-12 bg-ink p-0 text-[1.125rem] text-paper hover:border-rose hover:bg-rose"
        onClick={() => scroll(1)}
      >
        →
      </button>
    </div>
  );
}
