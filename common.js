// Funcs:
// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
const formatPrice = priceInt => {
	const priceStr = String(priceInt);
	return parseFloat(priceStr.slice(0, -2) + '.' + priceStr.slice(-2));
};

// Changes "," in price str to "." and formats it to a float:
const formatPriceToFloat = price => {
	return parseFloat(String(price).replace(',', '.'));
};

// Calculates percent of discount:
const calculateDiscountPercent = (basePrice, discountPrice) => {
	return Math.round(100 - (discountPrice * 100) / basePrice);
};

module.exports = {
	calculateDiscountPercent,
	formatPriceToFloat,
	formatPrice,
};
