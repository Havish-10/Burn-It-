let workingSet = {};
let repetitions;
let workID;
let intervalID;
const timerSection = document.querySelector('#timer');

export function createTimer(currentWorkout) {
    workID = currentWorkout.workoutID;
    workingSet.hour = currentWorkout.hour;
    workingSet.mins = currentWorkout.mins;
    workingSet.secs = currentWorkout.secs;
    workingSet.restVal = currentWorkout.restVal;
    console.log(workingSet);

    if (!document.querySelector('#startBtn')){
        const btn = document.createElement('button');
        btn.id = "startBtn";
        btn.textContent = 'Start The Workout!'
        btn.addEventListener('click', () => timer('working'));
        timerSection.append(btn);
        repetitions = currentWorkout.setNo - 1;
    }

    if (!document.querySelector('#pauseBtn')){
        const btn = document.createElement('button');
        btn.id = "pauseBtn";
        btn.textContent = 'Pause The Workout!'
        btn.addEventListener('click', () => pauseWorkout());
        timerSection.append(btn);
    }

    if (!document.querySelector('#stopBtn')){
        const btn = document.createElement('button');
        btn.id = "stopBtn";
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
              createTimer(workout);
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

    console.log('finished!');
}

function stopWorkout() {
    clearInterval(intervalID);
    handleDOM();
}

function handleDOM(){
    const setDOM = document.querySelector('#setDOM');
    const timeDOM = document.querySelector('#timeDOM');
    const restDOM = document.querySelector('#restDOM');

    let timeText = timeDOM.textContent;
    let timeParts = timeText.split(':');
    timeParts[0] = workingSet.hour.toString().padStart(2, '0') + ' Hours ';
    timeParts[1] = workingSet.mins.toString().padStart(2, '0') + ' Mins ';
    timeParts[2] = workingSet.secs.toString().padStart(2, '0') + ' Secs ';
    
    

    let newTimeText = timeParts.join(':');

    timeDOM.textContent = newTimeText;

    setDOM.textContent ='Sets Left:' + ` ${repetitions}`;
    restDOM.textContent = workingSet.restVal.toString().padStart(2, '0') + 's Rest Left '
}

export function goBack() {
    const allWorkouts = document.querySelector('#allWorkouts');
    allWorkouts.hidden = false;

    const currentWorkout = document.querySelector('#currentWorkout');
    currentWorkout.hidden = true;
}