# Playwright DemoQA Framework

This is an automated testing framework using Playwright, TypeScript, and the Page Object Model (POM) design pattern. It tests the [DemoQA](https://demoqa.com/) application.

## Project Structure

- `pages/`: Contains all Page Object files representing different pages and components of DemoQA.
- `tests/`: Contains all the test specifications organized by DemoQA categories (Elements, Forms, Widgets, etc.).
- `utils/`: Contains utility functions and test data.
- `test-data/`: Contains sample files for uploading and other external data needs.
- `BasePage.ts`: The root page object that provides common functionality (navigation, clicking, explicit waits, taking screenshots).

## Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Run all tests:
```bash
npm run test
```

Run tests in headed mode:
```bash
npm run test:headed
```

View the HTML report after a run:
```bash
npm run report
```

## Features

- **Page Object Model**: Strict separation of locators and actions from test logic.
- **Robust Locators**: Playwright role-based and text-based locators are utilized for reliability.
- **Data Driven**: Test data is separated into `utils/testData.ts`.
- **TypeScript**: Full TypeScript support with `tsconfig.json` mapped paths.
