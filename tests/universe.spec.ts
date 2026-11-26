import { test, expect } from "@playwright/test";
test("explore the career atlas, camera, route and field guide", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "Visit Mandaluyong" }).click();
  await expect(page.locator(".map-card")).toContainText("Withcenter Inc.");
  await page.getByRole("button", { name: "Next milestone" }).click();
  await expect(page.locator(".map-card")).toContainText("L1 Backend Support");
  await expect(page.locator(".passport")).toContainText("1 / 5");
  await page.locator(".atlas").screenshot({ path: "review/atlas-station.png" });
  await page.getByRole("button", { name: "Map overview" }).click();
  await page.getByRole("button", { name: "Zoom in" }).click();
  const canvas = page.locator(".atlas-art"),
    box = (await canvas.boundingBox())!;
  const before = await page.locator(".camera").getAttribute("style");
  await page.mouse.move(box.x + 30, box.y + 50);
  await page.mouse.down();
  await page.mouse.move(box.x + 115, box.y + 95, { steps: 10 });
  await page.mouse.up();
  expect(await page.locator(".camera").getAttribute("style")).not.toBe(before);
  await page.getByRole("button", { name: "Trace route" }).click();
  await expect(page.locator(".map-card")).toContainText("Withcenter Inc.");
  await expect(page.locator(".map-card")).toContainText("PLDT Service Care", {
    timeout: 5000,
  });
  await page
    .locator("#commission")
    .getByRole("button", { name: "Backend security" })
    .click();
  await expect(page.locator("#commission")).toContainText(
    "implementation details stay private",
  );
  await page
    .locator("#case-study")
    .getByRole("button", { name: /Classify/ })
    .click();
  await expect(page.locator(".diagram article")).toContainText("90%");
  await expect(page.locator(".passport li.earned")).toContainText([
    "Both city stops", "Exhibition notes",
  ]);
  await page
    .locator("#workflow")
    .getByRole("button", { name: "Test", exact: true })
    .click();
  await expect(page.locator(".work-question")).toContainText("expected result");
});
test("throw a tool, operate both lab exhibits and reset saved stamps", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#toolbox");
  const tray = page.locator(".sticker-tray");
  await expect(tray).toHaveClass(/simulated/);
  await page.getByRole("button", { name: "Pause gravity" }).click();
  const key = tray.getByRole("button", { name: /React/ });
  await key.scrollIntoViewIfNeeded();
  const rect = (await key.boundingBox())!;
  const old = await key.getAttribute("style");
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(rect.x + 80, rect.y + 45, { steps: 10 });
  await page.mouse.up();
  expect(await key.getAttribute("style")).not.toBe(old);
  await expect(page.locator(".key-info")).toContainText("React");
  await page.getByRole("button", { name: "Resume gravity" }).click();
  await page.getByRole("button", { name: "Quality", exact: true }).click();
  await tray.getByRole("button", { name: /Regression testing/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".key-info")).toContainText("Rechecks existing behavior");
  await page.locator("#lab").scrollIntoViewIfNeeded();
  const art = page.locator(".press-box polyline").first(),
    prev = await art.getAttribute("points");
  await page
    .getByRole("button", { name: "Generate another engraving" })
    .click();
  expect(await art.getAttribute("points")).not.toBe(prev);
  const cmd = page.getByRole("textbox", { name: "Terminal command" });
  await cmd.fill("surprise");
  await cmd.press("Enter");
  await expect(page.getByRole("log")).toContainText("Hidden transmission");
  await page.locator("#lab").screenshot({ path: "review/laboratory.png" });
  await page.reload();
  await expect(page.locator(".passport")).toContainText("3 / 5");
  await page.getByRole("button", { name: "Reset stamps" }).click();
  await expect(page.locator(".passport")).toContainText("0 / 5");
  expect(errors).toEqual([]);
});
test("touch atlas and complete mobile journey", async ({ browser }) => {
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:4186");
  await page.getByRole("button", { name: "02 Circuit Makati" }).tap();
  await expect(page.locator(".map-card")).toContainText("Current");
  await page.getByRole("button", { name: "Map overview" }).tap();
  await page.locator(".atlas").screenshot({ path: "review/atlas-mobile.png" });
  for (const section of await page
    .locator("main section[id],footer[id]")
    .all()) {
    await section.scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.locator("main section[id]")).toHaveCount(10);
  await ctx.close();
});
