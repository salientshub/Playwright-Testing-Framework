import { test, expect } from '@playwright/test';
import { DynamicPropertiesPage } from '../../pages/Elements/dynamicPropertiesPage';
import * as allure from 'allure-js-commons';

test.describe('Dynamic Properties Tests', () => {
  let dynamicPage: DynamicPropertiesPage;

  test.beforeEach(async ({ page }) => {
    dynamicPage = new DynamicPropertiesPage(page);
    await dynamicPage.navigate('/dynamic-properties');
  });

  test('should enable button after 5 seconds @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Dynamic Properties');
    await allure.story('Button Enable After Delay');
    await allure.severity('normal');

    await dynamicPage.waitForEnableAfterButton(6000);
    // The button should be enabled now
    expect(await dynamicPage.enableAfterButton.isEnabled()).toBe(true);
  });

  test('should show visible button after 5 seconds @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Dynamic Properties');
    await allure.story('Button Visible After Delay');
    await allure.severity('normal');

    await dynamicPage.waitForVisibleAfterButton(6000);
    expect(await dynamicPage.visibleAfterButton.isVisible()).toBe(true);
  });
});