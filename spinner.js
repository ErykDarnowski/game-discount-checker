/*
// https://raw.githubusercontent.com/sindresorhus/cli-spinners/00de8fbeee16fa49502fa4f687449f70f2c8ca2c/spinners.json

{
    // BRAIL FONT:
	"dots1": {
		"interval": 80,
		"frames": [
			"⠋",
			"⠙",
			"⠹",
			"⠸",
			"⠼",
			"⠴",
			"⠦",
			"⠧",
			"⠇",
			"⠏"
		]	
	},
	"dots2": {
		"interval": 80,
		"frames": [
			"⠄",
			"⠆",
			"⠇",
			"⠋",
			"⠙",
			"⠸",
			"⠰",
			"⠠",
			"⠰",
			"⠸",
			"⠙",
			"⠋",
			"⠇",
			"⠆"
		]
	},
	"dots3": {
		"interval": 80,
		"frames": [
			"⢄",
			"⢂",
			"⢁",
			"⡁",
			"⡈",
			"⡐",
			"⡠"
		]
	},
	"dots4": {
		"interval": 100,
		"frames": [
			"⠁",
			"⠂",
			"⠄",
			"⡀",
			"⢀",
			"⠠",
			"⠐",
			"⠈"
		]
	},
	"dots5": {
		"interval": 80,
		"frames": [
			"⢀⠀",
			"⡀⠀",
			"⠄⠀",
			"⢂⠀",
			"⡂⠀",
			"⠅⠀",
			"⢃⠀",
			"⡃⠀",
			"⠍⠀",
			"⢋⠀",
			"⡋⠀",
			"⠍⠁",
			"⢋⠁",
			"⡋⠁",
			"⠍⠉",
			"⠋⠉",
			"⠋⠉",
			"⠉⠙",
			"⠉⠙",
			"⠉⠩",
			"⠈⢙",
			"⠈⡙",
			"⢈⠩",
			"⡀⢙",
			"⠄⡙",
			"⢂⠩",
			"⡂⢘",
			"⠅⡘",
			"⢃⠨",
			"⡃⢐",
			"⠍⡐",
			"⢋⠠",
			"⡋⢀",
			"⠍⡁",
			"⢋⠁",
			"⡋⠁",
			"⠍⠉",
			"⠋⠉",
			"⠋⠉",
			"⠉⠙",
			"⠉⠙",
			"⠉⠩",
			"⠈⢙",
			"⠈⡙",
			"⠈⠩",
			"⠀⢙",
			"⠀⡙",
			"⠀⠩",
			"⠀⢘",
			"⠀⡘",
			"⠀⠨",
			"⠀⢐",
			"⠀⡐",
			"⠀⠠",
			"⠀⢀",
			"⠀⡀"
		]
	},
	"line2": {
		"interval": 100,
		"frames": [
			"⠂",
			"-",
			"–",
			"—",
			"–",
			"-"
		]	
	},

    // EMOJI FONT:
	"weather": {
		"interval": 100,
		"frames": [
			"☀️ ",
			"☀️ ",
			"☀️ ",
			"🌤 ",
			"⛅️ ",
			"🌥 ",
			"☁️ ",
			"🌧 ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"⛈ ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"☁️ ",
			"🌥 ",
			"⛅️ ",
			"🌤 ",
			"☀️ ",
			"☀️ "
		]
	},
	"orangeBluePulse": {
		"interval": 100,
		"frames": [
			"🔸 ",
			"🔶 ",
			"🟠 ",
			"🟠 ",
			"🔶 ",
			"🔹 ",
			"🔷 ",
			"🔵 ",
			"🔵 ",
			"🔷 "
		]
	},
	"clock": {
		"interval": 100,
		"frames": [
			"🕛 ",
			"🕐 ",
			"🕑 ",
			"🕒 ",
			"🕓 ",
			"🕔 ",
			"🕕 ",
			"🕖 ",
			"🕗 ",
			"🕘 ",
			"🕙 ",
			"🕚 "
		]
	},

    // ASCII
    "line1": {
		"interval": 130,
		"frames": [
			"-",
			"\\",
			"|",
			"/"
		]
	},
	"simpleDots": {
		"interval": 400,
		"frames": [
			".  ",
			".. ",
			"...",
			"   "
		]
	},
	"simpleDotsScrolling": {
		"interval": 200,
		"frames": [
			".  ",
			".. ",
			"...",
			" ..",
			"  .",
			"   "
		]
	},
	"bar1": {
		"interval": 70,
		"frames": [
			"[    ]",
            "[=   ]",
            "[==  ]",
            "[=== ]",
            "[ ===]",
            "[  ==]",
            "[   =]",
            "[    ]",
            "[   =]",
            "[  ==]",
            "[ ===]",
            "[====]",
            "[=== ]",
            "[==  ]",
            "[=   ]"
		]
	},
	"bar2": {
		"interval": 70,
		"frames": [
			"|    |",
            "|=   |",
            "|==  |",
            "|=== |",
            "| ===|",
            "|  ==|",
            "|   =|",
            "|    |",
            "|   =|",
            "|  ==|",
            "| ===|",
            "|====|",
            "|=== |",
            "|==  |",
            "|=   |"
		]
	}
}
*/

/*
.setSpinnerString('|/-\\'); // <= or num or type from enum
*/

// Imports:
const { setColor, colors } = require('./colors.js');

class Spinner {
	constructor(msg) {
		this.msg = msg + ' ';
	}

	start() {
		const interval = 70;
		let frameNum = 0;
		const frames = ['[    ]', '[=   ]', '[==  ]', '[=== ]', '[ ===]', '[  ==]', '[   =]', '[    ]', '[   =]', '[  ==]', '[ ===]', '[====]', '[=== ]', '[==  ]', '[=   ]'];

		this.timer = setInterval(() => {
			process.stdout.write('\r' + this.msg + setColor(frames[frameNum++], colors['spinner']));
			frameNum %= frames.length;
		}, interval);
	}

	stop(errState = false) {
		clearInterval(this.timer);
		process.stdout.write('\r' + this.msg + (errState ? setColor('[ ERR ]', colors['spinnerErr']) : setColor('[ OK ]', colors['spinnerOk'])) + '\n');
	}
}

/* Test:
const testSpinner = new Spinner("@ Fetching price from " + setColor("{GOG}", colors["store"]));

testSpinner.start();
setTimeout(() => {
    testSpinner.stop();
}, 4000);
*/

exports.Spinner = Spinner;
