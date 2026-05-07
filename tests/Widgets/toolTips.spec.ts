import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../../pages/Widgets/toolTipsPage';

test.describe('Tool Tips Tests', () => {
    let toolTipsPage: ToolTipsPage;

    test.beforeEach(async ({ page }) => {
        toolTipsPage = new ToolTipsPage(page);
        await toolTipsPage.navigate('/tool-tips');
    });

    test('should show tooltip on button hover', async () => {
        await toolTipsPage.hoverOverButton();
        await expect(toolTipsPage.toolTip).toContainText('You hovered over the Button');
    });

    test('should show tooltip on input hover', async () => {
        await toolTipsPage.hoverOverInput();
        await expect(toolTipsPage.toolTip).toContainText('You hovered over the text field');
    });
});
