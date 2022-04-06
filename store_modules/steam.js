// Imports:
const common = require('../common.js');

function getPriceData(steamUrl) {
    let gameId = steamUrl.split("/").slice(4, 5)[0];
    let apiUrl = steamUrl.split("/").slice(0, 3).join("/") + "/api/appdetails?appids=" + gameId;

    // Fetching data from API:
    common.fetch(apiUrl, { method: "GET" }).then(res => res.json()).then((json) => {
        // Getting general data:
        var priceOverview = json[gameId]["data"]["price_overview"];
        
        // Getting specific data:
        var basePrice = common.formatPrice(priceOverview['initial']);
        var discountPrice = common.formatPrice(priceOverview['final']);
        var discountPercent = priceOverview['discount_percent'];
        
        // Checking if discount:
        if (discountPercent == 0) {
            console.log(basePrice + "zł");
        } else {
            console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        };
    });
};

//getPriceData(steamUrl);

exports.getPriceData = getPriceData;