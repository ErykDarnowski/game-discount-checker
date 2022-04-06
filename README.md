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

- [ ] store icons
- [ ] add jest tests?
- [ ] diff region support
- [ ] sort tables based on discounted prices
- [ ] change "Url" to "URL" in link var names?
- [ ] name change (discounter / discountfetch)
- [ ] choose between request / node-fetch package
- [ ] decide on license and change in package.json
- [ ] use <https://github.com/LvChengbin/cli-style>?
- [ ] add support for keeping track of multiple games
- [ ] test on slower networks? (possible timeout errors?)
- [ ] higlight lower prices / discounts in console (coloring)
- [ ] at end of table say how much you save by comparing lowest discounted price to highest discounted and/or base price
- [X] print table in console [easy-table](https://www.npmjs.com/package/easy-table) ; [cli-table](https://github.com/Automattic/cli-table) ; [console-table](https://github.com/LvChengbin/console-table)

---

- [ ] refractor
- [ ] test on Win, Mac and Linux
- [ ] packages / install options on ^ OSs
