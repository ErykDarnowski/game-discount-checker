// Imports:
const common = require('../common.js');

async function getPriceData(gogURL) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();

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