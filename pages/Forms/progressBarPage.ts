import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ProgressBarPage extends BasePage {
  readonly startButton: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.progressBar = page.locator('.progress-bar');
  }

  async start() {
    await this.safeClick(this.startButton);
  }

  async waitForProgress(targetPercent: number, timeout = 30000) {
    await this.page.waitForFunction(
      ({ progressBar, target }) => {
        const style = window.getComputedStyle(progressBar);
        const width = parseFloat(style.width);
        const parentWidth = progressBar.parentElement?.clientWidth || 1;
        const percent = (width / parentWidth) * 100;
        return percent >= target;
      },
      { progressBar: await this.progressBar.elementHandle(), target: targetPercent },
      { timeout }
    );
  }
}