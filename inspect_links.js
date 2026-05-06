const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/links');
    
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => a.innerText);
    });
    console.log('Links:', links);
    
    await browser.close();
})();
