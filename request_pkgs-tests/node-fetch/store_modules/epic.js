// Imports:
const { puppeteer, formatPriceToFloat } = require('../common.js')

async function getPriceData(epicURL) {
    /*
    const blockedTypes = [
        'xhr',
        'font',
        'image',
        'media',
        'script',
        'stylesheet'
    ];
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();    

    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);


    page.on('request', (req) => {
        const url = req.url();
        
        // Blocking types of unneeded requests:
        if (blockedTypes.includes(req.resourceType())) {
            req.abort();
        } else {
            //console.log(req.resourceType() + " = " + url);
            req.continue();
        };
    });

    await page.goto(epicURL);

    /
    var schemaJSON = await page.evaluate(
        () => document.querySelector('script[type="application/ld+json"]').innerText
    );

    var priceLayout = [JSON.parse(schemaJSON)["offers"][0]["priceSpecification"]["price"]];

    @ First run:
    - Get base price from PriceLayout el
    - Save in caceh

    @ Next runs:
    - Get current price from _schemaOrgMarkup-Product JSON el
    - Compare to cached value and calculate diff

    ^ check speed
    /
    
    var element = await page.waitForSelector('[data-component="PriceLayout"]');
    var priceLayout = await page.evaluate(element => element.innerText, element);
    priceLayout = priceLayout.replaceAll("PLN ", "").split("\n");

    browser.close();
    
    // Check if discount:
    var priceDataArr = [];
    if (priceLayout.length == 1) {
        var basePrice = formatPriceToFloat(priceLayout[0]);
        
        //console.log(basePrice + "zł");
        priceDataArr = [basePrice, basePrice, 0];
    } else {
        var basePrice = formatPriceToFloat(priceLayout[1]);
        var discountPrice = formatPriceToFloat(priceLayout[2]);
        var discountPercent = Math.round(parseFloat(priceLayout[0].replace("-", "").replace("%", "")));
        
        //console.log(basePrice + "zł -> " + discountPrice + "zł = -" + discountPercent + "%");
        priceDataArr = [basePrice, discountPrice, discountPercent];
    };
    
    return priceDataArr;
    */
    
    return [99, 99, 0];
};

exports.getPriceData = getPriceData;