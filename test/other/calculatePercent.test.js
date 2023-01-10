// Imports
const { calculatePercent } = require('../../common.js');


const casesNormal = [];
const casesReversed = [];

for (let i = 0; i <= 100; i++){
    casesNormal.push([100, i, i]);
};

for (let i = 0; i <= 100; i++){
    casesReversed.push([100, i, 100 - i]);
};


describe('normal', () => {
	test.each(casesNormal)("given %p and %p as arguments, returns %p", (bare, lower, expectedResult) => {
		expect(calculatePercent(bare, lower)).toEqual(expectedResult);
	});
});

describe('reversed', () => {
	test.each(casesReversed)("given %p and %p as arguments, returns %p", (bare, lower, expectedResult) => {
		expect(calculatePercent(bare, lower, true)).toEqual(expectedResult);
	});
});
