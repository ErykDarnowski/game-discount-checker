// microsoft api github: https://github.com/ThomasPe/MS-Store-API

// Imports:
const { fetch, formatPriceToFloat, calculateDiscountPercent} = require('../common.js');

async function getPriceData(microsoft_URL) {
    var productId = microsoft_URL.split("?")[0].split("/").pop();

    // Fetching data from API:
    return fetch('https://storeedgefd.dsx.mp.microsoft.com/v8.0/sdk/products?market=PL&locale=pl-PL&deviceFamily=Windows.Desktop', {
        method: "POST",
        body: `{ "productIds": "${productId}" }`,
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(json => {
        // Getting general data:
        var priceData = json["Products"][0]["DisplaySkuAvailabilities"][0]["Availabilities"][0]["OrderManagementData"]["Price"];

        // Getting specific data:
        var basePrice = formatPriceToFloat(String(priceData["MSRP"]));
        var discountPrice = formatPriceToFloat(String(priceData["ListPrice"]));
        var discountPercent = calculateDiscountPercent(basePrice, discountPrice);
        
        return [basePrice, discountPrice, discountPercent];
    });
};

exports.getPriceData = getPriceData;