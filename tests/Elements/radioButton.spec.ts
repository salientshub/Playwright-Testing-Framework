import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/Elements/radioButtonPage';
import { allure } from 'allure-js-commons';

test.describe('Radio Button Tests', () => {
  let radioPage: RadioButtonPage;

  test.beforeEach(async ({ page }) => {
    radioPage = new RadioButtonPage(page);
    await radioPage.navigate('/radio-button');
  });

  test('should select Yes @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Radio Button');
    await allure.story('Select Yes');
    await allure.severity('critical');

    await radioPage.selectYes();
    expect(await radioPage.getSelectedValue()).toBe('Yes');
    expect(await radioPage.getSuccessMessage()).toContain('Yes');
  });

  test('should select Impressive @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Radio Button');
    await allure.story('Select Impressive');
    await allure.severity('normal');

    await radioPage.selectImpressive();
    expect(await radioPage.getSelectedValue()).toBe('Impressive');
    expect(await radioPage.getSuccessMessage()).toContain('Impressive');
  });
});