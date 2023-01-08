// Imports:
const fs = require('fs');
const { table } = require('table');

const { setColor, colors } = require('./colors.js');
const { Spinner } = require('./spinner.js');
const gog = require('./store_modules/gog.js');
const epic = require('./store_modules/epic.js');
const steam = require('./store_modules/steam.js');
const microsoft = require('./store_modules/microsoft.js');


// Starting execution timer:
const startTime = performance.now();

// Getting data from config.json:  [better json reading? https://stackabuse.com/reading-and-writing-json-files-with-node-js/]
const rawData = fs.readFileSync('config.json');
const parsedData = JSON.parse(rawData);

// Vars:
//const config = parsedData['config'];
const {
	title: gameTitle,
	gog_URL: gogURL,
	epic_URL: epicURL,
	steam_URL: steamURL,
	microsoft_URL: microsoftURL
} = parsedData['game_info'];

const priceSpinner = new Spinner('@ Fetching prices');

(async () => {
	// Clear terminal:
	//console.clear();

	// Showing spinner and loading price data from each store_modules file:
	priceSpinner.start();
	const [gogPriceArr, epicPriceArr, steamPriceArr, microsoftPriceArr] = await Promise.all([
		gog.getPriceData(gogURL),
		epic.getPriceData(epicURL),
		steam.getPriceData(steamURL),
		microsoft.getPriceData(microsoftURL),
	]);
	priceSpinner.stop();

	const prices = [
		['GOG', ...gogPriceArr],
		['Epic', ...epicPriceArr],
		['Steam', ...steamPriceArr],
		['Microsoft', ...microsoftPriceArr],
	];

	// Sorting by discounted price from highest to lowest:
	const sortedPrices = prices.sort((a, b) => b[2] - a[2]);

	// Getting money saved:
	const moneySaved = (sortedPrices[0][2] - sortedPrices.at(-1)[2]).toFixed(2);

	// Saving highest price (for later msg) before it's formatted in to a string:
	const highestPrice = sortedPrices[0][2];

	// Getting percent of money saved:
	const percentSaved = Math.round((moneySaved * 100) / highestPrice);

	// Getting names of store/s where the game is the cheapest:
	const cheapestStores = sortedPrices
		.reduce((accumulatorArr, currPricesArr) => {
			// Filter out arrays where the discount price is higher than the cheapest one:
			if (currPricesArr[2] === sortedPrices.at(-1)[2]) {
				accumulatorArr.push(currPricesArr[0].toUpperCase()); // <- only get names of stores and format them
			}

			return accumulatorArr;
		}, [])
		.join(' / '); // <- add nice join formatting

	// Formatting the values and populating the table data:
	const tableData = [['STORE', 'BASE', 'CURRENT', 'DISCOUNT']];
	sortedPrices.forEach(el => {
		tableData.push([el[0], `${el[1]} zł`, `${el[2]} zł`, `-${el[3]}%`]);
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
			{
				alignment: 'left',
			},
			{
				alignment: 'center',
			},
			{
				alignment: 'center',
			},
			{
				alignment: 'right',
			},
		],
		spanningCells: [
			{
				col: 0,
				row: 0,
				colSpan: 1,
				alignment: 'center',
			},
			{
				col: 3,
				row: 0,
				colSpan: 1,
				alignment: 'center',
			},
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
			joinJoin: `┼`,
		},
	};

	// Printing stores + prices table:
	console.log(`\n${table(tableData, tableConfig)}`);

	// Printing how much you can save and where you should buy the game:
	console.log(
		`@ You can save: ${setColor(`${moneySaved} zł (${percentSaved}%)`, colors.highlightColor)} by buying the game on: ${setColor(`{${cheapestStores}}`, colors.store)}!`
	);

	// Printing execution time:
	const endTime = performance.now();
	console.log(`\nDone in: ${(endTime - startTime).toFixed(2)} ms`);
})();
