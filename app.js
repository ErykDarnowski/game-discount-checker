/* LINKS:

@ Tutorial:
- https://dev.to/code_jedi/web-scraping-in-nodejs-2lkf

@ Stores:
- https://www.gog.com/pl/game/martha_is_dead
- https://store.epicgames.com/pl/p/martha-is-dead
- https://store.steampowered.com/agecheck/app/515960/
- https://www.xbox.com/pl-pl/games/store/martha-is-dead/9pm6sjbmvqzl
*/


const puppeteer = require('puppeteer');

async function scrape() {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto('https://www.e-licznik.pl');
    var element = await page.waitForSelector(".tabs > li:nth-child(5)");
    
    var text = await page.evaluate(element => element.textContent, element);
    console.log(text);

    browser.close();
};

scrape();