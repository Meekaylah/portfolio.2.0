import { FloatIn } from "@/components/ui/FloatIn";
import { notes as allNotes, type Note } from "@/content/notes";
import { LoveANote, NoteBody, Sheet } from "./Letter";
import { NotesTabs } from "./NotesTabs";

function Heading({ waiting = false }: { waiting?: boolean }) {
  return (
    <>
      <h2 id="words-title" className="text-h2">
        Kind words
      </h2>
      <p className="text-lead text-ink-soft">
        Notes from people I&apos;ve worked with, kept as they wrote them.
        {waiting && " This page is still waiting for its first one."}
      </p>
    </>
  );
}

/* No notes yet: a blank letter, waiting to be written. */
function EmptyLetter() {
  return (
    <Sheet aria-labelledby="blank-note" className="flex min-h-95 flex-col">
      <p id="blank-note" className="font-display text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.3]">
        Dear Michaela,
      </p>
      <div aria-hidden="true" className="mt-3.5 flex h-9 items-center">
        <span className="h-6.5 w-0.5 animate-blink bg-pink motion-reduce:animate-none" />
      </div>
      <div className="flex-1" />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-[1.1875rem] text-ink-muted">— you?</p>
          <p className="max-w-90 text-small text-ink-soft">
            If we&apos;ve worked together, I&apos;d love to hear how it went. A couple of sentences is plenty.
          </p>
        </div>
        <a href="#contact" className="btn">
          Write me a note
        </a>
      </div>
    </Sheet>
  );
}

/** Adapts to how many notes there are: none, one, or a list to choose from. */
export function KindWords({ notes = allNotes }: { notes?: Note[] }) {
  return (
    <section id="words" aria-labelledby="words-title" className="px-6 pt-22 pb-24">
      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,360px)_minmax(0,1fr)] items-start gap-18 max-stack:grid-cols-1 max-stack:gap-8">
        {notes.length >= 2 ? (
          <NotesTabs notes={notes} heading={<Heading />} />
        ) : (
          <>
            <FloatIn className="flex flex-col gap-4">
              <Heading waiting={notes.length === 0} />
              {notes.length === 1 && <LoveANote />}
            </FloatIn>
            <FloatIn order={1} className="relative px-2 pt-4.5 pb-2">
              {notes.length === 1 ? (
                <Sheet aria-label={`Note from ${notes[0].name}`}>
                  <NoteBody note={notes[0]} />
                </Sheet>
              ) : (
                <EmptyLetter />
              )}
            </FloatIn>
          </>
        )}
      </div>
    </section>
  );
}
