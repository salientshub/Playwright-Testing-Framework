const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/checkbox');
    
    const homeCheckbox = page.getByRole('checkbox', { name: 'Home' });
    const count = await homeCheckbox.count();
    console.log(`Found ${count} checkboxes with name 'Home'`);
    
    if (count > 0) {
        const html = await homeCheckbox.evaluate(el => el.outerHTML);
        console.log(`HTML: ${html}`);
        const isChecked = await homeCheckbox.isChecked();
        console.log(`Is checked: ${isChecked}`);
        
        await homeCheckbox.click();
        console.log(`Clicked checkbox`);
        const isCheckedAfter = await homeCheckbox.isChecked();
        console.log(`Is checked after: ${isCheckedAfter}`);
    }
    
    await browser.close();
})();
