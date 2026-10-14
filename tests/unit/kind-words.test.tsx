import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LazyMotion, domAnimation } from "motion/react";
import { describe, expect, it } from "vitest";
import { KindWords } from "@/components/sections/KindWords";
import type { Note } from "@/content/notes";

const note = (n: number ) : Note => ({
    id: `n${n}`,
    name: `Person ${n}`,
    relationship: `Colleague ${n}`,
    role: `Role ${n}`,
    date: "May 2026",
    quote: `Quote number ${n}`,
})

// The site wraps everything in LazyMotion; tests do the same.
function renderWords(notes: Note[]) {
    return render(
        <LazyMotion features={domAnimation}>
            <KindWords notes={notes} />
        </LazyMotion>
    )
}

describe("Kind words", () => {
    it("shows a blank letter when there are no notes", () => {
        renderWords([]);
        expect(screen.getByText("Dear Michaela,")).toBeInTheDocument();
        const link = screen.getByRole("link", { name: "Write me a note" });
        expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/michaela-usanga/edit/forms/recommendation/write");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("shows just the letter for one note", () => {
        renderWords([note(1)]);
        expect(screen.getByText("Quote number 1")).toBeInTheDocument();
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    })

    it("shows a From list for two or more notes", () => {
        renderWords([note(1), note(2), note(3)]);
        expect(screen.getByRole("tablist")).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /Person 1/ })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /Person 2/ })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /Person 3/ })).toBeInTheDocument();
    })

    it("moves between notes with the arrow keys", async () => {
        const user = userEvent.setup();
        renderWords([note(1), note(2), note(3)]);
        const tabs = screen.getAllByRole("tab");

        await user.click(tabs[0]);
        await user.keyboard("{ArrowDown}");
        expect(tabs[1]).toHaveAttribute("aria-selected", "true");
        expect(tabs[1]).toHaveFocus();
        expect(await screen.findByText("Quote number 2")).toBeInTheDocument();
        
        await user.keyboard("{ArrowDown}");
        expect(tabs[2]).toHaveAttribute("aria-selected", "true");
        expect(tabs[2]).toHaveFocus();
        expect(await screen.findByText("Quote number 3")).toBeInTheDocument();

        await user.keyboard("{ArrowDown}");
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
        expect(tabs[0]).toHaveFocus();
        expect(await screen.findByText("Quote number 1")).toBeInTheDocument();
    })
})
