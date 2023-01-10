// Funcs:
// Calculates percent of discount:
const calculatePercent = (base, lower, reverse = false) => {
	const calc = (lower * 100) / base;
	return Math.round(reverse ? 100 - calc : calc);
};

// Adds "." before 2 numbers from end [example: 10799 -> 107.99]:
const formatPrice = priceInt => {
	const priceStr = String(priceInt);
	return parseFloat(priceStr.slice(0, -2) + '.' + priceStr.slice(-2));
};

module.exports = {
	calculatePercent,
	formatPrice,
};
