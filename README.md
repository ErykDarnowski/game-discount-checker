<p align="center">
    <a alt="license" href="http://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/license-MIT-darkergreen.svg?style=flat" />
    </a>
    <br>
    <img alt="total lines" src="https://img.shields.io/tokei/lines/github/ErykDarnowski/game-discount-checker?color=red" />
    <img alt="repo size" src="https://img.shields.io/github/repo-size/ErykDarnowski/game-discount-checker?color=red" />
    <br>
    <a alt="open issues" href="https://github.com/ErykDarnowski/game-discount-checker/issues?q=is%3Aopen+is%3Aissue">
        <img src="https://img.shields.io/github/issues-raw/ErykDarnowski/game-discount-checker" />
    </a>
    <a alt="closed issues" href="https://github.com/ErykDarnowski/game-discount-checker/issues?q=is%3Aissue+is%3Aclosed">
        <img src="https://img.shields.io/github/issues-closed-raw/ErykDarnowski/game-discount-checker?color=yellow" />
    </a>
    <br>
    <br>
    <a alt="1.0 milestone" href="https://github.com/ErykDarnowski/game-discount-checker/milestone/1">
        <img src="https://img.shields.io/github/milestones/progress-percent/ErykDarnowski/game-discount-checker/1?label=1.0%20milestone" />
    </a>
</p>

# game-discount-checker

## Description

A simple CLI tool that scrapes game store websites to check if a game's price got discounted.

---

### Instructions

```bash
# 1. Install all packages:
npm install

# 2. Configure settings and input store URLs in to config.js file
code config.js

# INSTALL / COPY FILES / ALIAS idk. (in /usr/bin)

# 3. Use
node app.js
```

---

### Couldn't have done it without these 😙

- [MS-Store-API](https://github.com/ThomasPe/MS-Store-API) - API used in microsoft.js
- [cli-spinner](https://github.com/sindresorhus/cli-spinners) - Animations used in spinner.js
- [gogapidocs](https://github.com/Yepoleb/gogapidocs) - API used in gog.js
- [puppeteer](https://github.com/puppeteer/puppeteer) - Helps in getting a game's ID in gog.js
- [axios](https://github.com/axios/axios) - Handles requests to all APIs
- [table](https://github.com/gajus/table) - Prints table in app.js
