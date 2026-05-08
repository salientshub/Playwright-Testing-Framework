import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/Elements/checkBoxPage';
import { allure } from 'allure-js-commons';

test.describe('Check Box Tests', () => {
  let checkBoxPage: CheckBoxPage;

  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.navigate('/checkbox');
    await checkBoxPage.expandHome();
  });

  test('should check Home and all children @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Check Box');
    await allure.story('Check All');
    await allure.severity('critical');

    await checkBoxPage.checkHome();
    expect(await checkBoxPage.isHomeChecked()).toBe(true);
    expect(await checkBoxPage.isDesktopChecked()).toBe(true);
    const result = await checkBoxPage.getSelectedNodes();
    expect(result).toContain('home');
    expect(result).toContain('desktop');
  });

  test('should uncheck Home and all children @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Check Box');
    await allure.story('Uncheck All');
    await allure.severity('normal');

    await checkBoxPage.checkHome();
    await checkBoxPage.uncheckHome();
    expect(await checkBoxPage.isHomeChecked()).toBe(false);
    expect(await checkBoxPage.isDesktopChecked()).toBe(false);
  });
});