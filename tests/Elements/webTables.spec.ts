import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/Elements/webTablesPage';

test.describe('Web Tables Tests', () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate('/webtables');
  });

  test('should add a new user', async () => {
    const newUser = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@test.com',
      age: '30',
      salary: '50000',
      department: 'IT'
    };
    await webTablesPage.clickAdd();
    await webTablesPage.fillUserForm(newUser);
    await webTablesPage.submitForm();
    await webTablesPage.searchUser(newUser.email);
    console.log(webTablesPage.getUserCount());
    await expect.poll(async () => await webTablesPage.getUserCount()).toBeGreaterThan(0);
    expect(await webTablesPage.getUserCount()).toBeGreaterThan(0);
  });

  test('should delete a user', async () => {
    const initialCount = await webTablesPage.getUserCount();
    await webTablesPage.deleteFirstUser();
    const newCount = await webTablesPage.getUserCount();
    expect(newCount).toBeLessThan(initialCount);
  });
});