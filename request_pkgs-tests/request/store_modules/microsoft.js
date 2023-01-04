// microsoft api github: https://github.com/ThomasPe/MS-Store-API

// Imports:
const { request, formatPriceToFloat, calculateDiscountPercent} = require('../common.js');

async function getPriceData(microsoft_URL) {
    var productId = microsoft_URL.split("?")[0].split("/").pop();

    // Fetching data from API:
    return await new Promise((resolve, reject) => {
        request('POST', 'https://storeedgefd.dsx.mp.microsoft.com/v8.0/sdk/products?market=PL&locale=pl-PL&deviceFamily=Windows.Desktop', {json: { productIds: productId }}).getBody('utf8').then(JSON.parse).done((responseJSON) => {
            // Getting general data:
            var priceData = responseJSON["Products"][0]["DisplaySkuAvailabilities"][0]["Availabilities"][0]["OrderManagementData"]["Price"];
                
            // Getting specific data:
            var basePrice = formatPriceToFloat(priceData["MSRP"]);
            var discountPrice = formatPriceToFloat(priceData["ListPrice"]);
            var discountPercent = calculateDiscountPercent(basePrice, discountPrice);

            resolve([basePrice, discountPrice, discountPercent]);
        });
    });
};

exports.getPriceData = getPriceData;