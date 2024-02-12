import { hours, min, sec } from "./script.mjs";

const timer = document.querySelector('#mainTimer')

export function timerText() {
    timer.textContent = 
        (hours && hours > 9 ? hours : '0' + hours) + 'hr ' +
        (min && min > 9 ? min : '0' + min) + 'min ' +
        (sec && sec > 9 ? sec : '0' + sec) + 'sec ';
}