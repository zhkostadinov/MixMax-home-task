// @ts-check
const { defineConfig } = require('@playwright/test');

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
    trace: 'off',
    screenshot: 'only-on-failure',
    actionTimeout: 90000,
    launchOptions: {
      args: ["--start-maximized"],
    },
    baseURL : process.env.WEB_URL || 'https://automationexercise.com/'
  },
  projects: [
    {
      name: 'chromium',
      use: {viewport: undefined}
    },
  ]
});
