import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("workbench, archive, toolbox, quick jump and contact", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/");
  await page.locator("#lab").scrollIntoViewIfNeeded();
  await page.getByText("Open the miniature computer").click();
  await page
    .locator(".instrument")
    .getByRole("button", { name: "Test", exact: true })
    .focus();
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("img", { name: /displaying TESTS PASSED/ }),
  ).toBeVisible();
  await page
    .getByRole("group", { name: "Computer mode" })
    .getByRole("button", { name: "Support", exact: true })
    .click();
  await expect(
    page.getByText("Signal online", { exact: true }).last(),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tilt the computer" }).click();
  await page.getByRole("link", { name: "Explore my work" }).click();
  for (let i = 0; i < 5; i++) {
    await page.getByText("Project notes", { exact: true }).click();
    await expect(page.locator(".project details")).toHaveAttribute("open", "");
    await expect(
      page.getByRole("link", { name: "View repository" }),
    ).toHaveAttribute("href", /^https:\/\/github.com\/Hirooo17\/.+/);
    await page.getByRole("button", { name: "Next project" }).click();
  }
  await page.locator("#toolbox").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".tools")).toContainText("Flutter");
  await page.getByRole("button", { name: "Reset to Web" }).click();
  await expect(page.locator(".tools")).toContainText("React");
  await page.keyboard.press("?");
  await page.getByRole("dialog").getByText("Credentials").click();
  await expect(page).toHaveURL(/#certifications$/);
  await page.getByText("CompTIA A+", { exact: false }).first().click();
  await page.getByText("Compose an email", { exact: true }).click();
  await page.getByRole("button", { name: "Open in email app" }).click();
  await expect(page.locator("input[name=subject]")).toBeFocused();
  await expect(page.locator(".mail")).toHaveAttribute(
    "href",
    "mailto:retuerma.h.bscs@gmail.com",
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    /linkedin.com\/in\/hero-jhoey/,
  );
  const downloading = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download résumé" }).click();
  const download = await downloading;
  expect(await readFile((await download.path())!)).toEqual(
    await readFile("public/Retuerma-Resume.pdf"),
  );
  expect(errors).toEqual([]);
});

for (const width of [375, 768, 1024, 1440, 1920]) {
  test("layout and reduced motion at " + width, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".camera")).toHaveCSS(
      "transition-duration",
      "0s",
    );
    await page.screenshot({ path: "review/" + width + ".png" });
    if (width === 375) {
      await page.getByRole("button", { name: "Menu" }).click();
      await page
        .getByRole("navigation")
        .getByText("Experience", { exact: true })
        .click();
      await expect(page).toHaveURL(/#experience$/);
      await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
    if (width === 1440) {
      await page
        .locator("#work")
        .screenshot({ path: "review/project-archive.png" });
      await page.locator("#about").screenshot({ path: "review/about.png" });
    }
  });
}
