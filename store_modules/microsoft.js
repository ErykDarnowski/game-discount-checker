// microsoft api github: https://github.com/ThomasPe/MS-Store-API

// Imports:
const { axios, formatPriceToFloat, calculateDiscountPercent } = require('../common.js');

const getPriceData = async microsoft_URL => {
	const productId = microsoft_URL.match(new RegExp('[a-zA-Z0-9]{12}'))[0];

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
			// Getting general data:
			const priceData = responseJSON.data.Products[0].DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price;

			// Getting specific data:
			const basePrice = formatPriceToFloat(priceData['MSRP']);
			const discountPrice = formatPriceToFloat(priceData['ListPrice']);
			const discountPercent = calculateDiscountPercent(basePrice, discountPrice);

			return [basePrice, discountPrice, discountPercent];
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getPriceData = getPriceData;
