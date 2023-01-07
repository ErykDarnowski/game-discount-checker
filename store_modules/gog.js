// gog api: https://gogapidocs.readthedocs.io/en/latest/

// Imports:
const fs = require('fs');
const axios = require('axios');
const puppeteer = require('puppeteer');

const { formatPrice, calculateDiscountPercent } = require('../common.js');


const getGOGAppId = async gogURL => {
	const blockedTypes = ['xhr', 'font', 'ping', 'image', 'fetch', 'other', 'media', 'script', 'stylesheet'];
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	let appId = '';

	await page.setCacheEnabled(false);
	await page.setRequestInterception(true);

	page.on('request', req => {
		const url = req.url();

		// Blocking types of unneeded requests and some URLSs:
		if (url.startsWith('https://www.youtube.com/') || blockedTypes.includes(req.resourceType())) {
			req.abort();
		} else {
			//console.log(req.resourceType() + " = " + url);
			req.continue();
		}
	});

	await page.goto(gogURL);

	appId = await page.evaluate(() => window.productcardData['cardProduct']['id']);

	browser.close();

	return appId;
};

const getPriceData = async gogURL => {
	const cachePath = './cache.json';
	let appId = '';

	// Checking if cache file exists:
	try {
		if (fs.existsSync(cachePath)) {
			const cacheJSON = JSON.parse(fs.readFileSync('cache.json'));

			// check if URL value changed:
			if (gogURL != cacheJSON[0].url) {
				appId = await getGOGAppId(gogURL);

				const output = `[
					{
						"store_name": "GOG",
						"url": "${gogURL}",
						"data": "${appId}"
					}
				]`;

				fs.writeFileSync('cache.json', JSON.stringify(JSON.parse(output)));
			} else {
				appId = cacheJSON[0].data;
			}
		} else {
			appId = await getGOGAppId(gogURL);

			const output = `[
				{
					"store_name": "GOG",
					"url": "${gogURL}",
					"data": "${appId}"
				}
      ]`;

			fs.writeFileSync('cache.json', JSON.stringify(JSON.parse(output)));
		}

		// Fetching data from API:
		return axios
			.get(`https://api.gog.com/products/${appId}/prices?countryCode=pl`)
			.then(responseJSON => {
				// Getting general data:
				const priceOverview = responseJSON.data._embedded.prices[0];

				// Getting specified data:
				const basePrice = formatPrice(priceOverview['basePrice'].replace(' PLN', ''));
				const discountPrice = formatPrice(priceOverview['finalPrice'].replace(' PLN', ''));
				const discountPercent = calculateDiscountPercent(basePrice, discountPrice);

				return [basePrice, discountPrice, discountPercent];
			})
			.catch(error => {
				console.log(error);
			});
	} catch (err) {
		console.error(err);
	}
};

exports.getPriceData = getPriceData;
