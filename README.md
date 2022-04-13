# game-discount-checker

## Description:

A simple CLI tool that scrapes game store websites to check if a game's price got discounted.

---

### Instructions:

```bash
# 1. Install all packages:
npm install
```

---

### Couldn't have done it without these 😙

- [MS-Store-API](https://github.com/ThomasPe/MS-Store-API) - API used in microsoft.js
- [gogapidocs](https://github.com/Yepoleb/gogapidocs) - API used in gog.js
- [cli-spinner](https://github.com/sindresorhus/cli-spinners) - Animations used in spinner.js
- [node-fetch](https://github.com/node-fetch/node-fetch) - Handles requests to all APIs
- [puppeteer](https://github.com/puppeteer/puppeteer) - Helps in getting a game's ID in gog.js
- [table](https://github.com/gajus/table) - Prints table in app.js

---

### TOOD

- [ ] add Jest tests?
- [ ] diff region support
- [ ] finish up README.md
- [ ] make loading prices faster
- [ ] asynchronous price loading?
- [ ] add open store page (URL) feature
- [ ] name change (discounter / discountfetch)
- [ ] choose between (request / node-fetch) package
- [ ] use <https://github.com/LvChengbin/cli-style>?
- [ ] add support for keeping track of multiple games
- [ ] test on slower networks? (possible timeout errors?)
- [ ] higlight lower prices / discounts in console (coloring)
- [ ] display store icons in terminal (check if this is even possible)?
- [ ] clear (console before script ; show spinners) options in config.js
- [ ] redraw table as new prices are being loaded instead waiting for them?
- [ ] after first time with new URLs save gameId to file and until URL is changed (cache ids)
- [ ] make sure freebies / free / coming up games are returned correctly and don't cause errors
- [ ] if URL empty in config.json / no key for store don't check that store + don't display it in table
- [ ] for epic.js get data from some JSON el that is loaded before Price el in HTML or find unofficial api?
- [ ] make table work with only basic ASCII / add option to switch mode in config.json / and or auto detect?
- [ ] check store_modules with multiple games to check out filters and price and return discount values correctly
- [X] at end of table print how much you can save by comparing lowest discounted price to highest discounted and/or base price
- [ ] investigate discounts countdowns? (some APIs countdown to something - microsoft one) -> { "EndDate": "9998-12-30T00:00:00Z" }
- [X] print table in console [easy-table](https://www.npmjs.com/package/easy-table) ; [cli-table](https://github.com/Automattic/cli-table) ; [console-table](https://github.com/LvChengbin/console-table)

---

- [ ] refractor
- [ ] test on Win, Mac and Linux
- [ ] packages / install options on ^ OSs?
