import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },
  webServer: {
    // Install if missing: npm i -D http-server
    command: "npx http-server . -p 4173 -c-1",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
});