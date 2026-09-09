const { test, expect } = require('@playwright/test');

test.describe('iShares Compare Funds - Cookies Popup Test', () => {
  test('should check if cookies popup appears and click accept button', async ({ page }) => {
    // Navigate to the iShares Compare Funds page
    await page.goto('https://www.ishares.com/us/products/compare-funds');

    // Wait for the page to load
    // await page.waitForLoadState('networkidle');

    // Check if the cookies popup is visible using isVisible()
    const cookiesPopup = page.locator('#onetrust-group-container');
    const isPopupVisible = await cookiesPopup.isVisible({ timeout: 10000 });
    
    if (!isPopupVisible) {
      throw new Error('Cookies popup did not appear');
    }

    // Verify the Accept All button is visible
    const acceptAllButton = page.locator('#onetrust-accept-btn-handler');
    const isAcceptButtonVisible = await acceptAllButton.isVisible();
    
    if (!isAcceptButtonVisible) {
      throw new Error('Accept All button is not visible');
    }

    // Click on the Accept All button to accept cookies
    await acceptAllButton.click();

    // Verify that the cookies popup is no longer visible after clicking Accept All
    const isPopupHidden = !(await cookiesPopup.isVisible());
    
    if (!isPopupHidden) {
      throw new Error('Cookies popup did not disappear after clicking Accept All');
    }

    console.log('✓ Cookies popup appeared and Accept All button was clicked successfully');
  });
});
