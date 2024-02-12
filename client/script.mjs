import { timerText } from "./timerDOM.mjs";

const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');
const timerDisplay = document.querySelector('#mainTimer')

export let min = 0,
        sec = 0,
        hours = 0,
        intvID;

function fixTime() {
    sec++
    if (sec >= 60) {
        sec = 0;
        min++;
    } if(min >= 60){
        min = 0;
        hours++;
    }

    timerText();

    timer();
}

function timer() {
    intvID = setTimeout(fixTime, 1000);
}

startBtn.addEventListener('click', function() { 
    timer();
} )

pauseBtn.addEventListener('click', function() {
    clearTimeout(intvID);
})

stopBtn.addEventListener('click', function() {
    timerDisplay.textContent = '00hr 00min 00sec';
    hours = 0;
    min = 0;
    sec = 0;
    clearTimeout(intvID);
})

function pageLoaded(){
    console.log("Hi?")
}

pageLoaded();