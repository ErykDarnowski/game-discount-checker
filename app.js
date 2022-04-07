/*
var request = require('request');

var url = "https://storeedgefd.dsx.mp.microsoft.com/v8.0/sdk/products?market=PL&locale=pl-PL&deviceFamily=Windows.Desktop";
var data = {
    json: {
        productIds: '9pm6sjbmvqzl'
    }
};

request.post(url, data, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body["Products"][0]);
        };
    };
);
*/





// Imports:
const fs = require('fs');
const { table } = require('table');
const gog = require('./store_modules/gog.js');
const epic = require('./store_modules/epic.js');
const steam = require('./store_modules/steam.js');
const microsoft = require('./store_modules/microsoft.js');

// Getting data from config.json:
let rawData = fs.readFileSync('config.json');
let parsedData = JSON.parse(rawData);

// Vars:
var config = parsedData["config"];

var gameTitle = parsedData["game_info"]["title"];

var gogURL = parsedData["game_info"]["gog_URL"];
var epicURL = parsedData["game_info"]["epic_URL"];
var steamURL = parsedData["game_info"]["steam_URL"];
var microsoftURL = parsedData["game_info"]["microsoft_URL"];



gog.getPriceData(gogURL).then((gogPriceArr) => {
    epic.getPriceData(epicURL).then((epicPriceArr) => {
        steam.getPriceData(steamURL).then((steamPriceArr) => {
            microsoft.getPriceData(microsoftURL).then((microsoftPriceArr) => {
                var prices = {
                    "Steam": steamPriceArr,
                    "Epic": epicPriceArr,
                    "GOG": gogPriceArr,
                    "Microsoft": microsoftPriceArr
                };

                console.log(prices);
            });
        });
    });
});







const data = [
    ['STORE', 'BASE', 'CURRENT', 'DISCOUNT'],
    ['Steam', '143 zł', '143 zł', '0%'],
    ['Epic', '143 zł', '143 zł', '0%'],
    ['Gog', '143 zł', '143 zł', '0%'],
    ['Microsoft', '143 zł', '143 zł', '0%']
];

console.log(gameTitle);

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
    ]
};

console.log(table(data, tableConfig));