// Imports:
const common = require('../common.js');

async function getPriceData(microsoftUrl) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);
    await page.goto(microsoftUrl); // , {waitUntil: 'networkidle0'}
    
    var element = await page.waitForSelector('.Price-module__srOnly___2mBg_');
    var priceEl = await page.evaluate(element => element.innerText.replace("Oryginalna cena: ", "").replace("; cena na wyprzedaży ", ""), element);    


    // Check if discount:
    if (priceEl.split(" zł").length == 2) {
        var basePrice = common.formatPriceToFloat(priceEl.split(" zł")[0]);

        console.log(basePrice + "zł");
    } else {
        var basePrice = common.formatPriceToFloat(priceEl.split(" zł")[0]);
        var discountPrice = common.formatPriceToFloat(priceEl.split(" zł")[1]);
        var discountPercent = common.calculateDiscountPercent(basePrice, discountPrice);

        console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
    };
    
    browser.close();
};

//getPriceData(microsoftUrl);

exports.getPriceData = getPriceData;