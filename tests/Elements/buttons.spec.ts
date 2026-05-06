import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../../pages/Elements/buttonsPage';

test.describe('Buttons Tests', () => {
  let buttonsPage: ButtonsPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate('/buttons');
  });

  test('should perform double click', async () => {
    await buttonsPage.doubleClick();
    expect(await buttonsPage.getDoubleClickMessage()).toContain('double click');
  });

  test('should perform right click', async () => {
    await buttonsPage.rightClick();
    expect(await buttonsPage.getRightClickMessage()).toContain('right click');
  });

  test('should perform single click', async () => {
    await buttonsPage.singleClick();
    expect(await buttonsPage.getClickMessage()).toContain('dynamic click');
  });
});