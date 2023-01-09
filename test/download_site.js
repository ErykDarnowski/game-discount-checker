// For easy downloading of store websites for tests.

// Import:
const fs = require('fs');
const puppeteer = require('puppeteer');

// Get URL from arg:
const [url, fileName] = process.argv.slice(2);

(async (url, fileName = 'index') => {
	// Checking if URL was given:
	if (url === undefined) {
		console.error('@ No URL');
		console.log('node download_site.js [URL] [output file name (no extension)]');
		process.exit(1);
	} else {
		// Setup puppeteer:
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Load page:
		await page.goto(url, { waitUntil: 'domcontentloaded' });

		// Download HTML:
		const html = await page.content();

		// Remove script tags:
		const bareHtml = html.replaceAll(new RegExp('(<script>?)(.|\n)*?(</script>)', 'gm'), '');

		browser.close();

		// Writing to file:
		fs.writeFile(`${fileName}.html`, bareHtml, error => {
			if (error) {
				console.log(error);
				process.exit(1);
			} else {
				console.log('@ Done');
			}
		});
	}
})(url, fileName);
