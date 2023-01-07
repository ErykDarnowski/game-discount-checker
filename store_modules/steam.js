/*
- https://steamdb.info/blog/store-prices-api/
- https://nik-davis.github.io/posts/2019/steam-data-collection/
- https://stackoverflow.com/questions/29591313/steam-api-grabbing-a-list-of-prices
*/

// Imports:
const { axios, formatPrice } = require('../common.js');

const getPriceData = async steamURL => {
	const splitURL = steamURL.split('app');
	const gameId = splitURL[1].split('/')[1];
	const apiURL = splitURL[0] + 'api/appdetails?appids=' + gameId + '&cc=PLN';

	// Fetching data from API:
	return axios
		.get(apiURL)
		.then(responseJSON => {
			// Getting general data:
			const priceOverview = responseJSON.data[gameId].data.price_overview;

			// Getting specific data:
			const basePrice = formatPrice(priceOverview['initial']);
			const discountPrice = formatPrice(priceOverview['final']);
			const discountPercent = priceOverview['discount_percent'];

			return [basePrice, discountPrice, discountPercent];
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getPriceData = getPriceData;
