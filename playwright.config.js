// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({
  testDir: './tests',
  timeout: 30*1000, // increased to 30 seconds
  expect: {
    timeout: 10*1000, // increased to 10 sec
  },
  use : {
    browserName: 'chromium',
    // browserName: 'firefox',
    headless: false,
    screenshot: 'on',
    trace:'retain-on-failure',

  },
})
module.exports = config;

