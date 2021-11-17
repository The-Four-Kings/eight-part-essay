"use strict";
/* eslint-disable no-console */
// import chalk from 'chalk';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// import figures from 'figures';
// const { green, grey, red, underline, yellow } = chalk;
var isEnabled = true;
function setEnabled(value) {
    isEnabled = value;
}
var isTimeEnabled = true;
function setTimeEnabled(value) {
    isTimeEnabled = value;
}
function baseConsole(consoleOption, message) {
    var optionalParams = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        optionalParams[_i - 2] = arguments[_i];
    }
    if (!isEnabled)
        return;
    if (isTimeEnabled) {
        var date = new Date();
        var dateStr = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
        message = dateStr + " " + message;
    }
    var consoleFn = consoleOption.consoleFn, colorFn = consoleOption.colorFn, badge = consoleOption.badge;
    if (badge) {
        message = badge + " " + message;
    }
    if (colorFn) {
        consoleFn(colorFn.apply(void 0, __spreadArray([message], optionalParams, false)));
    }
    else {
        consoleFn.apply(void 0, __spreadArray([message], optionalParams, false));
    }
}
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    baseConsole.apply(void 0, __spreadArray([{
            consoleFn: console.log,
            // colorFn: grey
        },
        message], optionalParams, false));
}
function success(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    baseConsole.apply(void 0, __spreadArray([{
            consoleFn: console.log,
            // colorFn: green,
            // badge: figures.tick
        },
        message], optionalParams, false));
}
function error(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    baseConsole.apply(void 0, __spreadArray([{
            consoleFn: console.error,
            // colorFn: red,
            // badge: figures.cross
        },
        message], optionalParams, false));
}
function warn(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    baseConsole.apply(void 0, __spreadArray([{
            consoleFn: console.warn,
            // colorFn: yellow,
            // badge: figures.warning
        },
        message], optionalParams, false));
}
exports.default = { setEnabled: setEnabled, log: log, error: error, warn: warn, success: success };
