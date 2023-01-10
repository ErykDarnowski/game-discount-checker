// API -> <https://github.com/ThomasPe/MS-Store-API>

// Imports:
const axios = require('axios');

const { calculatePercent } = require('../common.js');


const getPriceData = async microsoft_URL => {
	const [productId] = microsoft_URL.match(new RegExp('[a-zA-Z0-9]{12}'));

	// Fetching data from API:
	return axios
		.post(
			'https://storeedgefd.dsx.mp.microsoft.com/v8.0/sdk/products?market=PL&locale=pl-PL&deviceFamily=Windows.Desktop',
			{
				productIds: productId,
			},
			{
				'Content-Type': 'application/json',
			}
		)
		.then(responseJSON => {
			// Extracting price data:
			const {
				MSRP: basePrice,
				ListPrice: discountPrice,
			} = responseJSON['data']['Products'][0]['DisplaySkuAvailabilities'][0]['Availabilities'][0]['OrderManagementData']['Price'];

			return [
				basePrice,
				discountPrice,
				calculatePercent(basePrice, discountPrice),
			];
		})
		.catch(error => {
			console.error(error);
		});
};

exports.getPriceData = getPriceData;
