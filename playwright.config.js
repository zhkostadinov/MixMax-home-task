// @ts-check
const { defineConfig } = require('@playwright/test');
require('dotenv').config({ path: './.env.test' });

module.exports = defineConfig({
  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 450000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  testDir: './tests',
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 90000,
    launchOptions: {
      args: ["--start-maximized"],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {viewport: undefined}
    },
    {
      name: 'WEB',
      use: {
        baseURL: 'https://petstore.octoperf.com/actions/Catalog.action'
      }
    },
    {
      name: 'API',
      use: {
        baseURL: 'https://petstore.swagger.io/v2'
      }
    }
  ]
});
