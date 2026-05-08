import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,

  // ─── Grep-based Tag Filtering ─────────────────────────────────────
  // Use CLI:  npx playwright test --grep @sanity
  //           npx playwright test --grep @regression
  //           npx playwright test --grep @elements
  //           npx playwright test --grep "@sanity|@regression"
  // Or set via env in CI:  PLAYWRIGHT_GREP=@sanity npx playwright test

  reporter: [
    // Default HTML reporter — always available for local debugging
    ['html', { open: 'never' }],

    // Allure reporter — generates raw results into ./allure-results
    // These JSON/attachment files are later processed by `allure generate`
    // to produce the full interactive report in ./allure-report
    ['allure-playwright', {
      outputFolder: 'allure-results',       // Where raw test result JSON files go
      detail: true,                         // Include test step details
      suiteTitle: true,                     // Group tests by describe() block titles
      environmentInfo: {                    // Static env info shown in Allure dashboard
        Framework: 'Playwright',
        BaseURL: 'https://demoqa.com',
        NodeVersion: process.version,
      },
    }],
  ],

  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Elements',
      testDir: "./tests/Elements",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Forms',
      testDir: "./tests/Forms",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Alerts_Frame_Windows',
      testDir: "./tests/Alerts, Frame & Windows",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Widgets',
      testDir: "./tests/Widgets",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Interactions',
      testDir: "./tests/Interactions",
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'BookStore',
      testDir: "./tests/Book Store Application",
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});