// API -> <https://gogapidocs.readthedocs.io/en/latest/>

// Imports:
const fs = require('fs');
const axios = require('axios');
const puppeteer = require('puppeteer');

const { formatPrice, calculatePercent } = require('../common.js');


const getGOGAppId = async gogURL => {
	let appId;
	const blockedTypes = ['xhr', 'font', 'ping', 'image', 'fetch', 'other', 'media', 'script', 'stylesheet'];
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();

	await page.setCacheEnabled(false);
	await page.setRequestInterception(true);

	page.on('request', req => {
		// Blocking types of unneeded requests and some URLSs:
		if (req.url().startsWith('https://www.youtube.com/') || blockedTypes.includes(req.resourceType())) {
			// ^ change to `includes('youtube')`?
			req.abort();
		} else {
			//console.log(req.resourceType() + " = " + req.url());
			req.continue();
		}
	});

	await page.goto(gogURL);

	appId = await page.evaluate(() => window.productcardData['cardProduct']['id']);

	browser.close(); // await?

	return appId;
};

const getPriceData = async gogURL => {
	let appId;
	const cachePath = './cache.json';

	// Checking if cache file exists:
	try {
		if (fs.existsSync(cachePath)) {
			const [cacheJSON] = JSON.parse(fs.readFileSync('cache.json'));

			// check if URL value changed:
			if (gogURL !== cacheJSON.url) {
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
				appId = cacheJSON.data;
			};
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
				// Extracting price data:
				const [
					basePrice,
					discountPrice,
				] = Object.values(responseJSON['data']['_embedded']['prices'][0])
					//  ^ converting object to array
					.slice(1) // <- removing first value (an object)
					.map(el => el.slice(0, -4)); // <- initial formatting (removing ` PLN`)

				return [
					formatPrice(basePrice),
					formatPrice(discountPrice),
					calculatePercent(basePrice, discountPrice),
				];
			})
			.catch(error => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
	}
};

/* Test:
(async () => {
	getPriceData('https://www.gog.com/en/game/fear_platinum');
})();
*/


exports.getPriceData = getPriceData;
