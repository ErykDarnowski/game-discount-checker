// Imports:
const { puppeteer, formatPriceToFloat, calculateDiscountPercent } = require('../common.js');

async function getPriceData(microsoftURL) {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    
    const blockedTypes = [
        'image',
        'font',
        'xhr',
        'fetch',
        'stylesheet',
        'other',
        'ping'
    ];
    const blockedDomains = [
        'https://mem.gfx.ms/',
        'https://login.live.com/',
        'https://account.xbox.com/',
        'https://www.microsoft.com/',
        'https://ajax.aspnetcdn.com/',
        'https://assets.adobedtm.com/',
        'https://assets-www.xbox.com/',
        'https://wcpstatic.microsoft.com'
    ];

    page.on('request', (req) => {
        const url = req.url();
        
        // Blocking types of unneeded requests and some URLSs:
        if (blockedDomains.some((d) => url.startsWith(d)) || blockedTypes.includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        };
    });

    await page.goto(microsoftURL);

    var element = await page.waitForSelector('.Price-module__srOnly___2mBg_');
    var priceEl = await page.evaluate(element => element.innerText.replace("Oryginalna cena: ", "").replace("; cena na wyprzedaży ", ""), element);    

    browser.close();

    // Check if discount:
    if (priceEl.split(" zł").length == 2) {
        var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);

        //console.log(basePrice + "zł");
        priceDataArr = [basePrice, basePrice, 0];
    } else {
        var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);
        var discountPrice = formatPriceToFloat(priceEl.split(" zł")[1]);
        var discountPercent = calculateDiscountPercent(basePrice, discountPrice);

        //console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        priceDataArr = [basePrice, discountPrice, discountPercent];
    };    

    return priceDataArr;
};

exports.getPriceData = getPriceData;