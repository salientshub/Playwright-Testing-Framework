const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/checkbox');
    
    const homeCheckbox = page.getByRole('checkbox', { name: 'Home' });
    await homeCheckbox.click();
    console.log('Checked Home');
    
    const desktopCheckbox = page.getByRole('checkbox', { name: 'Desktop' });
    const count = await desktopCheckbox.count();
    console.log(`Found ${count} checkboxes with name 'Desktop' after checking Home`);
    
    // Now expand
    const homeToggle = page.locator('button[title="Toggle"]').first();
    await homeToggle.click();
    console.log('Clicked expand toggle');
    
    const countAfterExpand = await desktopCheckbox.count();
    console.log(`Found ${countAfterExpand} checkboxes with name 'Desktop' after expanding`);
    
    await browser.close();
})();
