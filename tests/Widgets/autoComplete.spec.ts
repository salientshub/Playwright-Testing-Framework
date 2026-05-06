import { test, expect } from '@playwright/test';
import { AutoCompletePage } from '../../pages/Widgets/autoCompletePage';

test.describe('Auto Complete Tests', () => {
    let autoPage: AutoCompletePage;

    test.beforeEach(async ({ page }) => {
        autoPage = new AutoCompletePage(page);
        await autoPage.navigate('/auto-complete');
    });

    test('should select single color', async () => {
        await autoPage.typeSingleColor('Re');
        const value = await autoPage.getSingleValue();
        expect(value).toContain('Red');
    });

    test('should select multiple colors', async () => {
        await autoPage.typeMultipleColor('Bl');
        await autoPage.typeMultipleColor('Gr');
        const values = await autoPage.getMultipleValues();
        expect(values.length).toBeGreaterThanOrEqual(2);
    });
});
