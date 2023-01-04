// gog api: https://gogapidocs.readthedocs.io/en/latest/

// Imports:
const { puppeteer, request, formatPrice, calculateDiscountPercent } = require('../common.js');

async function getPriceData(gogURL) {
    /*
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
    */

    var appId = "1435943329";
    
    // Fetching data from API:
    return await new Promise((resolve, reject) => {
        request('GET', "https://api.gog.com/products/" + appId + "/prices?countryCode=pl").getBody('utf8').then(JSON.parse).done((responseJSON) => {
            // Getting general data:
            var priceOverwiew = responseJSON["_embedded"]["prices"][0];

            // Getting specified data:
            var basePrice = formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
            var discountPrice = formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
            var discountPercent = calculateDiscountPercent(basePrice, discountPrice);

            resolve([basePrice, discountPrice, discountPercent]);
        });
    });
};

exports.getPriceData = getPriceData;