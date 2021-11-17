/* eslint-disable no-console */
import chalk from 'chalk';

// import figures from 'figures';

const { green, grey, red, underline, yellow } = chalk;
let isEnabled: boolean = true;
function setEnabled(value: boolean) {
    isEnabled = value;
}

let isTimeEnabled: boolean = true;
function setTimeEnabled(value: boolean) {
    isTimeEnabled = value;
}

function baseConsole(consoleOption: IConsoleOption, message: string, ...optionalParams: unknown[]) {
    if (!isEnabled) return;

    if (isTimeEnabled) {
        const date = new Date();
        const dateStr = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
        message = `${dateStr} ${message}`;
    }

    const { consoleFn, colorFn, badge } = consoleOption;
    if (badge) {
        message = `${badge} ${message}`;
    }

    if (colorFn) {
        consoleFn(colorFn(message, ...optionalParams));
    } else {
        consoleFn(message, ...optionalParams);
    }
}

function log(message: string, ...optionalParams: unknown[]) {
    baseConsole(
        {
            consoleFn: console.log,
            colorFn: grey
        },
        message, ...optionalParams
    );
}

function success(message: string, ...optionalParams: unknown[]) {
    baseConsole(
        {
            consoleFn: console.log,
            colorFn: green,
            // badge: figures.tick
        },
        message, ...optionalParams
    );
}

function error(message: string, ...optionalParams: unknown[]) {
    baseConsole(
        {
            consoleFn: console.error,
            colorFn: red,
            // badge: figures.cross
        },
        message, ...optionalParams
    );
}

function warn(message: string, ...optionalParams: unknown[]) {
    baseConsole(
        {
            consoleFn: console.warn,
            colorFn: yellow,
            // badge: figures.warning
        },
        message, ...optionalParams
    );
}

export default { setEnabled, log, error, warn, success };

interface IConsoleOption {
    consoleFn: (...data: Array<unknown>) => void,
    colorFn?: (...text: unknown[]) => string,
    badge?: string
}
