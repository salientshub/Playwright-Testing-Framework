import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../../pages/Widgets/toolTipsPage';
import { allure } from 'allure-js-commons';

test.describe('Tool Tips Tests', () => {
    let toolTipsPage: ToolTipsPage;

    test.beforeEach(async ({ page }) => {
        toolTipsPage = new ToolTipsPage(page);
        await toolTipsPage.navigate('/tool-tips');
    });

    test('should show tooltip on button hover @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tool Tips');
        await allure.story('Button Tooltip');
        await allure.severity('critical');

        await toolTipsPage.hoverOverButton();
        await expect(toolTipsPage.toolTip).toContainText('You hovered over the Button');
    });

    test('should show tooltip on input hover @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tool Tips');
        await allure.story('Input Tooltip');
        await allure.severity('normal');

        await toolTipsPage.hoverOverInput();
        await expect(toolTipsPage.toolTip).toContainText('You hovered over the text field');
    });
});
