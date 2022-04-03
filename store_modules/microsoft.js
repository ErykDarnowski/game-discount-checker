/*
// Get price element:
var priceEl = document.getElementsByClassName("CommonButtonStyles-module__multilineDesktopButton___Eht1V")[0].children[2].innerText;
// document.querySelectorAll('.Price-module__srOnly___2mBg_')[0].innerText.replace("Oryginalna cena: ", "").replace("; cena na wyprzedaży ", "");

// Changes "," in price str to "." and formats it to a float:
function formatPriceToFloat(priceStr) {
    return parseFloat(priceStr.replace(",", "."));
};

// Check if discount:
if (priceEl.split(" zł").length == 2) {
    var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);

    console.log(basePrice + "zł");
} else {
    var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);
    var discountPrice = formatPriceToFloat(priceEl.split(" zł")[1]);
    var discountPercent = (100 - ((discountPrice * 100) / basePrice)).toFixed(2);

    console.log(basePrice + " -> " + discountPrice + " = -" + discountPercent + "%");
};
*/


const puppeteer = require('puppeteer');

var microsoftUrl = "https://www.xbox.com/pl-pl/games/store/martha-is-dead/9pm6sjbmvqzl";

// Changes "," in price str to "." and formats it to a float:
function formatPriceToFloat(priceStr) {
    return parseFloat(priceStr.replace(",", "."));
};

async function scrape(microsoftUrl) {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);
    await page.goto(microsoftUrl); // , {waitUntil: 'networkidle0'}
    
    var element = await page.waitForSelector('.Price-module__srOnly___2mBg_');
    var priceEl = await page.evaluate(element => element.innerText.replace("Oryginalna cena: ", "").replace("; cena na wyprzedaży ", ""), element);    


    // Check if discount:
    if (priceEl.split(" zł").length == 2) {
        var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);

        console.log(basePrice + "zł");
    } else {
        var basePrice = formatPriceToFloat(priceEl.split(" zł")[0]);
        var discountPrice = formatPriceToFloat(priceEl.split(" zł")[1]);
        var discountPercent = (100 - ((discountPrice * 100) / basePrice)).toFixed(2);

        console.log(basePrice + " -> " + discountPrice + " = -" + discountPercent + "%");
    };


    browser.close();
};

scrape(microsoftUrl);