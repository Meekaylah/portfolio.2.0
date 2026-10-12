import { expect, test } from "@playwright/test";

test("the home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Hi, I'm Michaela");
    await expect(page.getByRole("heading", { name: "Selected work" })).toBeAttached();
});

test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test("the menu opens, and Esc closes it", async ({ page }) => {
        await page.goto("/");
        const button = page.getByRole("button", { name: "Menu" });
        await button.click();
        const menu = page.getByRole("dialog", { name: "Menu" });
        await expect(menu).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
        await expect(button).toBeFocused();
    });
});

test("a project preview plays on hover", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("#work-track > li").filter({ has: page.locator("button[aria-label^='Play preview']") }).first();
    test.skip((await card.count()) === 0, "No project has video yet");

    await card.hover();
    const video = card.locator("video");
    await expect(video).toBeAttached();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
})