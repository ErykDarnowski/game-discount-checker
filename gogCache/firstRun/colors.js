// More colors: https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html

var start = "\x1b[";
var end = start + "0m";
var colors = {
    "store": start + "35m",
    "highlightColor": start + "31m",
    "spinner": start + "36m", 
    "spinnerOk":  start + "32m",
    "spinnerErr": start + "31m" 
};

function setColor(str, color) {
    return color + str + end;
};

module.exports = {
    setColor: setColor,
    colors: colors
};