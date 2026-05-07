import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,
  reporter: [
    ['html', { open: 'never' }]
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