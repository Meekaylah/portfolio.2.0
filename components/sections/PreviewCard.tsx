"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Only one preview plays at a time. */
let stopPlaying: ((playing: boolean) => void) | null = null;

type PreviewCardProps = {
  title: string;
  video: string;
  poster?: string;
  className?: string;
  mediaClassName?: string;
  /** The still, shown until a preview is asked for. */
  still: ReactNode;
  /** Kind, title, description and links. */
  children: ReactNode;
};

/**
 * A project card whose still swaps for a muted, looping screen recording.
 * The <video> does not exist until someone hovers, focuses or taps Preview,
 * so nothing is downloaded before then. With reduced motion, hover and focus
 * do nothing and the Preview button is the only way to play.
 */
export function PreviewCard({ title, video, poster, className, mediaClassName, still, children }: PreviewCardProps) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(6);
  const videoRef = useRef<HTMLVideoElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  function start() {
    if (stopPlaying && stopPlaying !== setPlaying) stopPlaying(false);
    stopPlaying = setPlaying;
    setPlaying(true);
  }
  function stop() {
    if (stopPlaying === setPlaying) stopPlaying = null;
    setPlaying(false);
  }

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => {});
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
        {playing && (
          <>
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
              aria-label={`Screen recording of ${title}`}
              className="absolute inset-0 size-full object-cover"
              onLoadedMetadata={(event) => {
                const seconds = event.currentTarget.duration;
                if (Number.isFinite(seconds) && seconds > 0) setDuration(seconds);
              }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[3px] animate-progress bg-pink motion-reduce:w-2/5 motion-reduce:animate-none"
              style={{ animationDuration: `${duration}s` }}
            />
          </>
        )}
        <button
          ref={button}
          type="button"
          aria-label={`${playing ? "Pause" : "Play"} preview of ${title}`}
          className="btn-outline absolute right-3 bottom-3 hidden bg-paper text-caption motion-reduce:inline-flex [@media(hover:none)]:inline-flex"
          onClick={() => (playing ? stop() : start())}
        >
          {playing ? "Pause" : "▶ Preview"}
        </button>
      </div>
      {children}
    </li>
  );
}
