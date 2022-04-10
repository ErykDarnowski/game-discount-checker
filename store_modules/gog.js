// Imports:
const { puppeteer, fetch, formatPrice, calculateDiscountPercent } = require('../common.js');

async function getPriceData(gogURL) {
    const blockedTypes = [
        'image',
        'font',
        'xhr',
        'fetch',
        'stylesheet',
        'other',
        'ping',
        'media'
    ];
    const blockedDomains = [
        'https://www.youtube.com/',
        'https://connect.facebook.net/',
        'https://www.gog.com/08evIO9gl',
        'https://consent.cookiebot.com/',
        'https://www.google-analytics.com/',
        'https://consentcdn.cookiebot.com/',
        'https://www.googletagmanager.com/',
        'https://www.googleadservices.com/',
        'https://menu-static.gog-statics.com/',
        'https://www.gog.com/gogAccessToken.js',
        'https://www.gog.com/accessTokenClient.js',
        'https://productcard.gog-statics.com/assets/vendor/',
        'https://productcard.gog-statics.com/assets/locales/',
        'https://menu-static.gog-statics.com/assets/js/footer/',
        'https://productcard.gog-statics.com/assets/bundle_min.js',
        'https://menu-static.gog-statics.com/assets/js/v2/gog-module'
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