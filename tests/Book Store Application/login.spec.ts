import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Book Store Application/loginPage';
import { bookStoreUser } from '../../utils/testData';
import { allure } from 'allure-js-commons';

test.describe('Book Store Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('/login');
    });

    test('should show error for invalid credentials @sanity @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Login');
        await allure.story('Invalid Login');
        await allure.severity('critical');

        await loginPage.login('invalidUser', 'wrongPassword');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Invalid username or password!');
    });

    test('should navigate to new user registration @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Login');
        await allure.story('New User Registration Navigation');
        await allure.severity('normal');

        await loginPage.clickNewUser();
        expect(loginPage['page'].url()).toContain('register');
    });
});
