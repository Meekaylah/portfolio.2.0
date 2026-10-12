import type { ReactNode } from "react";
import type { Note } from "@/content/notes";

/* The ruled sheet with its pink paperclip. Tilted on wide screens, straight once stacked. */
export function Sheet({
  className = "",
  children,
  ...props
}: { className?: string; children: ReactNode } & React.ComponentProps<"article">) {
  return (
    <article
      className={`relative -rotate-[1.2deg] border border-line paper-ruled px-[clamp(24px,5vw,64px)] pt-13 pb-11 max-stack:rotate-0 ${className}`}
      {...props}
    >
      <svg aria-hidden="true" focusable="false" width={34} height={76} viewBox="0 0 34 76" className="absolute -top-[22px] left-12">
        <path d="M10 52 L10 14 C10 6 24 6 24 14 L24 60 C24 70 6 70 6 60 L6 22" className="fill-none stroke-pink" strokeWidth={2.6} strokeLinecap="round" />
      </svg>
      {children}
    </article>
  );
}

/* A second sheet peeking out behind, when there is more than one note. */
export function BackSheet() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[34px] -right-1.5 -bottom-2.5 left-[30px] rotate-2 border border-line bg-paper-deep max-stack:hidden"
    />
  );
}

export function NoteBody({ note }: { note: Note }) {
  return (
    <>
      <p className="text-label tracking-normal text-ink-muted">{note.date}</p>
      <blockquote className="mt-5 max-w-[34em] font-display text-quote">{note.quote}</blockquote>
      <div className="mt-9 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <svg aria-hidden="true" focusable="false" width={64} height={12} viewBox="0 0 64 12">
            <path d="M2 8 C 14 3, 30 10, 44 5 S 58 4, 62 7" className="fill-none stroke-ink" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
          <p className="mt-1 font-display text-[1.1875rem]">{note.name}</p>
          <p className="text-caption text-ink-soft">{note.role}</p>
        </div>
        {note.link && (
          <a href={note.link.href} className="link-mark inline-flex min-h-11 items-center text-caption">
            {note.link.label}
          </a>
        )}
      </div>
    </>
  );
}

export function LoveANote() {
  return (
    <p className="mt-6 text-small text-ink-soft">
      Worked with me?{" "}
      <a href="#contact" className="link-mark inline-flex min-h-11 items-center text-ink">
        I&apos;d love a note
      </a>
    </p>
  );
}
