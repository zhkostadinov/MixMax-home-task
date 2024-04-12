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
  testDir: '../tests',
  reporter: 'html',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 90000,
    launchOptions: {
      args: ["--start-maximized"],
    },
    baseURL : process.env.WEB_URL || 'https://petstore.octoperf.com/actions/Catalog.action'
  },
  projects: [
    {
      name: 'chromium',
      use: {viewport: undefined}
    },
  ]
});
