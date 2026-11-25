import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("WCAG A and AA checks across loaded chapters", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#toolbox").scrollIntoViewIfNeeded();
  await expect(page.locator(".sticker-tray")).toBeVisible();
  await page.locator("#lab").scrollIntoViewIfNeeded();
  await expect(page.locator(".press-box")).toBeVisible();
  await page.locator(".wordmark").click();
  await page.getByRole("button", { name: "Visit Mandaluyong" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
