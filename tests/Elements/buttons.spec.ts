import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../../pages/Elements/buttonsPage';
import * as allure from 'allure-js-commons';

test.describe('Buttons Tests', () => {
  let buttonsPage: ButtonsPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate('/buttons');
  });

  test('should perform double click @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Buttons');
    await allure.story('Double Click');
    await allure.severity('critical');

    await buttonsPage.doubleClick();
    expect(await buttonsPage.getDoubleClickMessage()).toContain('double click');
  });

  test('should perform right click @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Buttons');
    await allure.story('Right Click');
    await allure.severity('normal');

    await buttonsPage.rightClick();
    expect(await buttonsPage.getRightClickMessage()).toContain('right click');
  });

  test('should perform single click @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Buttons');
    await allure.story('Single Click');
    await allure.severity('normal');

    await buttonsPage.singleClick();
    expect(await buttonsPage.getClickMessage()).toContain('dynamic click');
  });
});