import { expect, test } from "@playwright/test";

test("arrival ticket and chapter rail work with the keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const ticket = page.getByRole("button", { name: /Tour my career atlas/ });
  await ticket.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".map-card")).toContainText("Withcenter");
  await expect(page.locator(".map-card")).toContainText("PLDT");
  await page.getByRole("link", { name: "Next chapter", exact: true }).click();
  await expect(
    page.getByRole("combobox", { name: "Jump to chapter" }),
  ).toHaveValue("experience");
  await page
    .getByRole("link", { name: "Chapter 4: Work", exact: true })
    .click();
  await expect(page.locator(".station-rail a[aria-current]")).toHaveAttribute(
    "href",
    "#work",
  );
  await page
    .getByRole("link", { name: "Previous chapter", exact: true })
    .click();
  await expect(page).toHaveURL(/#commission$/);
  await page
    .getByRole("combobox", { name: "Jump to chapter" })
    .selectOption("contact");
  await page.getByRole("link", { name: "Return to first chapter" }).click();
  await expect(
    page.getByRole("combobox", { name: "Jump to chapter" }),
  ).toHaveValue("home");
});

test("six exhibit controls, photos and shareable technical notebooks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#work");
  const gallery = page.locator(".gallery-installation");
  const directory = page.locator(".gallery-directory button");
  const study = page.locator("#case-study");
  await expect(directory).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await directory.nth(i).click();
    const name = await gallery.locator("h3").innerText();
    if (i === 0) {
      await gallery.getByRole("button", { name: "Run sweep" }).click();
      await gallery.getByRole("button", { name: "Freeze sweep" }).click();
      await expect(gallery.locator(".sweep-head")).toHaveCSS(
        "animation-play-state",
        "paused",
      );
      const shape = gallery.locator("polyline").first(),
        before = await shape.getAttribute("points");
      await gallery.getByRole("slider").focus();
      await page.keyboard.press("ArrowRight");
      expect(await shape.getAttribute("points")).not.toBe(before);
    }
    if (i === 1) {
      await gallery.getByRole("button", { name: "Admin review" }).click();
      await expect(gallery.getByRole("img")).toHaveAccessibleName(
        "Report stage 2",
      );
    }
    if (i === 2) {
      await gallery.getByRole("button", { name: "Returning user" }).click();
      await expect(gallery.locator(".phone-frame img")).toHaveAttribute(
        "src",
        /returning/,
      );
    }
    if (i === 3) {
      await gallery
        .getByRole("button", { name: "History", exact: true })
        .click();
      await expect(gallery.locator("code")).toHaveText("Patient_history.vb");
    }
    if (i === 4) {
      for (const size of ["Desktop", "Mobile"]) {
        await gallery.getByRole("button", { name: size, exact: true }).click();
        await expect
          .poll(() =>
            gallery
              .locator(".capture-frame img")
              .evaluate((el: HTMLImageElement) => el.naturalWidth),
          )
          .toBe(size === "Mobile" ? 375 : 1440);
      }
    }
    if (i === 5) {
      await gallery
        .getByRole("button", { name: "Security", exact: true })
        .click();
      await expect(gallery.locator(".scope-letter")).toContainText(
        "backend security",
      );
      await expect(
        gallery.getByRole("link", { name: "View repository" }),
      ).toHaveCount(0);
    }
    for (const image of await gallery.locator("img").all()) {
      await expect
        .poll(() =>
          image.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    if (i === 2)
      await page
        .locator("#work")
        .screenshot({
          path: "review/goparent-exhibition.png",
          style: "header,.skip{visibility:hidden!important}",
        });
    await gallery.getByRole("link", { name: "Enter case study" }).click();
    await expect(study.locator(".study-front h3")).toHaveText(name);
    await expect(study).toBeFocused();
    const stages = study.locator(".diagram-flow button");
    for (let j = 0; j < (await stages.count()); j++) {
      await stages.nth(j).click();
      await expect(stages.nth(j)).toHaveAttribute("aria-pressed", "true");
      await expect(study.locator(".diagram article p")).not.toBeEmpty();
    }
    await expect(study.locator("dt")).toHaveCount(5);
    if (i === 3) await study.screenshot({ path: "review/dental-notebook.png" });
    await page.reload();
    await expect(study.locator(".study-front h3")).toHaveText(name);
  }
});

test("mobile exhibition and notebook remain inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  const directory = page.locator(".gallery-directory button");
  for (const button of await directory.all()) {
    await button.click();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
    await page.locator(".study-link").click();
    await expect(page.locator(".notebook")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
  }
});
