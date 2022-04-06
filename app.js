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



/* Table example
const { table } = require('table');

const data = [
    ['STORE', 'BASE', 'CURRENT', 'DISCOUNT'],
    ['Steam', '143 zł', '143 zł', '0%'],
    ['Epic', '143 zł', '143 zł', '0%'],
    ['Gog', '143 zł', '143 zł', '0%'],
    ['Microsoft', '143 zł', '143 zł', '0%']
];

const config = {
    header: {
        content: 'Martha is Dead\n[Price Comparison]',
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

console.log(table(data, config));
*/



// Imports:
const gog = require('./store_modules/gog.js');
const epic = require('./store_modules/epic.js');
const steam = require('./store_modules/steam.js');
const microsoft = require('./store_modules/microsoft.js');

// Vars:
var gogUrl = "https://www.gog.com/pl/game/martha_is_dead";
var epicUrl = "https://store.epicgames.com/pl/p/martha-is-dead";
let steamUrl = "https://store.steampowered.com/app/515960/Martha_Is_Dead/";
var microsoftUrl = "https://www.xbox.com/pl-pl/games/store/martha-is-dead/9pm6sjbmvqzl";

gog.getPriceData(gogUrl)
epic.getPriceData(epicUrl);
steam.getPriceData(steamUrl);
microsoft.getPriceData(microsoftUrl);
