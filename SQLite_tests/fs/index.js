const fs = require('fs');

// WRITE:
var output = `[
  {
    "store_name": "GOG",
    "url": "https://www.gog.com/pl/game/martha_is_dead",
    "data": "1435943329"
  },
  {
    "store_name": "EPIC",
    "url": "https://store.epicgames.com/pl/p/martha-is-dead",
    "data": "99"
  },
  {
    "store_name": "STEAM",
    "url": "https://store.steampowered.com/app/515960/Martha_Is_Dead/",
    "data": "515960"
  },
  {
    "store_name": "MICROSOFT",
    "url": "https://www.xbox.com/pl-pl/games/store/martha-is-dead/9pm6sjbmvqzl",
    "data": "9pm6sjbmvqzl"
  }
]`;

fs.writeFileSync('cache.json', JSON.stringify(JSON.parse(output)));

// READ:
JSON.parse(fs.readFileSync('cache.json'))[3].data;

// DELETE:
fs.unlink('cache.json', () => {});