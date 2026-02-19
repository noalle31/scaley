import { test, expect } from "@playwright/test";

test("can pick a scale and reset", async ({ page }) => {
    const title = page.locator("#title");
    const staff = page.locator("#staff svg");
    const labels = page.locator("#staff svg g.vf-annotation text")

    await page.goto("/public/index.html");

    await expect(title).toContainText("Choose");

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(staff).toBeVisible();
    await expect(labels).toHaveText(["G", "A", "Bb", "C", "D", "Eb", "F", "G"]);

    await page.keyboard.press("r");
    await expect(staff).not.toBeVisible();
    await expect(title).toContainText("root");


});