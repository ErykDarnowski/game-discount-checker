// gog api: https://gogapidocs.readthedocs.io/en/latest/

// Imports:
const { puppeteer, fetch, formatPrice, calculateDiscountPercent } = require('../common.js');

async function getPriceData(gogURL) {
    const blockedTypes = [
        'xhr',
        'font',
        'ping',
        'image',
        'fetch',
        'other',
        'media',
        'script',
        'stylesheet'
    ];
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    

    page.on('request', (req) => {
        const url = req.url();

        // Blocking types of unneeded requests and some URLSs:
        if (url.startsWith("https://www.youtube.com/") || blockedTypes.includes(req.resourceType())) {
            req.abort();
        } else {
            //console.log(req.resourceType() + " = " + url);
            req.continue();
        };
    });

    await page.goto(gogURL);

    var appId = await page.evaluate(
        () => window.productcardData["cardProduct"]["id"]
    );

    browser.close();
    
    // Fetching data from API:
    return fetch("https://api.gog.com/products/" + appId + "/prices?countryCode=pl", { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverwiew = json["_embedded"]["prices"][0];

        // Getting specified data:
        var basePrice = formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
        var discountPrice = formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
        var discountPercent = calculateDiscountPercent(basePrice, discountPrice);

        return [basePrice, discountPrice, discountPercent];
    });
};

exports.getPriceData = getPriceData;