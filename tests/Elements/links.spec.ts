import { test, expect } from '@playwright/test';
import { LinksPage } from '../../pages/Elements/linksPage';

test.describe('Links Tests', () => {
  let linksPage: LinksPage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.navigate('/links');
  });

  test('should follow home link (opens new tab)', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await linksPage.clickHomeLink();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('demoqa.com');
  });

  test('should get API response for Created link', async () => {
    await linksPage.clickCreatedLink();
    const responseText = await linksPage.getLinkResponse();
    expect(responseText).toContain('Created');
  });
});