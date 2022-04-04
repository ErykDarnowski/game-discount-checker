// Imports:
const common = require('../common.js');

// Var:
var gogUrl = "https://www.gog.com/pl/game/martha_is_dead";

async function scrape(gogUrl) {
    const browser = await common.puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(gogUrl);
    
    var apiId = await page.evaluate(
        () => document.querySelector(".layout.ng-scope").attributes["card-product"].textContent
    );

    // Fetching data from API:
    common.fetch("https://api.gog.com/products/" + apiId + "/prices?countryCode=pl", { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverwiew = json["_embedded"]["prices"][0];

        // Getting specified data:
        var basePrice = common.formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
        var discountPrice = common.formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
        var discountPercent = common.calculateDiscountPercent(basePrice, discountPrice);

        // Checking if discount:
        if (discountPercent == 0) {
            console.log(basePrice + "zł");
        } else {
            console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        };
    });

    browser.close();
};

scrape(gogUrl);