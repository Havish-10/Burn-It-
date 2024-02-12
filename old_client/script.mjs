import { pauseTimer, stopTimer, updateTimer } from "./timer.mjs";
export let intervalID = null;


const timeLimitMin = document.querySelector('#timeLimMin');
const timeLimitSec = document.querySelector('#timeLimSec');
const setsLimit = document.querySelector('#setsLim');
const restLimit = document.querySelector('#restLim');
export const initialVal = {
    min: 0,
    sec: 0,
    sets: 0,
    rest: 0
}

export function handleTime() {
    start.disabled = true;
    pause.disabled = false;
    stop.disabled = false;
    intervalID = null;

    timeLimitMin.value = initialVal.min;
    timeLimitSec.value = initialVal.sec;

    const errorMsg = document.querySelector('#secondError');

    if(timeLimitSec.value > 60){
        errorMsg.textContent = "Please Input a Valid Second's Value (0-60)s"
    } else if(timeLimitSec.value <= 60) {
        errorMsg.textContent = ""
        timeLimitSec.value++
        if (!intervalID === true){
            intervalID = setInterval( function() { updateTimer(timeLimitMin, timeLimitSec, intervalID); }, 1000);
            updateTimer(timeLimitMin, timeLimitSec);
        }
    }
}

function saveValues() {
    if (timeLimitMin.value === '') {
        initialVal.min = 0;
    } else {
        initialVal.min = timeLimitMin.value
    }

    if (timeLimitSec.value === '') {
        initialVal.sec = 0;
    } else {
        initialVal.sec = timeLimitSec.value
    }

    if (setsLimit.value === '') {
        initialVal.sets = 0;
    } else {
        initialVal.sets = setsLimit.value
    }

    if (restLimit.value === '') {
        initialVal.rest = 0;
    } else {
        initialVal.rest = restLimit.value
    }

    handleTime();
}
// function prepareHandles() {
//     const el = {};
//     const elements = document.querySelectorAll(['id']);
//     for (const element of elements) {
//         const id = element.id;
//         el[id] = element;
//         console.log(el[id]);
//     }
// }

function pageLoaded(){
    console.log("Hello?")
    // prepareHandles();
}

const start = document.querySelector('#start');
start.addEventListener('click', saveValues);

const pause = document.querySelector('#pause');
pause.addEventListener('click', function() { pauseTimer(intervalID) });

const stop = document.querySelector('#stop');
stop.addEventListener('click', function() { stopTimer(timeLimitMin, timeLimitSec, intervalID) });

pageLoaded();