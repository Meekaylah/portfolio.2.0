import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PreviewCard } from "@/components/sections/PreviewCard";

describe("PreviewCard", () => {
    it("plays and stops the preview from the button", async () => {
        const user = userEvent.setup();
        render(
            <ul>
                <PreviewCard title="Demo" video="/demo.mp4" still={<div>still</div>}>
                    <p>details</p>
                </PreviewCard>
            </ul>,
        );

        // No <video> exists until someone asks for one, so nothing downloads early.
        expect(screen.queryByLabelText("Screen recording of Demo")).not.toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Play preview of Demo" }));
        expect(screen.getByLabelText("Screen recording of Demo")).toBeInTheDocument();
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Pause preview of Demo"}));
        expect(screen.queryByLabelText("Screen recording of Demo")).not.toBeInTheDocument();
    })
})