# game-discount-checker

## Description

A simple cli tool that scrapes game store websites to check if a game's prices got lowered.

---

### Instructions

```bash
# 1. Install all packages:
npm install
```

---

### TOOD

- [ ] add Jest tests?
- [ ] diff region support
- [ ] finish up README.md
- [ ] make loading prices faster
- [ ] asynchronous price loading?
- [ ] add open store page (URL) feature
- [ ] sort tables based on discounted prices
- [ ] name change (discounter / discountfetch)
- [ ] decide on license and change in package.json
- [ ] choose between (request / node-fetch) package
- [ ] use <https://github.com/LvChengbin/cli-style>?
- [ ] add support for keeping track of multiple games
- [ ] test on slower networks? (possible timeout errors?)
- [ ] higlight lower prices / discounts in console (coloring)
- [ ] display store icons in terminal (check if this is even possible)?
- [ ] redraw table as new prices are being loaded instead waiting for them?
- [ ] at end of table print how much you can save by comparing lowest discounted price to highest discounted and/or base price
- [X] print table in console [easy-table](https://www.npmjs.com/package/easy-table) ; [cli-table](https://github.com/Automattic/cli-table) ; [console-table](https://github.com/LvChengbin/console-table)

---

- [ ] refractor
- [ ] test on Win, Mac and Linux
- [ ] packages / install options on ^ OSs?
