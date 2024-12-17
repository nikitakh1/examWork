import * as os from "os";
import path from 'path';
import dotenv from 'dotenv';

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests', // Убедитесь, что этот путь соответствует расположению ваших тестов
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["line"],
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://realworld.qa.guru', // Обновите baseURL для тестов

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    actionTimeout: 60000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/api.test.js'],
    },
    {
      name: 'api',
      testMatch: '**/api.test.js', // Указываем, что этот проект будет запускать только API-тесты
      use: {
        baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com', // Обновите baseURL для API-тестов
        headless: true, // Запускаем без графического интерфейса
        viewport: null, // Отключаем виртуальный экран
      },
    },
  ],
});