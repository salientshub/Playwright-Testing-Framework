import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/Elements/checkBoxPage';

test.describe('Check Box Tests', () => {
  let checkBoxPage: CheckBoxPage;

  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.navigate('/checkbox');
    await checkBoxPage.expandHome();
  });

  test('should check Home and all children', async () => {
    await checkBoxPage.checkHome();
    expect(await checkBoxPage.isHomeChecked()).toBe(true);
    expect(await checkBoxPage.isDesktopChecked()).toBe(true);
    const result = await checkBoxPage.getSelectedNodes();
    expect(result).toContain('home');
    expect(result).toContain('desktop');
  });

  test('should uncheck Home and all children', async () => {
    await checkBoxPage.checkHome();
    await checkBoxPage.uncheckHome();
    expect(await checkBoxPage.isHomeChecked()).toBe(false);
    expect(await checkBoxPage.isDesktopChecked()).toBe(false);
  });
});