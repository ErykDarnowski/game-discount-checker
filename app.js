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
        content: 'Martha is Dead\n[Price Comparaison]',
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