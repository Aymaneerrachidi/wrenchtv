import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const url = process.env.SITE_URL || "http://127.0.0.1:5174";
await mkdir("screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400 && response.url().startsWith(url))
    errors.push(`${response.status()}: ${response.url()}`);
});
try {
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  assert.match(await page.title(), /Wrench TV/);
  await page.screenshot({ path: "screenshots/desktop.png", fullPage: true });
  await page.screenshot({ path: "screenshots/hero.png" });
  await page
    .getByRole("button", {
      name: "Turn the wrench to change channel",
      exact: true,
    })
    .click();
  await page.waitForFunction(() => !document.querySelector(".is-tuning"));
  assert.equal(
    await page
      .getByRole("button", { name: "Channel 2: The backstory", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page
    .getByRole("button", { name: "Change TV channel", exact: true })
    .click();
  await page.waitForFunction(() => !document.querySelector(".is-tuning"));
  assert.equal(
    await page
      .getByRole("button", { name: "Channel 3: The philosophy", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "Turn TV off", exact: true }).click();
  assert.equal(await page.locator(".off-message").isVisible(), true);
  await page.getByRole("button", { name: "Turn TV on", exact: true }).click();
  await page
    .getByRole("button", { name: "Channel 1: The original", exact: true })
    .click();
  await page.waitForFunction(() => !document.querySelector(".is-tuning"));
  for (let index = 0; index < 3; index++) {
    const downloadEvent = page.waitForEvent("download");
    await page.locator(".meme-download").nth(index).click();
    const download = await downloadEvent;
    assert.equal(await download.failure(), null);
    await download.saveAs(`screenshots/${download.suggestedFilename()}`);
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  console.log(
    "Accessibility:",
    JSON.stringify(
      accessibility.violations.map((item) => ({
        id: item.id,
        impact: item.impact,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
      null,
      2,
    ),
  );
  for (const width of [1440, 1280, 1024, 810, 768, 580, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(
      dimensions.content <= dimensions.viewport,
      `Horizontal overflow at ${width}: ${JSON.stringify(dimensions)}`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "screenshots/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.getByRole("navigation").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "THE MEMES" })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  assert.match(page.url(), /#memes$/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".broadcast-strip > div")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  assert.deepEqual(errors, []);
  assert.equal(
    accessibility.violations.length,
    0,
    "Accessibility violations need review",
  );
  console.log(
    "PASS: TV channels, power, 3 meme downloads, 8 viewport widths, mobile navigation, reduced motion, no runtime errors, accessibility.",
  );
} finally {
  await browser.close();
}
