import { test, expect } from '@playwright/test';
import { DynamicPropertiesPage } from '../../pages/Elements/dynamicPropertiesPage';

test.describe('Dynamic Properties Tests', () => {
  let dynamicPage: DynamicPropertiesPage;

  test.beforeEach(async ({ page }) => {
    dynamicPage = new DynamicPropertiesPage(page);
    await dynamicPage.navigate('/dynamic-properties');
  });

  test('should enable button after 5 seconds', async () => {
    await dynamicPage.waitForEnableAfterButton(6000);
    // The button should be enabled now
    expect(await dynamicPage.enableAfterButton.isEnabled()).toBe(true);
  });

  test('should show visible button after 5 seconds', async () => {
    await dynamicPage.waitForVisibleAfterButton(6000);
    expect(await dynamicPage.visibleAfterButton.isVisible()).toBe(true);
  });
});