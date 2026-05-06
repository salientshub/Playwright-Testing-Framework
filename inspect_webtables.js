const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/webtables');
    
    const rows = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.rt-tr-group')).map(el => el.innerText.trim());
    });
    console.log('Rows:', rows);
    
    await browser.close();
})();
