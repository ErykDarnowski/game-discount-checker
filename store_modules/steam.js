// Imports:
const common = require('../common.js');

async function getPriceData(steamURL) {
    let gameId = steamURL.split("/").slice(4, 5)[0];
    let apiURL = steamURL.split("/").slice(0, 3).join("/") + "/api/appdetails?appids=" + gameId;

    // Fetching data from API:
    return common.fetch(apiURL, { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverview = json[gameId]["data"]["price_overview"];
        
        // Getting specific data:
        var basePrice = common.formatPrice(priceOverview['initial']);
        var discountPrice = common.formatPrice(priceOverview['final']);
        var discountPercent = priceOverview['discount_percent'];
        
        return [basePrice, discountPrice, discountPercent];
    });
};

exports.getPriceData = getPriceData;