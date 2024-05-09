import { loadWorkout } from './script.mjs';
import { goBack, handleDOM } from './timer.mjs';

const saveBtn = document.querySelector('#save');
const workoutList = document.querySelector('#workoutList');

export let min = 0;
export let sec = 0;
// export let hours = 0;
export let sets = 0;
export let reps = 0;
export let rest = 0;
export let name = '';
export let username;
let accountId;

// Grabs the Username and attempts to pull user information.
async function getUser() {
  const loginSect = document.querySelector('#logIn');
  const userInput = document.querySelector('#username');
  const allWorkouts = document.querySelector('#allWorkouts');
  username = userInput.value;
  loginSect.hidden = true;
  allWorkouts.hidden = false;

  const response = await fetch(`/user/${username}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('Yippie!');
    const userData = await response.json();
    accountId = userData;
    loadWorkouts();
    const saveBtn = document.querySelector('#save');
    saveBtn.disabled = false;
  } else {
    console.log('failed to load user with this id', response);
    createUser();
  }
}

// In the event that a user does not exist, an account is generated.
async function createUser() {
  const payload = { name: username };
  console.log('Payload', payload);

  const response = await fetch('user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('Created User!');
    workoutList.innerHTML = '';
    const userData = await response.json();
    accountId = userData;
    const saveBtn = document.querySelector('#save');
    saveBtn.disabled = false;
  } else {
    console.log('failed to create user :(', response);
  }
}

// Signing Out.
function signOut() {
  const loginSect = document.querySelector('#logIn');
  const allWorkouts = document.querySelector('#allWorkouts');
  loginSect.hidden = false;
  allWorkouts.hidden = true;
}

// Sorts out time in the event that seconds > 60/Minutes > 60. Unlikely for this to happen.
function fixTime() {
  if (sec >= 60) {
    sec = 0;
    min++;
  } if (min >= 60) {
    min = 0;
  }
}

// Deals with grabbing the values and storing them appropriately for manipulation.
function grabValues() {
  fixTime();
  const nameVal = document.querySelector('#workoutName');
  const timeValMin = document.querySelector('#setTimeM');
  const timeValSec = document.querySelector('#setTimeS');
  const repsVal = document.querySelector('#reps');
  const restVal = document.querySelector('#rest');
  const setsVal = document.querySelector('#sets');

  console.log(nameVal.value);
  if (nameVal.value !== '' && nameVal.value.length <= 255) {
    name = nameVal.value;
  } else if (nameVal.value === '') {
    name = 'Untitled Workout';
  } else {
    name = nameVal.value.slice(0, 20);
  }

  if (restVal.value > 60) {
    restVal.value = 60;
  }

  if (timeValMin.value > 15) {
    timeValMin.value = 15;
  }
  if (!timeValMin.value) {
    timeValMin.value = 2;
  }
  if (timeValSec.value > 60) {
    timeValSec.value = 60;
  }
  if (!timeValSec.value) {
    timeValSec.value = 30;
  }

  if (!repsVal.value) {
    reps = 0;
  } else {
    reps = repsVal.value;
  }
  // const [hour, minutes, seconds] = timeVal.value.split(':');

  // hours = parseInt(hour, 10);
  min = parseInt(timeValMin.value, 10);
  sec = parseInt(timeValSec.value, 10);

  if (restVal.value) {
    rest = restVal.value;
  } else if (!restVal.value) {
    rest = 0;
  }

  if (setsVal.value) {
    sets = setsVal.value;
  } else if (!setsVal.value) {
    sets = 1;
  }

  console.log(`Min: ${min}, Sec ${sec}, Rep ${reps}, Rest ${rest}, Name ${name}, Set ${sets}`);
  sendWorkout();
}

// Saves workout.
async function sendWorkout() {
  const payload = { accountID: accountId, mins: min, secs: sec, setNo: sets, rep: reps, restVal: rest, nameVal: name };
  console.log('Payload', payload);

  const response = await fetch('workout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedWorkouts = await response.json();
    console.log(updatedWorkouts);
    showWorkouts(updatedWorkouts, workoutList);
  } else {
    console.log('failed to load workouts', response);
  }
}

// Updates list of workouts.
function showWorkouts(workouts, where) {
  console.log('hi, hello hello');
  workoutList.innerHTML = '';

  for (const workout of workouts) {
    const li = document.createElement('li');
    const sect = document.createElement('section');
    sect.classList.add('controls');
    li.classList.add('workout-item');
    // li.textContent = `${workout.nameVal} [ Hours; ${workout.hour}, Mins: ${workout.mins}, Secs: ${workout.secs}, Reps: ${workout.rep}, Rest: ${workout.restVal}, Sets: ${workout.setNo} ] `;
    li.textContent = `${workout.nameVal} [ ${workout.mins} Mins ${workout.secs} Secs, Reps: ${workout.rep}, ${workout.restVal}s Rest, Sets: ${workout.setNo} ] `;
    li.dataset.id = workout.workoutID;

    const start = document.createElement('button');
    start.classList.add('workout-button');
    start.id = 'controls';
    start.textContent = 'Start This Workout!';

    start.addEventListener('click', async () => {
      const response = await fetch(`/workout/${workout.workoutID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const current = await response.json();
        selectWorkout(current);
      } else {
        console.log('failed to load workouts', response);
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.classList.add('workout-button');
    deleteBtn.id = 'controls';
    deleteBtn.textContent = 'Delete Workout';

    deleteBtn.addEventListener('click', async () => {
      const response = await fetch(`/remove/${workout.workoutID}?id=${accountId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedWorkouts = await response.json();
        console.log(updatedWorkouts);
        showWorkouts(updatedWorkouts, workoutList);
      } else {
        console.log('failed to load workouts', response);
      }
    });

    // const editBtn = document.createElement('button');
    // editBtn.textContent = 'Edit Workout';
    // start.href = `/workout/${workout.workoutID}`;
    sect.append(start, deleteBtn);
    li.append(sect);
    // li.append(start);
    // li.append( deleteBtn);
    // li.append(editBtn, ')');

    where.append(li);
  }
}

// Start button for workout.
async function selectWorkout(workout) {
  const allWorkouts = document.querySelector('#allWorkouts');
  allWorkouts.hidden = true;

  const currentWorkout = document.querySelector('#currentWorkout');
  currentWorkout.hidden = false;
  await loadWorkout(workout.workoutID);
  handleDOM();
}

function eventListeners() {
  saveBtn.addEventListener('click', function () {
    grabValues();
  });

  const signIn = document.querySelector('#signIn');
  signIn.addEventListener('click', getUser);

  const backBtn = document.querySelector('#backBtn');
  backBtn.addEventListener('click', goBack);

  const logout = document.querySelector('#signOut');
  logout.addEventListener('click', signOut);
}

async function loadWorkouts() {
  const response = await fetch(`workouts?id=${accountId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const updatedWorkouts = await response.json();
    console.log(updatedWorkouts);
    showWorkouts(updatedWorkouts, workoutList);
  } else {
    console.log('failed to load workouts', response);
  }
}

function pageLoaded() {
  console.log('Hi?');
  eventListeners();
  loadWorkouts();
}

pageLoaded();
