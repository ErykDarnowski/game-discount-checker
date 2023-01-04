// Imports:
const fs = require('fs');
const Database = require('better-sqlite3');

// WRITE:
const db = new Database('cache.db', {
    //verbose: console.log
});

const stmt = db.prepare('CREATE TABLE IF NOT EXISTS cache( id INTEGER PRIMARY KEY AUTOINCREMENT, store_name VARCHAR, url VARCHAR, data VARCHAR );');
stmt.run();

const insert = db.prepare('INSERT INTO cache (store_name, url, data) VALUES (@store_name, @url, @data);');

const insertMany = db.transaction((stores) => {
    for (const store of stores) {
        insert.run(store)
    };
});

insertMany([
    { store_name: 'GOG', url: 'https://www.gog.com/pl/game/martha_is_dead', data: '1435943329' },
    { store_name: 'EPIC', url: 'https://store.epicgames.com/pl/p/martha-is-dead', data: '99' },
    { store_name: 'STEAM', url: 'https://store.steampowered.com/app/515960/Martha_Is_Dead/', data: '515960' },
    { store_name: 'MICROSOFT', url: 'https://www.xbox.com/pl-pl/games/store/martha-is-dead/9pm6sjbmvqzl', data: '9pm6sjbmvqzl' }
]);

// READ:
db.prepare(`SELECT * FROM cache`).all()[3].data;

// DELETE:
fs.unlink('cache.db', () => {});