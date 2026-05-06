import { test, expect } from '@playwright/test';
import { NestedFramesPage } from '../../pages/Alerts, Frame & Windows/nestedFramesPage';

test.describe('Nested Frames Tests', () => {
    let nestedPage: NestedFramesPage;

    test.beforeEach(async ({ page }) => {
        nestedPage = new NestedFramesPage(page);
        await nestedPage.navigate('/nestedframes');
    });

    test('should read parent frame text', async () => {
        const text = await nestedPage.getParentFrameText();
        expect(text).toContain('Parent frame');
    });

    test('should read child frame text', async () => {
        const text = await nestedPage.getChildFrameText();
        expect(text).toContain('Child Iframe');
    });
});
