/*
- https://steamdb.info/blog/store-prices-api/
- https://nik-davis.github.io/posts/2019/steam-data-collection/
- https://stackoverflow.com/questions/29591313/steam-api-grabbing-a-list-of-prices
*/

// Imports:
const { fetch, formatPrice } = require('../common.js');

async function getPriceData(steamURL) {
    let splitURL = steamURL.split("app")
    let gameId = splitURL[1].split("/")[1];
    let apiURL = splitURL[0] + "api/appdetails?appids=" + gameId + "&cc=PLN";

    // Fetching data from API:
    return fetch(apiURL, { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverview = json[gameId]["data"]["price_overview"];
        
        // Getting specific data:
        var basePrice = formatPrice(priceOverview['initial']);
        var discountPrice = formatPrice(priceOverview['final']);
        var discountPercent = priceOverview['discount_percent'];
        
        return [basePrice, discountPrice, discountPercent];
    });
};

exports.getPriceData = getPriceData;