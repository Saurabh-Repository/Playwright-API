const { test, expect, Page } = require('@playwright/test');

test.describe('Playwright Interview Questions - Common Methods', () => {

  // ============================================
  // 1. LOCATORS - Finding Elements
  // ============================================
  test('Q1: What are different ways to locate elements in Playwright?', async ({ page }) => {
    // CSS Selector
    const byCss = page.locator('button.primary');

    // XPath Selector
    const byXpath = page.locator("xpath=//button[@class='primary']");

    // Text Selector
    const byText = page.locator("text=Login");

    // Role Based (Recommended)
    const byRole = page.locator("role=button[name='Login']");

    // By Label
    const byLabel = page.locator("label:has-text('Email')");

    // By Placeholder
    const byPlaceholder = page.locator('[placeholder="Enter email"]');

    // By Test ID (Best Practice)
    const byTestId = page.locator('[data-testid="login-button"]');

    console.log('✓ All locator strategies covered');
  });

  // ============================================
  // 2. PAGE NAVIGATION & WAITS
  // ============================================
  test('Q2: How do you navigate and wait for page load in Playwright?', async ({ page }) => {
    // Navigate to URL
    await page.goto('https://example.com');

    // Wait for specific load state
    await page.waitForLoadState('networkidle'); // Wait until network is idle
    await page.waitForLoadState('domcontentloaded'); // DOM fully loaded
    await page.waitForLoadState('load'); // Page fully loaded

    // Wait for specific selector
    await page.waitForSelector('button', { timeout: 5000 });

    // Wait for function (custom logic)
    await page.waitForFunction(() => document.querySelectorAll('item').length > 5);

    // Wait for URL change
    await page.waitForURL('**/dashboard/**');

    // Wait for navigation (after click)
    await Promise.all([
      page.waitForNavigation(),
      page.click('a')
    ]);

    console.log('✓ Navigation and wait methods covered');
  });

  // ============================================
  // 3. ELEMENT INTERACTIONS
  // ============================================
  test('Q3: What are the most common element interaction methods?', async ({ page }) => {
    // Go to a page with form elements
    await page.goto('https://example.com');

    // Click
    await page.click('button');
    await page.locator('button').click();

    // Double Click
    await page.dblclick('button');

    // Right Click (Context Menu)
    await page.click('button', { button: 'right' });

    // Type/Fill Text
    await page.fill('input[name="email"]', 'test@example.com');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="email"]').type('test@example.com'); // Types character by character

    // Clear field
    await page.locator('input').clear();

    // Press key
    await page.press('input', 'Enter');

    // Select option from dropdown
    await page.selectOption('select', 'value1');

    // Check checkbox
    await page.check('input[type="checkbox"]');

    // Uncheck checkbox
    await page.uncheck('input[type="checkbox"]');

    // Hover
    await page.hover('button');

    // Drag and drop
    await page.dragAndDrop('source-selector', 'target-selector');

    // Scroll
    await page.locator('element').scrollIntoViewIfNeeded();

    // Focus
    await page.focus('input');

    // Blur
    await page.locator('input').blur();

    console.log('✓ Element interaction methods covered');
  });

  // ============================================
  // 4. ELEMENT VISIBILITY & STATE CHECKS
  // ============================================
  test('Q4: How to check element visibility and state without using expect()?', async ({ page }) => {
    await page.goto('https://example.com');

    // Check if element is visible
    const isVisible = await page.locator('button').isVisible();

    // Check if element exists in DOM (but may not be visible)
    const isHidden = await page.locator('button').isHidden();

    // Check if element is enabled
    const isEnabled = await page.locator('button').isEnabled();

    // Check if element is disabled
    const isDisabled = await page.locator('button').isDisabled();

    // Check if element is checked (checkbox/radio)
    const isChecked = await page.locator('input[type="checkbox"]').isChecked();

    // Check if element is editable
    const isEditable = await page.locator('input').isEditable();

    // Get text content
    const text = await page.locator('button').textContent();

    // Get inner HTML
    const html = await page.locator('div').innerHTML();

    // Get input value
    const value = await page.locator('input').inputValue();

    // Get attribute value
    const href = await page.locator('a').getAttribute('href');

    // Count elements
    const count = await page.locator('button').count();

    console.log('✓ Visibility and state checks covered', { 
      isVisible, isHidden, isEnabled, isDisabled, isChecked, isEditable 
    });
  });

  // ============================================
  // 5. ASSERTIONS
  // ============================================
  test('Q5: What are the common assertions in Playwright?', async ({ page }) => {
    await page.goto('https://example.com');

    const button = page.locator('button');

    // Text assertions
    await expect(button).toContainText('Click me');
    await expect(button).toHaveText('Click me');

    // Visibility assertions
    await expect(button).toBeVisible();
    await expect(button).toBeHidden();

    // State assertions
    await expect(button).toBeEnabled();
    await expect(button).toBeDisabled();
    await expect(button).toBeChecked(); // for checkbox/radio
    await expect(button).toBeEditable();

    // Value assertions
    await expect(page.locator('input')).toHaveValue('expected value');

    // Attribute assertions
    await expect(page.locator('a')).toHaveAttribute('href', /.*example.*/);

    // Count assertions
    await expect(page.locator('button')).toHaveCount(5);

    // CSS class assertions
    await expect(button).toHaveClass(/primary|secondary/);

    // URL and Title
    await expect(page).toHaveURL('https://example.com');
    await expect(page).toHaveTitle('Page Title');

    // Custom timeout for assertions
    await expect(button).toBeVisible({ timeout: 10000 });

    console.log('✓ Assertions covered');
  });

  // ============================================
  // 6. HANDLING POPUPS, ALERTS & DIALOGS
  // ============================================
  test('Q6: How to handle popups, alerts, and dialogs?', async ({ page }) => {
    await page.goto('https://example.com');

    // Handle alert dialog
    page.on('dialog', dialog => {
      console.log(`Dialog type: ${dialog.type()}`);
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept(); // or dialog.dismiss(); and to provide input: dialog.accept('input text');
      dialog.accept("test input"); // this line added to show input handling
    });

    // Handle popup (new page)
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('a[target="_blank"]')
    ]);
    await popup.close();

    // Handle page close event
    page.on('close', closedPage => {
      console.log('Page closed:', closedPage.url());
    });

    // Handle new page/tab
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('link')
    ]);

    console.log('✓ Popup and dialog handling covered');
  });

  // ============================================
  // 7. KEYBOARD OPERATIONS
  // ============================================
  test('Q7: How to perform keyboard operations in Playwright?', async ({ page }) => {
    await page.goto('https://example.com');

    // Single key press
    await page.press('input', 'Enter');
    await page.press('input', 'Tab');
    await page.press('input', 'Escape');
    await page.press('input', 'ArrowDown');

    // Multiple keys (keyboard shortcuts)
    await page.keyboard.press('Control+A'); // Select all
    await page.keyboard.press('Control+C'); // Copy
    await page.keyboard.press('Control+V'); // Paste

    // Type with delay
    await page.keyboard.type('Hello World', { delay: 100 });

    // Press and hold
    await page.keyboard.down('Shift');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.up('Shift');

    console.log('✓ Keyboard operations covered');
  });

  // ============================================
  // 8. MOUSE OPERATIONS
  // ============================================
  test('Q8: How to perform advanced mouse operations?', async ({ page }) => {
    await page.goto('https://example.com');

    // Move mouse
    await page.mouse.move(100, 100);

    // Click at coordinates
    await page.mouse.click(100, 100);

    // Double click
    await page.mouse.dblclick(100, 100);

    // Triple click (select all text)
    await page.mouse.click(100, 100, { clickCount: 3 });

    // Down and up
    await page.mouse.down();
    await page.mouse.move(200, 200);
    await page.mouse.up();

    // Drag and drop
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.up();

    console.log('✓ Mouse operations covered');
  });

  // ============================================
  // 9. MULTIPLE ELEMENTS & FILTERING
  // ============================================
  test('Q9: How to work with multiple elements and filter them?', async ({ page }) => {
    await page.goto('https://example.com');

    // Get all elements
    const buttons = page.locator('button');
    const count = await buttons.count();

    // Loop through elements
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      console.log(`Button ${i}: ${text}`);
    }

    // Filter elements
    const enabledButtons = page.locator('button:enabled');

    // Get first and last
    const firstButton = page.locator('button').first();
    const lastButton = page.locator('button').last();

    // Chain filters
    const visibleButtons = page.locator('button').locator('visible=true');

    // Filter by text
    const loginButton = page.locator('button', { hasText: 'Login' });

    // Filter by contains
    const buttonWithClick = page.locator('button:has-text("Click")');

    console.log(`Total buttons: ${count}`);
  });

  // ============================================
  // 10. COOKIES, STORAGE & CONTEXT
  // ============================================
  test('Q10: How to manage cookies and local storage?', async ({ page, context }) => {
    // Set cookies
    await context.addCookies([
      {
        name: 'user_token',
        value: 'xyz123',
        url: 'https://example.com'
      }
    ]);

    await page.goto('https://example.com');

    // Get all cookies
    const cookies = await context.cookies();
    console.log('Cookies:', cookies);

    // Get specific cookie
    const specificCookie = cookies.find(c => c.name === 'user_token');

    // Clear cookies
    await context.clearCookies();

    // Local Storage operations
    const localStorage = await page.evaluate(() => window.localStorage);

    // Set local storage
    await page.evaluate(() => {
      window.localStorage.setItem('key', 'value');
    });

    // Get from local storage
    const storageValue = await page.evaluate(() => {
      return window.localStorage.getItem('key');
    });

    // Session Storage
    await page.evaluate(() => {
      window.sessionStorage.setItem('session_key', 'session_value');
    });

    console.log('✓ Cookies and storage operations covered');
  });

  // ============================================
  // 11. FRAMES & IFRAMES
  // ============================================
  test('Q11: How to work with frames and iframes?', async ({ page }) => {
    await page.goto('https://example.com');

    // Get frame by name
    const frame = page.frame('frameName');

    // Get frame by URL
    const frameByUrl = page.frames().find(f => f.url().includes('specific'));

    // All frames
    const allFrames = page.frames();

    // Get frame content
    const frameLocator = page.frameLocator('iframe[src*="example"]');
    const elementInFrame = frameLocator.locator('button');

    // Interact with element in iframe
    await frameLocator.locator('input').fill('text in iframe');
    await frameLocator.locator('button').click();

    console.log('✓ Frame operations covered');
  });

  // ============================================
  // 12. SCREENSHOTS & VIDEOS
  // ============================================
  test('Q12: How to capture screenshots and handle videos?', async ({ page }) => {
    await page.goto('https://example.com');

    // Full page screenshot
    await page.screenshot({ path: 'full-page.png' });

    // Element screenshot
    await page.locator('button').screenshot({ path: 'button.png' });

    // Screenshot specific region
    await page.screenshot({ 
      path: 'region.png',
      clip: { x: 0, y: 0, width: 400, height: 300 }
    });

    // Get screenshot as buffer
    const screenshot = await page.screenshot({ fullPage: true });

    // Videos are handled via playwright.config.js configuration
    console.log('✓ Screenshot operations covered');
  });

  // ============================================
  // 13. FILE UPLOAD & DOWNLOAD
  // ============================================
  test('Q13: How to handle file uploads and downloads?', async ({ page }) => {
    // File upload
    await page.locator('input[type="file"]').setInputFiles('path/to/file.txt');

    // Multiple files
    await page.locator('input[type="file"]').setInputFiles([
      'path/to/file1.txt',
      'path/to/file2.txt'
    ]);

    // Handle download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('a[download]')
    ]);

    // Get download info
    const suggestedFilename = download.suggestedFilename();
    const path = await download.path();

    // Save download to specific path
    await download.saveAs('downloads/' + suggestedFilename);

    console.log('✓ File upload/download covered');
  });

  // ============================================
  // 14. NETWORK INTERCEPTION & MOCKING
  // ============================================
  test('Q14: How to intercept and mock network requests?', async ({ page }) => {
    // Intercept and abort request
    await page.route('**/api/**', route => route.abort());

    // Intercept and mock response
    await page.route('**/api/users', route => {
      route.abort('failed');
      // OR
      route.continue({ 
        method: 'POST',
        postData: JSON.stringify({ mocked: true })
      });
      // OR
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 1, name: 'Mock User' })
      });
    });

    // Unroute
    await page.unroute('**/api/**');

    // Listen to responses
    page.on('response', response => {
      console.log(`${response.status()} ${response.url()}`);
    });

    // Listen to requests
    page.on('request', request => {
      console.log(`${request.method()} ${request.url()}`);
    });

    console.log('✓ Network interception covered');
  });

  // ============================================
  // 15. ACCESSIBILITY TESTING
  // ============================================
  test('Q15: How to perform accessibility testing?', async ({ page }) => {
    await page.goto('https://example.com');

    // Get accessibility tree (snapshot)
    const snapshot = await page.accessibility.snapshot();
    console.log('Accessibility snapshot:', snapshot);

    // Check for accessible name
    const button = page.locator('button');
    const accessibleName = await button.getAttribute('aria-label');

    // Check ARIA attributes
    const role = await page.locator('[role="button"]').getAttribute('role');
    const ariaLive = await page.locator('[aria-live]').getAttribute('aria-live');

    // Focus management
    await page.locator('input').focus();
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);

    console.log('✓ Accessibility testing covered');
  });

  // ============================================
  // 16. PARALLELIZATION & CONCURRENCY
  // ============================================
  test('Q16: How to handle parallel execution and multiple pages?', async ({ browser }) => {
    // Create multiple contexts
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Navigate both pages
    await Promise.all([
      page1.goto('https://example.com'),
      page2.goto('https://example.org')
    ]);

    // Perform actions in parallel
    await Promise.all([
      page1.click('button'),
      page2.click('button')
    ]);

    // Close contexts
    await context1.close();
    await context2.close();

    console.log('✓ Parallelization covered');
  });

  // ============================================
  // 17. ERROR HANDLING & RETRIES
  // ============================================
  test('Q17: How to handle errors and implement retries?', async ({ page }) => {
    try {
      await page.goto('https://example.com');
    } catch (error) {
      console.log('Navigation failed:', error.message);
    }

    try {
      await page.waitForSelector('button', { timeout: 5000 });
    } catch (error) {
      console.log('Element not found:', error.message);
    }

    // Try-catch with custom logic
    let isVisible = false;
    try {
      isVisible = await page.locator('button').isVisible({ timeout: 2000 });
    } catch (e) {
      console.log('Element visibility check failed');
    }

    // Retry logic
    async function retryAction(fn, retries = 3) {
      for (let i = 0; i < retries; i++) {
        try {
          return await fn();
        } catch (error) {
          if (i === retries - 1) throw error;
          await page.waitForTimeout(1000);
        }
      }
    }

    console.log('✓ Error handling covered');
  });

  // ============================================
  // 18. BROWSER CONTEXT & OPTIONS
  // ============================================
  test('Q18: What are browser context options and settings?', async ({ browser }) => {
    // Create context with specific options
    const context = await browser.newContext({
      // Viewport size
      viewport: { width: 1280, height: 720 },
      
      // Device emulation
      // ...devices['iPhone 12'],
      
      // Geolocation
      geolocation: { latitude: 37.7749, longitude: -122.4194 },
      permissions: ['geolocation'],
      
      // User agent
      userAgent: 'Custom User Agent',
      
      // Locale and timezone
      locale: 'en-US',
      timezoneId: 'America/New_York',
      
      // Color scheme
      colorScheme: 'dark',
      
      // HTTP authentication
      httpCredentials: {
        username: 'user',
        password: 'pass'
      },
      
      // Proxy
      proxy: {
        server: 'http://myproxy.com:3128'
      }
    });

    const page = await context.newPage();
    await page.goto('https://example.com');
    await context.close();

    console.log('✓ Browser context options covered');
  });

  // ============================================
  // 19. TRACING & DEBUGGING
  // ============================================
  test('Q19: How to enable tracing and debug tests?', async ({ page }) => {
    // Start tracing
    await page.context().tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });

    await page.goto('https://example.com');
    await page.click('button');

    // Stop and save trace
    await page.context().tracing.stop({
      path: 'trace.zip'
    });

    // Debugging with pause
    // await page.pause(); // Opens inspector

    // Console logging
    page.on('console', msg => console.log('Browser console:', msg.text()));

    // Page error logging
    page.on('pageerror', error => console.log('Page error:', error));

    console.log('✓ Tracing and debugging covered');
  });

  // ============================================
  // 20. CUSTOM FIXTURES & REUSABLE UTILITIES
  // ============================================
  test('Q20: How to create custom fixtures and utilities?', async ({ page }) => {
    // Helper function for login
    async function login(email, password) {
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForURL('**/dashboard');
    }

    // Helper function for navigation
    async function navigateTo(url) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
    }

    // Helper for element interaction with error handling
    async function clickIfExists(selector) {
      const element = page.locator(selector);
      if (await element.isVisible()) {
        await element.click();
        return true;
      }
      return false;
    }

    // These would be used in tests
    await navigateTo('https://example.com');

    console.log('✓ Custom fixtures and utilities covered');
  });

});
