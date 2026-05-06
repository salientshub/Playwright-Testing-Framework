const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/dynamic-properties');
    
    await page.waitForTimeout(6000);
    
    const buttons = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button')).map(b => b.innerText);
    });
    console.log('Buttons after 6s:', buttons);
    
    await browser.close();
})();
