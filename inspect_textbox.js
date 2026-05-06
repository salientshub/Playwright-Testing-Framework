const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/text-box');
    
    const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input, textarea')).map(el => ({
            id: el.id,
            placeholder: el.placeholder,
            ariaLabel: el.getAttribute('aria-label'),
            label: document.querySelector(`label[for="${el.id}"]`)?.innerText
        }));
    });
    console.log('Inputs:', inputs);
    
    await browser.close();
})();
