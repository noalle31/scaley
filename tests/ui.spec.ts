import { test, expect, type Locator} from "@playwright/test";

let title: Locator;
let staff: Locator;
let labels: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto("index.html");
    title = page.locator("#title");
    staff = page.locator("#staff svg");
    labels = page.locator("#staff svg g.vf-annotation text")
});

test("both menus are visible and keyboard can select root and type", async ({ page }) => {
    await expect(title).toContainText("Choose a root note and a scale type");

    await expect(page.locator("[data-menu='root']")).toHaveCount(13);
    await expect(page.locator("[data-menu='type']")).toHaveCount(9);

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(staff).toBeVisible();
    await expect(labels).toHaveText(["G", "A", "Bb", "C", "D", "Eb", "F", "G"]);

    await page.keyboard.press("r");
    await expect(staff).not.toBeVisible();
});

test("can pick root and type using mouse clicks", async({ page }) => {
    await page.locator("[data-menu='root'][data-index='1']").click(); // G
    await page.locator("[data-menu='type'][data-index='1']").click(); // Natural Minor (Aeolian)

    await expect(staff).toBeVisible();
    await expect(labels).toHaveText(["G", "A", "Bb", "C", "D", "Eb", "F", "G"]);
});