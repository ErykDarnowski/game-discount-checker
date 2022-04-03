/*
// Get price element:
var priceLayout = document.querySelectorAll('[data-component="PriceLayout"]')[0].innerText;

// Changes "," in price str to "." and formats it to a float:
function formatPriceToFloat(priceStr) {
    return parseFloat(priceStr.replace(",", "."));
};

// Check if discount:
if (priceLayout.split("\n").length == 1) {
    var basePrice = formatPriceToFloat(priceLayout.replace(" zł", ""));
    
    console.log(basePrice + "zł");
} else {
    var basePrice = formatPriceToFloat(priceLayout.split("\n")[1].replace(" zł", ""));
    var discountPrice = formatPriceToFloat(priceLayout.split("\n")[2].replace(" zł", ""));
    var discountPercent = formatPriceToFloat(priceLayout.split("\n")[0]);
    
    console.log(basePrice + "zł -> " + discountPrice + "zł = " + discountPercent + "%");
};
*/


// Imports:
const puppeteer = require('puppeteer');

// Vars:
var epicUrl = "https://store.epicgames.com/pl/p/martha-is-dead";

// Changes "," in price str to "." and formats it to a float:
function formatPriceToFloat(priceStr) {
    return parseFloat(priceStr.replace(",", "."));
};

async function scrape(epicUrl) {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(epicUrl);
    
    var element = await page.waitForSelector('[data-component="PriceLayout"]');
    var priceLayout = await page.evaluate(element => element.innerText, element);

    // Check if discount:
    if (priceLayout.split("\n").length == 1) {
        var basePrice = formatPriceToFloat(priceLayout.replace(" zł", ""));
        
        console.log(basePrice + "zł");
    } else {
        var basePrice = formatPriceToFloat(priceLayout.split("\n")[1].replace(" zł", ""));
        var discountPrice = formatPriceToFloat(priceLayout.split("\n")[2].replace(" zł", ""));
        var discountPercent = formatPriceToFloat(priceLayout.split("\n")[0]);
        
        console.log(basePrice + "zł -> " + discountPrice + "zł = " + discountPercent + "%");
    };

    browser.close();
};

scrape(epicUrl);