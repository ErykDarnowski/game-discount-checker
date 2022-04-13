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
        'media'
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

    browser.close();

    // Check if discount:
    var priceDataArr = [];
    if (priceLayout.split("\n").length == 1) {
        var basePrice = formatPriceToFloat(priceLayout.replace(" zł", ""));
        
        //console.log(basePrice + "zł");
        priceDataArr = [basePrice, basePrice, 0];
    } else {
        var priceLayoutSplit = priceLayout.split("\n");

        var basePrice = formatPriceToFloat(priceLayoutSplit[1].replace(" zł", ""));
        var discountPrice = formatPriceToFloat(priceLayoutSplit[2].replace(" zł", ""));
        var discountPercent = Math.round(parseFloat(priceLayoutSplit[0].replace("-", "").replace("%", "")));
        
        console.log(priceLayoutSplit[2].replace(" zł", ""));

        //console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        priceDataArr = [basePrice, discountPrice, discountPercent];
    };
    
    return priceDataArr;
};

exports.getPriceData = getPriceData;