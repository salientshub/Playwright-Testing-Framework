import { test, expect } from '@playwright/test';
import { AccordianPage } from '../../pages/Widgets/accordianPage';

test.describe('Accordian Tests', () => {
    let accordianPage: AccordianPage;

    test.beforeEach(async ({ page }) => {
        accordianPage = new AccordianPage(page);
        await accordianPage.navigate('/accordian');
    });

    test('should show section 1 content by default', async () => {
        expect(await accordianPage.isSection1Visible()).toBe(true);
    });

    test('should toggle section 2', async () => {
        await accordianPage.clickSection2();
        expect(await accordianPage.isSection2Visible()).toBe(true);
        expect(await accordianPage.isSection1Visible()).toBe(false);
    });

    test('should toggle section 3', async () => {
        await accordianPage.clickSection3();
        expect(await accordianPage.isSection3Visible()).toBe(true);
        expect(await accordianPage.isSection1Visible()).toBe(false);
    });
});
