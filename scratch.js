const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/checkbox');
    
    // Dump the HTML of the tree
    const html = await page.evaluate(() => {
        return document.querySelector('#tree-node').innerHTML;
    });
    console.log(html);
    
    await browser.close();
})();
