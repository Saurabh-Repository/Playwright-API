const { test, expect } = require('@playwright/test');

test('Maximize browser window and open Amazon India', async ({ page }) => {

  await page.goto('https://www.amazon.in');

  // Force the viewport to a large size in headed mode
  await page.setViewportSize({ width: 1536 , height: 816 });
  
  // await expect(page).toHaveTitle(/Amazon/);
  await page.pause();
});
