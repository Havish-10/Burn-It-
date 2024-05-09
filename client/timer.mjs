const workingSet = {};
let repetitions;
let workID;
let intervalID;
let totalTime;
const timerSection = document.querySelector('#timer');
const progressCircle = document.querySelector('#progress-circle');
const alarm = new Audio('/audio/alarm.mp3');
const workingSound = new Audio('/audio/working_music.mp3');
workingSound.loop = true;

// Function creates the timer and sets it up for every instance the "Start" Button is clicked.
export function createTimer(currentWorkout, type) {
  workID = currentWorkout.workoutID;
  workingSet.mins = currentWorkout.mins;
  workingSet.secs = currentWorkout.secs;
  workingSet.restVal = currentWorkout.restVal;
  totalTime = (currentWorkout.mins * 60) + currentWorkout.secs;
  console.log(workingSet);

  if (type !== 'ignore') {
    repetitions = currentWorkout.setNo - 1;
  }

  const controls = document.querySelectorAll('#startBtn, #pauseBtn, #stopBtn');
  for (const btn of controls) {
    btn.disabled = false;
  }

  const section = document.createElement('section');
  section.classList.add('timerControls');

  if (!document.querySelector('#startBtn')) {
    const btn = document.createElement('button');
    btn.id = 'startBtn';
    btn.classList.add('start');
    btn.textContent = 'Start The Workout!';
    btn.addEventListener('click', () => timer('working'));
    btn.addEventListener('click', () => workingSound.play());
    // workingSound.addEventListener('ended', function () {
    //   workingSound.currentTime = 0;
    //   workingSound.play();
    // });
    section.append(btn);
    timerSection.append(section);
  }

  if (!document.querySelector('#pauseBtn')) {
    const btn = document.createElement('button');
    btn.id = 'pauseBtn';
    btn.classList.add('pause');
    btn.textContent = 'Pause The Workout!';
    btn.addEventListener('click', () => pauseWorkout());
    section.append(btn);
    timerSection.append(section);
  }

  if (!document.querySelector('#stopBtn')) {
    const btn = document.createElement('button');
    btn.id = 'stopBtn';
    btn.classList.add('stop');
    btn.textContent = 'Stop The Workout!';
    btn.addEventListener('click', () => stopWorkout());
    section.append(btn);
    timerSection.append(section);
  }
}

// Function deals with handling time and its nuances.
function fixTime() {
  workingSet.secs--;
  if (workingSet.secs <= 0 && workingSet.mins >= 1) {
    workingSet.secs = 60;
    workingSet.mins--;
  } if (workingSet.mins <= 0) {
    workingSet.mins = 60;
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

// Deals with sorting between Rest Period and Working Sets.
function timer(type) {
  handleDOM();
  if (type === 'working') {
    intervalID = setTimeout(fixTime, 1000);
    const start = document.querySelector('#startBtn');
    start.disabled = true;
    const pause = document.querySelector('#pauseBtn');
    pause.disabled = false;
  }
  if (type === 'rest') {
    intervalID = setTimeout(rest, 1000);
  }
}

// Rest Function Deals with updating rest timer.
async function rest() {
  if (repetitions <= 0) {
    finishWorkout();
  } else if (repetitions >= 1) {
    if (workingSet.restVal <= 0) {
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
    } else if (workingSet.restVal >= 1) {
      workingSet.restVal--;
      timer('rest');
    }
  }
  console.log(workingSet);
}

// Pauses workout.
function pauseWorkout() {
  clearInterval(intervalID);
  setTimeout(function () {
    workingSound.pause();
  }, 1);
  const start = document.querySelector('#startBtn');
  start.disabled = false;
  const pause = document.querySelector('#pauseBtn');
  pause.disabled = true;
}

// Disables all buttons when workout is finished except the back button. Ends workout.
function finishWorkout() {
  stopWorkout();
  const btns = document.querySelectorAll('#startBtn, #pauseBtn, #stopBtn');
  for (const btn of btns) {
    btn.disabled = true;
  }
  alarm.currentTime = 1;
  alarm.play();

  setTimeout(function () {
    alarm.pause();
    alarm.currentTime = 0;
  }, 12000);

  console.log('finished!');
}

function stopWorkout() {
  clearInterval(intervalID);
  setTimeout(function () {
    workingSound.pause();
    workingSound.currentTime = 0;
  }, 1);
  const controls = document.querySelectorAll('#startBtn, #pauseBtn, #stopBtn');
  for (const btn of controls) {
    btn.disabled = true;
  }
  handleDOM();
}

// Handles DOM of the page when timer is changed/updated.
export function handleDOM() {
  const setDOM = document.querySelector('#setDOM');
  const timeDOM = document.querySelector('#timeDOM');
  const restDOM = document.querySelector('#restDOM');

  const timeText = timeDOM.textContent;
  const timeParts = timeText.split(':');
  // This was generated by AI \/\/\/\/\/\/\/\/
  // timeParts[0] = workingSet.hour.toString().padStart(2, '0') + ' Hour ';
  timeParts[1] = workingSet.mins.toString().padStart(2, '0') + ' Min ';
  timeParts[2] = workingSet.secs.toString().padStart(2, '0') + ' Sec ';


  const newTimeText = timeParts.join(':');

  timeDOM.textContent = newTimeText;

  setDOM.textContent = 'Sets Left:' + ` ${repetitions}`;
  restDOM.textContent = workingSet.restVal.toString().padStart(2, '0') + 's Rest Left ';
  updateLoadingBar((workingSet.mins * 60) + (workingSet.secs));
}

// Deals with the circular loading bar as the timer.
function updateLoadingBar(remainingTime) {
  const percentageRemaining = 100 - ((remainingTime / totalTime) * 100);

  const pi = Math.PI;
  const dashOffset = (2 * pi * 100) * ((100 - percentageRemaining) / 100);
  progressCircle.setAttribute('stroke-dashoffset', dashOffset);
}

// Takes you back to the main page.
export function goBack() {
  stopWorkout();
  alarm.pause();
  alarm.currentTime = 0;
  const allWorkouts = document.querySelector('#allWorkouts');
  allWorkouts.hidden = false;

  const currentWorkout = document.querySelector('#currentWorkout');
  currentWorkout.hidden = true;
}
