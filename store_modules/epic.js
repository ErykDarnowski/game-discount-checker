// Imports:
const common = require('../common.js')

async function getPriceData(epicUrl) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(epicUrl);
    
    var element = await page.waitForSelector('[data-component="PriceLayout"]');
    var priceLayout = await page.evaluate(element => element.innerText, element);

    // Check if discount:
    if (priceLayout.split("\n").length == 1) {
        var basePrice = common.formatPriceToFloat(priceLayout.replace(" zł", ""));
        
        console.log(basePrice + "zł");
    } else {
        var basePrice = common.formatPriceToFloat(priceLayout.split("\n")[1].replace(" zł", ""));
        var discountPrice = common.formatPriceToFloat(priceLayout.split("\n")[2].replace(" zł", ""));
        var discountPercent = common.formatPriceToFloat(priceLayout.split("\n")[0]);
        
        console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
    };

    browser.close();
};

// getPriceData(epicUrl);

exports.getPriceData = getPriceData;