// Imports:
const puppeteer = require('puppeteer');

const { formatPriceToFloat } = require('../common.js');


const getPriceData = async epicURL => {
	// Puppeteer setup:
	const blockedTypes = ['xhr', 'font', 'image', 'media', 'other', 'script', 'stylesheet'];
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();

	// Additional setup:
	await page.setCacheEnabled(false);
	await page.setRequestInterception(true);
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
	// ^ Fix for epic asking for verification instead of loading:

	// Filtering out unwanted requests (major speed up):
	page.on('request', req => {
		// Blocking types of unneeded requests:
		if (blockedTypes.includes(req.resourceType())) {
			req.abort();
		} else {
			//console.log(req.resourceType() + " = " + req.url());
			req.continue();
		}
	});

	// Loading page:
	await page.goto(epicURL);

	// Getting prices element - either single price or the discount %, base and discounted prices:
	const pricesStringEl = await page.waitForXPath("//*[*/*/*/*/text()[contains(.,'zł')][string-length() <= 10]]"); // ("//div[div/div/div/span/text()[contains(.,'zł')][string-length() <= 10]]" <- makes the XPath more rigid and less flexible for small changes):

	// Getting text from prices element:
	const pricesString = await page.evaluate(pricesStringEl => pricesStringEl.innerText, pricesStringEl);

	browser.close();

	// Getting discount %, base and discounted prices from string:
	const pricesArray = pricesString.match(new RegExp('[0-9,?]{1,}', 'g')).map(el => formatPriceToFloat(el));

	// Checking if game is discounted or not + formatting output:
	if (pricesArray.length !== 1) {
		return [pricesArray[1], pricesArray[2], pricesArray[0]];
	} else {
		return [pricesArray[0], pricesArray[0], 0];
	}
};

/* Test:
(async () => {
	console.log(await getPriceData("https://store.epicgames.com/p/cyberpunk-2077"));
})();
*/

//module.exports = getPriceData;
exports.getPriceData = getPriceData;
