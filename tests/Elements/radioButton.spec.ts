import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/Elements/radioButtonPage';

test.describe('Radio Button Tests', () => {
  let radioPage: RadioButtonPage;

  test.beforeEach(async ({ page }) => {
    radioPage = new RadioButtonPage(page);
    await radioPage.navigate('/radio-button');
  });

  test('should select Yes', async () => {
    await radioPage.selectYes();
    expect(await radioPage.getSelectedValue()).toBe('Yes');
    expect(await radioPage.getSuccessMessage()).toContain('Yes');
  });

  test('should select Impressive', async () => {
    await radioPage.selectImpressive();
    expect(await radioPage.getSelectedValue()).toBe('Impressive');
    expect(await radioPage.getSuccessMessage()).toContain('Impressive');
  });
});