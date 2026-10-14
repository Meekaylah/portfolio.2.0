import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MessageButton, MessageDialog } from "@/components/sections/MessageDialog";
import { site } from "@/content/site";

function setup() {
    const user = userEvent.setup();
    render(
        <>
            <MessageButton />
            <MessageDialog copy={site.contact.form} email="ada@example.com" />
        </>,
    );
    return user;
}

describe("Message dialog", () => {
    it("explains what's missing and focuses the first problem", async () => {
        const user = setup();
        await user.click(screen.getByRole("button", { name: "leave a message" }));
        await user.click(screen.getByRole("button", { name: "Send" }));

        expect(screen.getByText("Please tell me your name.")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toHaveFocus();
        expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    });

    it("changes the message label with the I'm... choice", async () => {
        const user = setup();
        await user.click(screen.getByRole("button", { name: "leave a message" }));
        await user.click(screen.getByLabelText("Hiring"));
        expect(screen.getByLabelText("Tell me about the role")).toBeInTheDocument();
    });

    it("sends a valid message and says thank you", async () => {
        //Pretend the server said OK: the test shouldn't send real email.
        const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ok: true}));
        const user = setup();
        await user.click(screen.getByRole("button", { name: "leave a message" }));
        await user.type(screen.getByLabelText("Name"), "Ada");
        await user.type(screen.getByLabelText("Email"), "ada@example.com");
        await user.type(screen.getByLabelText("Your message"), "Hello!");
        await user.click(screen.getByRole("button", { name: "Send" }));

        expect(await screen.findByText("Sent.")).toBeInTheDocument();
        expect(JSON.parse(fetchMock.mock.calls[0][1]!.body as string)).toMatchObject({ name: "Ada" });
    })

    it("check the 'Sorry, that didn't send' message appears", async () => {
        //Pretend the server said no: the test shouldn't send real email.
        vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({}, { status: 500}));
        const user = setup();
        await user.click(screen.getByRole("button", { name: "leave a message" }));
        await user.type(screen.getByLabelText("Name"), "Ada");
        await user.type(screen.getByLabelText("Email"), "ada@example.com");
        await user.type(screen.getByLabelText("Your message"), "Hello!");
        await user.click(screen.getByRole("button", { name: "Send" }));

        expect(await screen.findByRole("alert")).toHaveTextContent(/didn't send/);
        expect(screen.getByRole("link", { name: "ada@example.com" })).toBeInTheDocument();
    })

    it("keeps a half-written message whichever button opens it", async () => {
        const user = userEvent.setup();
        render(
            <>
                <MessageButton>Say hello</MessageButton>
                <MessageButton>Tell me about your project</MessageButton>
                <MessageDialog copy={site.contact.form} email="ada@example.com" />
            </>,
        );
        await user.click(screen.getByRole("button", { name: "Say hello" }));
        await user.type(screen.getByLabelText("Name"), "Ada");
        await user.click(screen.getByRole("button", { name: "Close" }));

        await user.click(screen.getByRole("button", { name: "Tell me about your project" }));
        expect(screen.getAllByRole("dialog")).toHaveLength(1);
        expect(screen.getByLabelText("Name")).toHaveValue("Ada");
    })
})
