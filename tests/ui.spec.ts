import { test, expect, type Locator} from "@playwright/test";
const { ROOT_OPTIONS, TYPE_OPTIONS } = require("../src/domain/scale-types.js");

let title: Locator;
let staff: Locator;
let labels: Locator;
let staffMessage: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto("index.html");
    title = page.locator("#title");
    staff = page.locator("#staff svg");
    labels = page.locator("#staff svg g.vf-annotation text")
    staffMessage = page.locator("#staff-message");
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

test("Db and Gb minor scales show enharmonic suggestions", async ({ page }) => {
    const problematicRoots = ["Db", "Gb"];
    const minorTypes = ["Natural Minor (Aeolian)", "Harmonic Minor", "Melodic Minor"];
    const expectedSuggestion: Record<string, string> = {
        Db: "Db minor is unavailable. Try C# minor instead.",
        Gb: "Gb minor is unavailable. Try F# minor instead."
    };

    for (const root of problematicRoots) {
        for (const scaleType of minorTypes) {
            const rootIndex = ROOT_OPTIONS.indexOf(root);
            const typeIndex = TYPE_OPTIONS.indexOf(scaleType);

            await page.keyboard.press("r");
            await expect(staff).not.toBeVisible();

            for (let i = 0; i < rootIndex; i++) {
                await page.keyboard.press("ArrowDown");
            }
            await page.keyboard.press("Enter");

            await page.keyboard.press("ArrowRight");
            for (let i = 0; i < typeIndex; i++) {
                await page.keyboard.press("ArrowDown");
            }
            await page.keyboard.press("Enter");

            await expect(staff).toHaveCount(0);
            await expect(staffMessage).toHaveText(expectedSuggestion[root]);
        }
    }
});
