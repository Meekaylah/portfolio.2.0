import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// jsdom is a DOM without a screen, so some browser features are missing.
// These stand-ins make them exist. Tests run as a reduced-motion user,
// so animations finish instantly and results don't depend on timing.

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: query.includes("reduce"),
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});

class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { 
        return [] 
    }
}
window.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver;

HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
}

HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
}

HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
HTMLMediaElement.prototype.pause = vi.fn();