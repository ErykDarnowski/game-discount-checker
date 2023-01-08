/*
- https://steamdb.info/blog/store-prices-api/
- https://nik-davis.github.io/posts/2019/steam-data-collection/
- https://stackoverflow.com/questions/29591313/steam-api-grabbing-a-list-of-prices
*/

// Imports:
const axios = require('axios');

const { formatPrice } = require('../common.js');


const getPriceData = async steamURL => {
	const [gameId] = steamURL.match(new RegExp('(?<=/)[0-9]{1,}'));
	const apiURL = `https://store.steampowered.com/api/appdetails?appids=${gameId}&cc=PLN`;

	// Fetching data from API:
	return axios
		.get(apiURL)
		.then(responseJSON => {
			// Extracting price data:
			const {
				initial: basePrice,
				final: discountPrice,
				discount_percent: discountPercent,
			} = responseJSON['data'][gameId]['data']['price_overview'];

			return [
				formatPrice(basePrice),
				formatPrice(discountPrice),
				discountPercent,
			];
		})
		.catch(error => {
			console.error(error);
		});
};

exports.getPriceData = getPriceData;
