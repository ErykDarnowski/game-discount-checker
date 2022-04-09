// Imports:
const common = require('../common.js')

async function getPriceData(epicURL) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    
    const blockedTypes = [
        'image',
        'font',
        'xhr',
        'fetch',
    ];
    const blockedDomains = [
        'https://cdn.cookielaw.org',
        'https://tracking.epicgames.com/',
        'https://epic-social-social-modules-prod.ol.epicgames.com/'
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

    await page.goto(epicURL);

    var element = await page.waitForSelector('[data-component="PriceLayout"]');
    var priceLayout = await page.evaluate(element => element.innerText, element);

    // Check if discount:
    var priceDataArr = [];
    if (priceLayout.split("\n").length == 1) {
        var basePrice = common.formatPriceToFloat(priceLayout.replace(" zł", ""));
        
        //console.log(basePrice + "zł");
        priceDataArr = [basePrice, basePrice, 0];
    } else {
        var basePrice = common.formatPriceToFloat(priceLayout.split("\n")[1].replace(" zł", ""));
        var discountPrice = common.formatPriceToFloat(priceLayout.split("\n")[2].replace(" zł", ""));
        var discountPercent = common.formatPriceToFloat(priceLayout.split("\n")[0]);
        
        //console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        priceDataArr = [basePrice, discountPrice, discountPercent];
    };

    browser.close();
    
    return priceDataArr;
};

exports.getPriceData = getPriceData;