const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });
fs.writeFileSync(storageStatePath, JSON.stringify({ cookies: [], origins: [] }));

test.describe.configure({ mode: 'serial' });

test('logs in and saves storage state', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');

  const userName = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const signInBtn = page.locator("[value='Login']");

  await userName.fill('anshika109@gmail.com');
  await password.fill('Iamking@000');
  await signInBtn.click();

  await page.locator('.card-body b').first().waitFor();
  await expect(page.locator('.card-body b').first()).toBeVisible();

  await page.context().storageState({ path: storageStatePath });
});

test.use({ storageState: storageStatePath });

test('opens the dashboard using saved storage state', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');

  await expect(page.locator('.card-body b').first()).toBeVisible();
  await expect(page.locator('.card-body b').first()).toContainText(/.+/);
});
