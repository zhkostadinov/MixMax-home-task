// @ts-check
const { defineConfig } = require('@playwright/test');
// require('dotenv').config({ path: '../.env.vault' });

module.exports = defineConfig({
  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 200000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  testDir: '../tests',
  reporter: 'html',
  use: {
    baseURL : process.env.API_URL || 'https://petstore.swagger.io/v2/'
  }
});
