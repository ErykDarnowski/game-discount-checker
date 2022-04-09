// Imports:
const { fetch, formatPrice } = require('../common.js');

async function getPriceData(steamURL) {
    let splitURL = steamURL.split("/");
    let gameId = splitURL.slice(4, 5)[0];
    let apiURL = splitURL.slice(0, 3).join("/") + "/api/appdetails?appids=" + gameId;

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