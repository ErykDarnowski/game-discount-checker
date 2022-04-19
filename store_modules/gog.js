// gog api: https://gogapidocs.readthedocs.io/en/latest/

// Imports:
const { fs, puppeteer, axios, formatPrice, calculateDiscountPercent } = require('../common.js');


async function getGOGAppId(gogURL) {
    const blockedTypes = [
        'xhr',
        'font',
        'ping',
        'image',
        'fetch',
        'other',
        'media',
        'script',
        'stylesheet'
    ];
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    var appId = "";

    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    

    page.on('request', (req) => {
        const url = req.url();

        // Blocking types of unneeded requests and some URLSs:
        if (url.startsWith("https://www.youtube.com/") || blockedTypes.includes(req.resourceType())) {
            req.abort();
        } else {
            //console.log(req.resourceType() + " = " + url);
            req.continue();
        };
    });

    await page.goto(gogURL);

    appId = await page.evaluate(
        () => window.productcardData["cardProduct"]["id"]
    );

    browser.close();


    return appId;
};


async function getPriceData(gogURL) {
    const cachePath = './cache.json';
    var appId = "";

    // Checking if cache file exists:
    try {
        if (fs.existsSync(cachePath)) {
            var cacheJSON = JSON.parse(fs.readFileSync('cache.json'));

            // check if URL value changed:
            if (gogURL != cacheJSON[0].url) {
                appId = await getGOGAppId(gogURL);

                var output = `[
                    {
                        "store_name": "GOG",
                        "url": "` + gogURL + `",
                        "data": "` + appId + `"
                    }
                ]`;

                fs.writeFileSync('cache.json', JSON.stringify(JSON.parse(output)));
            } else {
                appId = cacheJSON[0].data;
            };
        } else {
            appId = await getGOGAppId(gogURL);
            
            var output = `[
                {
                    "store_name": "GOG",
                    "url": "` + gogURL + `",
                    "data": "` + appId + `"
                }
            ]`;

            fs.writeFileSync('cache.json', JSON.stringify(JSON.parse(output)));
        };

        
        // Fetching data from API:
        return axios.get("https://api.gog.com/products/" + appId + "/prices?countryCode=pl").then((responseJSON) => {
            // Getting general data:
            var priceOverwiew = responseJSON.data._embedded.prices[0];

            // Getting specified data:
            var basePrice = formatPrice(priceOverwiew['basePrice'].replace(" PLN", ""));
            var discountPrice = formatPrice(priceOverwiew['finalPrice'].replace(" PLN", ""));
            var discountPercent = calculateDiscountPercent(basePrice, discountPrice);

            return [basePrice, discountPrice, discountPercent];
        }).catch((error) => {
            console.log(error);
        });
    } catch(err) {
        console.error(err);
    };
};

exports.getPriceData = getPriceData;