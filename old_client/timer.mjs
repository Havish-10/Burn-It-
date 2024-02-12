import { handleTime, initialVal, intervalID } from "./script.mjs";
const timer = document.querySelector("#timer");
const status = document.querySelector('#motivate');
const sets = document.querySelector('#setsLim');
const rest = document.querySelector('#restLim');

export function updateTimer(min, sec, intervalID) {

    status.textContent = 'You got this!';
    rest.value = initialVal.rest;

    if (min.value === ''){
        min.value = 0;
    }
    if (sec.value === ''){
        sec.value = 0;
    }

    if(sec.value <= 0 && min.value > 1) {
        min.value--;
        sec.value = 60
        timer.textContent = `${min.value} Min and ${sec.value} Sec`
    } else if (sec.value > 0) {
        sec.value--;
        timer.textContent = `${min.value} Min and ${sec.value} Sec`
    } else if(min.value <= 1 && min.value > 0) {
        min.value = 0
        sec.value = 60
        timer.textContent = `${min.value} Min and ${sec.value} Sec`
    } 


// If current Workout is finished, Check for Sets and Clear Intervals. Handles Button Status.
    if (sec.value <= 0 && min.value <= 0) {
        if (sets.value <= 1) {
            timer.textContent = 'Times UP!'
        } else if (sets.value > 1) {
            timer.textContent = 'More sets COMING UP!'
            console.log(initialVal.min);
            min.value = initialVal.min;
            sec.value = initialVal.sec;
        }
        clearInterval(intervalID);
        const buttons = document.querySelectorAll('#pause, #stop, #start');
        for (const button of buttons){
            if(button.id === 'start'){
                button.disabled = false;
            }
            if(button.id != 'start'){
                button.disabled = true;
            }
        }

        handleSets(min, sec);
    }
}

export function pauseTimer(intervalID) {
    status.textContent = 'Timer PAUSED! Press Start When Ready';

    const start = document.querySelector('#start');
    start.disabled = false;

    const pause = document.querySelector('#pause');
    pause.disabled = true;

    clearInterval(intervalID);
    console.log(intervalID);
}

export function stopTimer(min, sec, intervalID) {
    clearInterval(intervalID);
    status.textContent = 'Press Start When Ready';
    timer.textContent = 'Timer Has Been Stopped!'

    const buttons = document.querySelectorAll('#pause, #stop, #start');
    for (const button of buttons){
        if(button.id === 'start'){
            button.disabled = false;
        }
        if(button.id != 'start'){
            button.disabled = true;
        }
    }

    min.value = 0;
    sec.value = 0;
}

function handleSets(minVal, secVal) {
    if (sets.value > 1) {
        rest.value++;
        handleRest();
        minVal.value = initialVal.min;
        secVal.value = initialVal.sec;
    } else if (sets.value <= 1) {
        status.textContent = 'Press Start When Ready';
        setTimeout( function() { timer.textContent = 'Workout Finished!' }, 2000 );
        sets.value = 0;
    }
}

function handleRest() {
    if (rest.value <= 0) {
        rest.value = 30;
    }
    const intID = setInterval( function() {timer.textContent = rest.value--; `${rest.value}s Left of REST!`; console.log(rest.value)}, 1000);
    setTimeout( function() { handleTime(); sets.value--; clearInterval(intID) }, (initialVal.rest * 1000) );
}

// const el = {};
// const elements = document.querySelectorAll(['id']);

// for (const element of elements) {
//     const id = element.id;
//     el[id] = element;
// }