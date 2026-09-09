const { test, expect } = require('@playwright/test');
// const path = require('path');

let webContext;
// const storageStatePath = path.join(__dirname, '..', 'state.json');

// test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika109@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator("[value='Login']").click();

  await page.locator('.card-body b').first().waitFor({ timeout: 60000 });
  await expect(page.locator('.card-body b').first()).toBeVisible();

  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('uses injected storage state', async () => {
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');

  await page.locator('.card-body b').first().waitFor({ timeout: 60000 });
  await expect(page.locator('.card-body b').first()).toBeVisible();
});
