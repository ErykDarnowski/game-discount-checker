# game-discount-checker

[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT)
<br>
![total lines](https://img.shields.io/tokei/lines/github/ErykDarnowski/game-discount-checker?color=red)
![repo size](https://img.shields.io/github/repo-size/ErykDarnowski/game-discount-checker?color=red)

## Description:

A simple CLI tool that scrapes game store websites to check if a game's price got discounted.

---

### Instructions:

```bash
# 1. Install all packages:
npm install

# 2. Configue settings and input store URLs in to config.js file
code config.js

# INSTALL / COPY FILES / ALIAS idk. (in /usr/bin)

# 3. Use
node app.js
```

---

### Couldn't have done it without these 😙

- [MS-Store-API](https://github.com/ThomasPe/MS-Store-API) - API used in microsoft.js
- [gogapidocs](https://github.com/Yepoleb/gogapidocs) - API used in gog.js
- [cli-spinner](https://github.com/sindresorhus/cli-spinners) - Animations used in spinner.js
- [node-fetch](https://github.com/node-fetch/node-fetch) - Handles requests to all APIs
- [puppeteer](https://github.com/puppeteer/puppeteer) - Helps in getting a game's ID in gog.js
- [table](https://github.com/gajus/table) - Prints table in app.js