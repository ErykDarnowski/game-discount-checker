/*
// Imports:
const fetch = require('node-fetch');

// Vars:
let apiId = 1435943329; // <- Martha is Dead
let url = "https://api.gog.com/products/" + apiId + "/prices?countryCode=pl";

// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
function formatPrice(priceInt) {
    var priceArr = String(priceInt).split("");
    return parseFloat(priceArr.slice(0, (priceArr.length - 2)).join("") + "." + priceArr.slice((priceArr.length - 2), priceArr.length).join(""));
};

// Fetching data from API:
fetch(url, { method: "GET" }).then(res => res.json()).then((json) => {
    // Getting general data:
    var priceOverwiew = json["_embedded"]["prices"][0];

    // Getting specified data:
    var basePrice = formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
    var discountPrice = formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
    var discountPercent = (100 - ((discountPrice * 100) / basePrice)).toFixed(2);

    // Checking if discount:
    if (discountPercent == 0.00) {
        console.log(basePrice + "zł");
    } else {
        console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
    };
});
*/


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