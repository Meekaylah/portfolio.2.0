import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducedMotion } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PreviewCard } from "@/components/sections/PreviewCard";

vi.mock("motion/react", () => ({ useReducedMotion: vi.fn() }));

const video = { webm: "/demo.webm", mp4: "/demo.mp4", poster: "/demo-poster.jpg" };
const play = vi.mocked(HTMLMediaElement.prototype.play);
const pause = vi.mocked(HTMLMediaElement.prototype.pause);

function renderCard() {
    return render(
        <ul>
            <PreviewCard title="Demo" video={video} still={<div role="img" aria-label="Demo home page" />}>
                <a href="https://example.com">View project</a>
            </PreviewCard>
        </ul>,
    );
}

/* The setup file answers every media query as a reduced-motion user would;
   this one answers as a phone: nothing to hover with. */
function onATouchScreen() {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query) =>
            ({
                matches: query.includes("hover: none"),
                media: query,
                addEventListener: () => {},
                removeEventListener: () => {},
            }) as unknown as MediaQueryList,
    );
}

/* jsdom can't tell keyboard focus from a click, so report the link as
   :focus-visible, as a browser would after Tab. */
function keyboardFocus() {
    const matches = Element.prototype.matches;
    vi.spyOn(HTMLAnchorElement.prototype, "matches").mockImplementation(function (this: Element, selector) {
        return selector === ":focus-visible" || matches.call(this, selector);
    });
}

describe("PreviewCard", () => {
    beforeEach(() => {
        play.mockClear();
        pause.mockClear();
        vi.mocked(useReducedMotion).mockReturnValue(false);
    });

    it("shows the still, and no video until someone asks for one", () => {
        const { container } = renderCard();

        expect(screen.getByRole("img", { name: "Demo home page" })).toBeInTheDocument();
        // No <video> exists yet, so nothing downloads early.
        expect(container.querySelector("video")).not.toBeInTheDocument();
        expect(play).not.toHaveBeenCalled();
    });

    it("plays from the start when the card is focused, and resets on blur", async () => {
        const user = userEvent.setup();
        const { container } = renderCard();

        // jsdom has no stylesheet, so do what the button's `hidden` class does.
        screen.getByRole("button", { name: "Play preview of Demo" }).style.display = "none";
        keyboardFocus();
        await user.tab();
        expect(screen.getByRole("link", { name: "View project" })).toHaveFocus();

        const element = container.querySelector("video")!;
        expect(element).toHaveAttribute("aria-hidden", "true");
        expect(element).toHaveAttribute("preload", "none");
        expect(element).toHaveAttribute("poster", "/demo-poster.jpg");
        expect(element).not.toHaveAttribute("controls");
        expect(element).not.toHaveAttribute("src");
        expect(element.muted).toBe(true);
        expect(element.loop).toBe(true);
        expect([...element.querySelectorAll("source")].map((source) => source.getAttribute("src"))).toEqual([
            "/demo.webm",
            "/demo.mp4",
        ]);
        expect(play).toHaveBeenCalledTimes(1);

        element.currentTime = 4;
        await user.tab();
        expect(document.body).toHaveFocus();
        expect(pause).toHaveBeenCalled();
        expect(element.currentTime).toBe(0);
    });

    it("does not autoplay on focus with reduced motion", async () => {
        vi.mocked(useReducedMotion).mockReturnValue(true);
        const user = userEvent.setup();
        const { container } = renderCard();

        keyboardFocus();
        await user.tab();
        await user.tab();
        expect(screen.getByRole("link", { name: "View project" })).toHaveFocus();
        expect(container.querySelector("video")).not.toBeInTheDocument();
        expect(play).not.toHaveBeenCalled();

        // The Preview button still works: it is the only way to play.
        await user.click(screen.getByRole("button", { name: "Play preview of Demo" }));
        expect(play).toHaveBeenCalledTimes(1);
    });

    it("plays and pauses from the Preview button on a touch screen", async () => {
        onATouchScreen();
        const user = userEvent.setup();
        // A finger, not a mouse: a mouse would start the preview just by arriving.
        const tap = (target: Element) => user.pointer({ keys: "[TouchA]", target });
        const { container } = renderCard();

        const button = screen.getByRole("button", { name: "Play preview of Demo" });
        expect(button).toHaveClass("inline-flex");
        expect(button).not.toHaveClass("hidden");

        await tap(button);
        expect(container.querySelector("video")).toBeInTheDocument();
        expect(play).toHaveBeenCalledTimes(1);
        expect(pause).not.toHaveBeenCalled();

        await tap(screen.getByRole("button", { name: "Pause preview of Demo" }));
        expect(pause).toHaveBeenCalledTimes(1);
        expect(play).toHaveBeenCalledTimes(1);

        await tap(screen.getByRole("button", { name: "Play preview of Demo" }));
        expect(play).toHaveBeenCalledTimes(2);
    });

    it("keeps the Preview button out of the way where there is a mouse", () => {
        renderCard();
        expect(screen.getByRole("button", { name: "Play preview of Demo" })).toHaveClass("hidden");
    });
});
