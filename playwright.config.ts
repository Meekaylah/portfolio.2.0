import {defineConfig } from "@playwright/test";

export default defineConfig({ 
    testDir: "tests/e2e",
    reporter: [["list"], ["html", { open: "never" }]],
    use: { baseURL: "http://localhost:3100", channel: "chrome" },
    webServer: {
        command: "npm run start -- -p 3100",
        url: "http://localhost:3100",
        reuseExistingServer: !process.env.CI,
    }
})