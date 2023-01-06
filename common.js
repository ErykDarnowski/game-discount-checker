// Imports:
const fs = require('fs');
const axios = require('axios');
const puppeteer = require('puppeteer');

// Funcs:
// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
	var priceArr = String(priceInt).split('');
	return parseFloat(priceArr.slice(0, priceArr.length - 2).join('') + '.' + priceArr.slice(priceArr.length - 2, priceArr.length).join(''));
}
const formatPrice = priceInt => {

// Changes "," in price str to "." and formats it to a float:
const formatPriceToFloat = price => {
	return parseFloat(String(price).replace(',', '.'));
};

// Calculates percent of discount:
const calculateDiscountPercent = (basePrice, discountPrice) => {
	return Math.round(100 - (discountPrice * 100) / basePrice);
};

module.exports = {
	fs: fs,
	axios: axios,
	puppeteer: puppeteer,
	formatPrice: formatPrice,
	formatPriceToFloat: formatPriceToFloat,
	calculateDiscountPercent: calculateDiscountPercent,
};
