"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/* Only one preview plays at a time. */
let stopPlaying: ((playing: boolean) => void) | null = null;

/* Touch screens: nothing to hover with, so the Preview button does the job. */
const noHover = "(hover: none)";
function subscribe(onChange: () => void) {
  const query = window.matchMedia(noHover);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

type PreviewCardProps = {
  title: string;
  video: { webm: string; mp4: string; poster: string };
  className?: string;
  mediaClassName?: string;
  /** The still, shown until a preview is asked for. */
  still: ReactNode;
  /** Kind, title, description and links. */
  children: ReactNode;
};

/**
 * A project card whose still fades to a muted, looping screen recording.
 * The <video> does not exist until someone hovers, focuses or taps Preview,
 * so nothing is downloaded before then. With reduced motion, hover and focus
 * do nothing and the Preview button is the only way to play.
 */
export function PreviewCard({ title, video, className, mediaClassName, still, children }: PreviewCardProps) {
  const reduced = useReducedMotion();
  const touch = useSyncExternalStore(subscribe, () => window.matchMedia(noHover).matches, () => false);
  const [asked, setAsked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  function start() {
    if (stopPlaying && stopPlaying !== setPlaying) stopPlaying(false);
    stopPlaying = setPlaying;
    setAsked(true);
    setPlaying(true);
  }
  function stop() {
    if (stopPlaying === setPlaying) stopPlaying = null;
    setPlaying(false);
  }

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (!playing) {
      element.pause();
      element.currentTime = 0;
      return;
    }

    element.currentTime = 0;
    element.play().catch(() => {});

    /* The pink line follows the video itself, so it waits while it buffers. */
    let frame = requestAnimationFrame(function tick() {
      const { currentTime, duration } = element;
      if (line.current && duration > 0) line.current.style.transform = `scaleX(${currentTime / duration})`;
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return (
    <li
      className={className}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && !reduced) start();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !reduced) stop();
      }}
      onFocus={(event) => {
        const target = event.target as HTMLElement;
        if (reduced || target === button.current) return;
        if (target.matches(":focus-visible")) start();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) stop();
      }}
    >
      <div className={mediaClassName}>
        {still}
        {asked && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-soft motion-reduce:transition-none starting:opacity-0 ${playing ? "opacity-100" : "opacity-0"}`}
          >
            <video
              ref={videoRef}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>
            <div
              ref={line}
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-0.75 w-full origin-left bg-pink"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
        {/* Always rendered so server and browser markup match. Shown on touch
            screens, and to everyone who asks for reduced motion. */}
        <button
          ref={button}
          type="button"
          aria-label={`${playing ? "Pause" : "Play"} preview of ${title}`}
          className={`btn-outline absolute right-3 bottom-3 bg-paper text-caption motion-reduce:inline-flex ${touch ? "inline-flex" : "hidden"}`}
          onClick={() => (playing ? stop() : start())}
        >
          {playing ? "Pause" : "▶ Preview"}
        </button>
      </div>
      {children}
    </li>
  );
}
