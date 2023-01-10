// For easy downloading of store websites for tests.

// Import:
const fs = require('fs');
const url = require('url');
const puppeteer = require('puppeteer');
const { resolve } = require('path');

(async () => {
	// Get args:
	let [urlString, fileName] = process.argv.slice(2);

	// Check if URL arg was given:
	if (typeof urlString === undefined || urlString === '--help' || urlString === '-h') {
		console.log('Usage: node download_site.js [URL] [output filename (without extension)]');
		process.exit(1);
	} else {
		// Setup puppeteer:
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Load page:
		await page.goto(urlString, { waitUntil: 'domcontentloaded' });

		// Download HTML:
		const html = await page.content();

		// Remove script tags:
		const bareHtml = html.replaceAll(new RegExp('(<script>?)(.|\n)*?(</script>)', 'gm'), '');

		browser.close();

		// Get filename from URL:
		const urlObject = url.parse(urlString, true);
		const urlFormatted = urlObject.path.slice(1).replaceAll('/', '^');
		/*                   ^ Looks a bit wacky but it makes
		 * switching between the `local` and `real` websites
		 * easy. You can do so by simply by using a `replace`
		 * function on the URL string. Also, the first `/`
		 * after the domain is removed from the filename
		 * because it will be in the URL either way:
		 * - https://localhost:3005[/]
		 * - https://www.xbox.com[/]
		 *
		 * P.S.
		 * It's made to work on all OSs... At least the main 3.
		 */

		// Writ to file:
		fs.writeFile(`${fileName ? fileName : `${resolve('')}\${urlFormatted}.html`.length >= 256 ? 'index' : urlFormatted}.html`, bareHtml, error => {
			/*        ^
			 - If user gives filename, use filename
			 - If user doesn't give filename
			 	- If absolute path of file will exceed `256` characters, use `index`
			 	- If absolute path of file will doesn't exceed `256` characters, use formatted URL.
			 */
			if (error) {
				console.log(error);
				process.exit(1);
			} else {
				console.log('@ Done');
			}
		});
	}
})();
