// Imports:
const common = require('../common.js');

async function getPriceData(gogURL) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();

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
        'https://www.youtube.com/',
        'https://connect.facebook.net/',
        'https://consent.cookiebot.com/',
        'https://www.google-analytics.com/',
        'https://consentcdn.cookiebot.com/',
        'https://www.googletagmanager.com/',
        'https://www.googleadservices.com/',
        'https://www.gog.com/gogAccessToken.js',
        'https://www.gog.com/accessTokenClient.js'
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

    await page.goto(gogURL);

    var apiId = await page.evaluate(
        () => document.querySelector(".layout.ng-scope").attributes["card-product"].textContent
    );    

    // Fetching data from API:
    return common.fetch("https://api.gog.com/products/" + apiId + "/prices?countryCode=pl", { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverwiew = json["_embedded"]["prices"][0];

        // Getting specified data:
        var basePrice = common.formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
        var discountPrice = common.formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
        var discountPercent = common.calculateDiscountPercent(basePrice, discountPrice);

        browser.close();

        return [basePrice, discountPrice, discountPercent];
    });
};

exports.getPriceData = getPriceData;