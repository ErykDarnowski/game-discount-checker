// Imports:
const { exec } = require('child_process');

const { getPriceData } = require('../../store_modules/epic.js');


// Starting up web server (so we don't repeatedly hit epic's servers):
const server = exec('npm run server');

const baseURL = 'http://localhost:3003/epic'; // "https://store.epicgames.com/pl/p";

jest.setTimeout(20000);

test('no discount, no list', () => {
	return getPriceData(`${baseURL}/fist-forged-in-shadow-torch`).then(priceArr => {
		expect(priceArr).toStrictEqual([124, 124, 0]);
	});
});

test('no discount, list', () => {
	return getPriceData(`${baseURL}/among-us`).then(priceArr => {
		expect(priceArr).toStrictEqual([17, 17, 0]);
	});
});

test('discount, list', () => {
	return getPriceData(`${baseURL}/divine-knockout`).then(priceArr => {
		expect(priceArr).toStrictEqual([89, 59.63, 33]);
	});
});

test('discount, no list', () => {
	return getPriceData(`${baseURL}/paladins--season-pass-2022`).then(priceArr => {
		expect(priceArr).toStrictEqual([119, 79.73, 33]);

		// Killing web server:
		exec(`taskkill /F /T /PID ${server.pid}`);
	});
});
