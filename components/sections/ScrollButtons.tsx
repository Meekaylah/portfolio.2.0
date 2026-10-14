"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/* ← → for the project row. Only there when the row is wider than its track,
   so they go away once every project fits on screen. */
export function ScrollButtons({ targetId }: { targetId: string }) {
  const reduced = useReducedMotion();
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const track = document.getElementById(targetId);
    if (!track) return;
    const observer = new ResizeObserver(() => setOverflows(track.scrollWidth > track.clientWidth + 1));
    observer.observe(track);
    return () => observer.disconnect();
  }, [targetId]);

  function scroll(direction: 1 | -1) {
    const track = document.getElementById(targetId);
    if (!track) return;
    track.scrollBy({
      left: Math.max(300, track.clientWidth * 0.7) * direction,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div className={overflows ? "flex gap-2.5" : "hidden"}>
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
        className="btn-outline size-12 bg-ink p-0 text-[1.125rem] text-paper [--btn-fill:var(--color-rose)] hover:border-rose"
        onClick={() => scroll(1)}
      >
        →
      </button>
    </div>
  );
}
