/*
// Something for microsoft store:
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





// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
function formatPrice(priceInt) {
    var priceArr = String(priceInt).split("");
    return parseFloat(priceArr.slice(0, (priceArr.length - 2)).join("") + "." + priceArr.slice((priceArr.length - 2), priceArr.length).join(""));
};

module.exports = {
    formatPrice
};






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