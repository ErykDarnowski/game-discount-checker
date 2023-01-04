var startTime = performance.now()

// Imports:
const fs = require('fs');
const { table } = require('table');
const { Spinner } = require('./spinner.js');
const { setColor, colors } = require('./colors.js');
const gog = require('./store_modules/gog.js');
const epic = require('./store_modules/epic.js');
const steam = require('./store_modules/steam.js');
const microsoft = require('./store_modules/microsoft.js');

// Getting data from config.json:  [better json reading? https://stackabuse.com/reading-and-writing-json-files-with-node-js/]
let rawData = fs.readFileSync('config.json');
let parsedData = JSON.parse(rawData);

// Vars:
var config = parsedData["config"];
var gameInfo = parsedData["game_info"];

var gameTitle = gameInfo["title"];

var gogURL = gameInfo["gog_URL"];
var epicURL = gameInfo["epic_URL"];
var steamURL = gameInfo["steam_URL"];
var microsoftURL = gameInfo["microsoft_URL"];

var priceSpinner = new Spinner("@ Fetching prices");


(async () => {
    // Showing spinner and loading price data from each store_modules file:
    priceSpinner.start();
    const [gogPriceArr, epicPriceArr, steamPriceArr, microsoftPriceArr] = await Promise.all([gog.getPriceData(gogURL), epic.getPriceData(epicURL), steam.getPriceData(steamURL), microsoft.getPriceData(microsoftURL)]);
    priceSpinner.stop();

    var prices = [
        ["GOG"].concat(gogPriceArr),
        ["Epic"].concat(epicPriceArr),
        ["Steam"].concat(steamPriceArr),
        ["Microsoft"].concat(microsoftPriceArr)
    ];

    // Sorted by discounted price from highest to lowest:
    var sortedPrices = prices.sort((a, b) => b[2] - a[2]);
    var moneySaved = (sortedPrices[0][2] - sortedPrices[sortedPrices.length - 1][2]).toFixed(2);

    // Saving highest price (for later msg) before it's formatted in to a string:
    var highestPrice = sortedPrices[0][2];

    // Formatting values:
    sortedPrices.map((el) => {
        el[1] += " zł";
        el[2] += " zł";
        el[3] = `-${el[3]}%`;
    });

    // Populating table data with sorted prices:
    const data = [
        ['STORE', 'BASE', 'CURRENT', 'DISCOUNT']                    
    ];
    sortedPrices.map((el) => {
        data.push(el);
    });

    // Setting up table:
    const tableConfig = {
        header: {
            content: gameTitle + '\n[Price Comparison]',
        },
        columnDefault: {
            width: 10,
        },
        columns: [
            { alignment: 'left' },
            { alignment: 'center' },
            { alignment: 'center' },
            { alignment: 'right' }
        ],
        spanningCells: [
            { col: 0, row: 0, colSpan: 1, alignment: 'center'},
            { col: 3, row: 0, colSpan: 1, alignment: 'center'}
        ],

        // REMOVE TO GET BACK THICK BORDER TABLE (the default one):
        border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `╭`,
            topRight: `╮`,
            
            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `╰`,
            bottomRight: `╯`,
        
            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,
        
            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
        }
    };
    
    // Printing table:
    console.log("\n" + table(data, tableConfig));

    // How much you can save msg:
    console.log("@ You can save: " + setColor(moneySaved + " zł (" + Math.round((moneySaved * 100) / highestPrice) + "%) ", colors["highlightColor"]) + "by buying the game on: " + setColor("{" + sortedPrices[sortedPrices.length - 1][0].toUpperCase() + "}", colors["store"]));

    var endTime = performance.now()
    console.log("\n" + (endTime - startTime).toFixed(2))
})();