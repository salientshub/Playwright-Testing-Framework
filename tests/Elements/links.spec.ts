import { test, expect } from '@playwright/test';
import { LinksPage } from '../../pages/Elements/linksPage';
import * as allure from 'allure-js-commons';

test.describe('Links Tests', () => {
  let linksPage: LinksPage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.navigate('/links');
  });

  test('should follow home link (opens new tab) @sanity @elements', async ({ context }) => {
    await allure.epic('Elements');
    await allure.feature('Links');
    await allure.story('Home Link Navigation');
    await allure.severity('critical');

    const pagePromise = context.waitForEvent('page');
    await linksPage.clickHomeLink();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('demoqa.com');
  });

  test('should get API response for Created link @regression @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Links');
    await allure.story('API Link Response');
    await allure.severity('normal');

    await linksPage.clickCreatedLink();
    const responseText = await linksPage.getLinkResponse();
    expect(responseText).toContain('Created');
  });
});