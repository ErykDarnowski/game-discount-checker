// Imports:
const fetch = require('node-fetch');

// Vars:
let steamUrl = "https://store.steampowered.com/app/515960/Martha_Is_Dead/";

let gameId = steamUrl.split("/").slice(4, 5)[0]; //515960; // <- Martha is Dead
let apiUrl = steamUrl.split("/").slice(0, 3).join("/") + "/api/appdetails?appids=" + gameId;

// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
function formatPrice(priceInt) {
    var priceArr = String(priceInt).split("");
    return parseFloat(priceArr.slice(0, (priceArr.length - 2)).join("") + "." + priceArr.slice((priceArr.length - 2), priceArr.length).join(""));
};

// Fetching data from API:
fetch(apiUrl, { method: "GET" }).then(res => res.json()).then((json) => {
    // Getting general data:
    var priceOverview = json[gameId]["data"]["price_overview"];
    
    // Getting specific data:
    var basePrice = formatPrice(priceOverview['initial']);
    var discountPrice = formatPrice(priceOverview['final']);
    var discountPercent = priceOverview['discount_percent'];
    
    // Checking if discount:
    if (discountPercent == 0) {
        console.log(basePrice + "zł");
    } else {
        console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
    };
});