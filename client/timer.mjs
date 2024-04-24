let workingSet = {};
let repetitions;
let workID;
let intervalID;
let totalTime;
const timerSection = document.querySelector('#timer');
const progressCircle = document.querySelector('#progress-circle');

export function createTimer(currentWorkout, type) {
    workID = currentWorkout.workoutID;
    workingSet.hour = currentWorkout.hour;
    workingSet.mins = currentWorkout.mins;
    workingSet.secs = currentWorkout.secs;
    workingSet.restVal = currentWorkout.restVal;
    totalTime = (currentWorkout.hour * 60 * 60) + (currentWorkout.mins * 60) + currentWorkout.secs;
    console.log(workingSet);

    if ( type !== 'ignore'){
        repetitions = currentWorkout.setNo - 1;
    }

    if (!document.querySelector('#startBtn')){
        const btn = document.createElement('button');
        btn.id = "startBtn";
        btn.classList.add('start');
        btn.textContent = 'Start The Workout!'
        btn.addEventListener('click', () => timer('working'));
        timerSection.append(btn);
    }

    if (!document.querySelector('#pauseBtn')){
        const btn = document.createElement('button');
        btn.id = "pauseBtn";
        btn.classList.add('pause');
        btn.textContent = 'Pause The Workout!'
        btn.addEventListener('click', () => pauseWorkout());
        timerSection.append(btn);
    }

    if (!document.querySelector('#stopBtn')){
        const btn = document.createElement('button');
        btn.id = "stopBtn";
        btn.classList.add('stop');
        btn.textContent = 'Stop The Workout!'
        btn.addEventListener('click', () => stopWorkout());
        timerSection.append(btn);
    }
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

    if (workingSet.secs <= 0) {
        workingSet.secs = 0;
        clearTimeout(intervalID);
        timer('rest');
    } else {
        timer('working');
    }
    console.log(workingSet);
}

function timer(type) {
    handleDOM();
    if (type === 'working'){
        intervalID = setTimeout(fixTime, 1000);
    }
    if (type === 'rest'){
        intervalID = setTimeout(rest, 1000);
    }
}

async function rest() {
    if (repetitions <= 0) {
        finishWorkout();
    } else if(repetitions >= 1) {
        if(workingSet.restVal <= 0) {
            repetitions--;
            const response = await fetch(`workout/${workID}`);
            let workout;
            if (response.ok) {
              workout = await response.json();
              createTimer(workout, 'ignore');
              timer('working');
            } else {
              console.log('failed to find workout', response);
            }
        } else if(workingSet.restVal >= 1){
            workingSet.restVal--
            timer('rest');
        }
    }
    console.log(workingSet);
}

function pauseWorkout(){
    clearInterval(intervalID);
}

function finishWorkout() {
    stopWorkout();
    const btns = document.querySelectorAll('#startBtn, #pauseBtn, #stopBtn')
    for (const btn of btns) {
        btn.disabled = true;
    }
    const alarm = new Audio('/audio/alarm.mp3')
    alarm.play();

    setTimeout(function() {
    alarm.pause();
    alarm.currentTime = 0;
    }, 12000);

    console.log('finished!');
}

function stopWorkout() {
    clearInterval(intervalID);
    handleDOM();
}

export function handleDOM(){
    const setDOM = document.querySelector('#setDOM');
    const timeDOM = document.querySelector('#timeDOM');
    const restDOM = document.querySelector('#restDOM');

    let timeText = timeDOM.textContent;
    let timeParts = timeText.split(':');
    timeParts[0] = workingSet.hour.toString().padStart(2, '0') + ' Hour ';
    timeParts[1] = workingSet.mins.toString().padStart(2, '0') + ' Min ';
    timeParts[2] = workingSet.secs.toString().padStart(2, '0') + ' Sec ';
    
    

    let newTimeText = timeParts.join(':');

    timeDOM.textContent = newTimeText;

    setDOM.textContent ='Sets Left:' + ` ${repetitions}`;
    restDOM.textContent = workingSet.restVal.toString().padStart(2, '0') + 's Rest Left '
    updateLoadingBar((workingSet.hour * 3600) + (workingSet.mins * 60) + (workingSet.secs));
}

function updateLoadingBar(remainingTime) {
    const percentageRemaining = 100 - ((remainingTime / totalTime) * 100);
    
    const pi = Math.PI;
    const dashOffset = (2 * pi * 80) * ((100 - percentageRemaining)/100);
    progressCircle.setAttribute('stroke-dashoffset', dashOffset);
}


export function goBack() {
    stopWorkout();
    const allWorkouts = document.querySelector('#allWorkouts');
    allWorkouts.hidden = false;

    const currentWorkout = document.querySelector('#currentWorkout');
    currentWorkout.hidden = true;
}