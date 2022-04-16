// Imports:
const { puppeteer, formatPriceToFloat } = require('../common.js')

async function getPriceData(epicURL) {
    const blockedTypes = [
        'image',
        'font',
        'xhr',
        'fetch',
        'other',
        'ping',
        'media',
        'script',
        'stylesheet'
    ];
    const blockedDomains = [
        'https://cdn.cookielaw.org',
        'https://tracking.epicgames.com/',
        'https://epic-social-social-modules-prod.ol.epicgames.com/',
        'https://static-assets-prod.epicgames.com/epic-store/static/webpack/fonts',
        'https://static-assets-prod.epicgames.com/epic-store/static/webpack/webAppStyles'
    ];
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();    

    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);


    page.on('request', (req) => {
        const url = req.url();
        
        // Blocking types of unneeded requests and some URLSs:
        if (blockedDomains.some((d) => url.startsWith(d)) || blockedTypes.includes(req.resourceType())) {
            req.abort();
        } else {
            //console.log(req.resourceType() + " = " + url);
            req.continue();
        };
    });

    await page.goto(epicURL);

    var element = await page.waitForSelector('[data-component="PriceLayout"]');    
    var priceLayout = await page.evaluate(element => element.innerText, element);
    priceLayout = priceLayout.replaceAll("PLN ", "").split("\n");

    browser.close();
    
    // Check if discount:
    var priceDataArr = [];
    if (priceLayout.length == 1) {
        var basePrice = formatPriceToFloat(priceLayout[0]);
        
        //console.log(basePrice + "zł");
        priceDataArr = [basePrice, basePrice, 0];
    } else {
        var basePrice = formatPriceToFloat(priceLayout[1]);
        var discountPrice = formatPriceToFloat(priceLayout[2]);
        var discountPercent = Math.round(parseFloat(priceLayout[0].replace("-", "").replace("%", "")));
        
        //console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        priceDataArr = [basePrice, discountPrice, discountPercent];
    };
    
    return priceDataArr;
};

exports.getPriceData = getPriceData;