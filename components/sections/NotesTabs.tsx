"use client";

import { FloatIn } from "@/components/ui/FloatIn";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import type { Note } from "@/content/notes";
import { BackSheet, LoveANote, NoteBody, Sheet } from "./Letter";

const dots = ["bg-petal", "bg-sage", "bg-butter"];

/* Matches max-stack: (below 820px), where the list turns into a row. */
const stacked = "(width < 51.25rem)";
function subscribe(onChange: () => void) {
  const query = window.matchMedia(stacked);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Two or more notes: a "From" list that works as tabs for the letter.
 * Arrow keys, Home and End move between people and the letter follows.
 */
export function NotesTabs({ notes, heading }: { notes: Note[]; heading: ReactNode }) {
  const reduced = useReducedMotion();
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const isRow = useSyncExternalStore(subscribe, () => window.matchMedia(stacked).matches, () => false);
  const note = notes[selected];

  function onKeyDown(event: KeyboardEvent) {
    const last = notes.length - 1;
    const next = {
      ArrowDown: selected === last ? 0 : selected + 1,
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowUp: selected === 0 ? last : selected - 1,
      ArrowLeft: selected === 0 ? last : selected - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <FloatIn className="flex min-w-0 flex-col gap-4">
        {heading}
        <p className="mt-5 eyebrow">From</p>
        <div
          role="tablist"
          aria-label="Choose a note"
          aria-orientation={isRow ? "horizontal" : "vertical"}
          className="flex flex-col gap-1.5 max-stack:-m-1.5 max-stack:flex-row max-stack:gap-2 max-stack:overflow-x-auto max-stack:p-1.5"
          onKeyDown={onKeyDown}
        >
          {notes.map((person, index) => {
            const on = index === selected;
            return (
              <button
                key={person.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                className={`flex min-h-13 flex-none items-center gap-3 rounded-button border-[1.5px] px-3 py-2 text-left transition-colors duration-150 ${
                  on ? "border-ink bg-paper-raised" : "border-transparent hover:bg-blush"
                }`}
                onClick={() => setSelected(index)}
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex size-9 flex-none items-center justify-center rounded-full border-[1.5px] border-ink font-display text-caption ${dots[index % dots.length]}`}
                >
                  {person.name.replace(/^\W+/, "").charAt(0).toUpperCase()}
                </span>
                <span className="flex flex-col items-start">
                  <span className="text-body">{person.name}</span>
                  <span className="text-label tracking-normal text-ink-muted">{person.relationship}</span>
                </span>
              </button>
            );
          })}
        </div>
        <LoveANote />
      </FloatIn>

      <FloatIn order={1} className="relative min-w-0 px-2 pt-4.5 pb-2">
        <BackSheet />
        <Sheet
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${selected}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            >
              <NoteBody note={note} />
            </m.div>
          </AnimatePresence>
        </Sheet>
      </FloatIn>
    </>
  );
}
