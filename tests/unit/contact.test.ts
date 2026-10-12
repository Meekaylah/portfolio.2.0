import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact";

describe("validateContact", () => {
    it("accepts a complete message", () => {
        const result = validateContact({name: "Ada", email: "ada@example.com", reason: "hiring", message: "Hello!" });
        expect(result.ok).toBe(true);
    });

    it("explains every missing field", () => {
        const result = validateContact({});
        expect(result).toEqual({
            ok: false,
            errors: {
                name: "Please tell me your name.",
                email: "Please add an email so I can reply.",
                message: "Please write a short message.",
            },
        });
    });

    it("rejects an email without a proper domain", () => {
        const result = validateContact({name: "Ada", email: "ada@x", message: "Hi"});
        expect(result.ok).toBe(false);
    });

    it("ignores reasons it doesn't recognise", () => {
        const result = validateContact({name: "Ada", email: "ada@example.com", reason: "spam", message: "Hi" });
        expect(result.ok && result.data.reason).toBe("");
    });
    
});