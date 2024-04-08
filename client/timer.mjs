let workingSet = {};
let intervalID;
const timerSection = document.querySelector('#timer');

export function createTimer(currentWorkout) {
    workingSet.hour = currentWorkout.hour;
    workingSet.mins = currentWorkout.mins;
    workingSet.secs = currentWorkout.secs;
    workingSet.restVal = currentWorkout.restVal;
    console.log(workingSet);

    const btn = document.createElement('button');
    btn.id = "startBtn";
    btn.textContent = 'Start The Workout!'
    btn.addEventListener('click', () => timer('working'));
    timerSection.append(btn);
}

function fixTime() {
    workingSet.secs--
    if (workingSet.secs <= 0 && workingSet.mins >= 1) {
        workingSet.secs = 60;
        workingSet.mins--;
    } if(workingSet.mins <= 0 && workingSet.hour >= 1){
        workingSet.mins = 60;
        workingSet.hour--;
    }

    if (workingSet.secs < 0) {
        clearTimeout(intervalID);
        rest();
    }
    console.log(workingSet);
    timer('working');
}

function timer(type) {
    if (type === 'working'){
        intervalID = setTimeout(fixTime, 1000);
    }
    if (type === 'rest'){
        intervalID = setTimeout(restTime, 1000);
    }
}

function rest() {
    console.log(workingSet.restVal);
}