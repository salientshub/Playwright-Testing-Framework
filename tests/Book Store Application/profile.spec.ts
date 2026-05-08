import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../pages/Book Store Application/profilePage';
import { allure } from 'allure-js-commons';

test.describe('Profile Tests', () => {
    let profilePage: ProfilePage;

    // These tests would typically require authentication first
    // For DemoQA, we can verify the UI state when not logged in
    test.beforeEach(async ({ page }) => {
        profilePage = new ProfilePage(page);
        await profilePage.navigate('/profile');
    });

    test('should show login message when not authenticated @sanity @bookstore', async ({ page }) => {
        await allure.epic('Book Store Application');
        await allure.feature('Profile');
        await allure.story('Unauthenticated State');
        await allure.severity('critical');

        const notLoggedInMsg = page.getByText('Currently you are not logged into the Book Store application');
        await expect(notLoggedInMsg).toBeVisible();
    });

    test('should navigate to book store @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Profile');
        await allure.story('Navigate to Book Store');
        await allure.severity('normal');

        // First hide any ad frames that might block the button
        await profilePage['page'].evaluate(() => {
            const ad = document.getElementById('adplus-anchor');
            if (ad) ad.style.display = 'none';
        });
        
        // When unauthenticated, the "Go To Book Store" button is hidden.
        // We navigate via the side menu link instead.
        await profilePage['page'].getByRole('link', { name: 'Book Store', exact: true }).click();
        expect(profilePage['page'].url()).toContain('books');
    });
});
