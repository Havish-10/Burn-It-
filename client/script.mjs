import { createTimer } from './timer.mjs';

const workoutList = document.querySelector('#currentWorkoutList');
let currentWorkout;

// Shows selected workout.
async function showWorkout(workout, where) {
  currentWorkout = workout;
  workoutList.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = `${workout.nameVal} ( ${workout.mins} Mins ${workout.secs} Secs, Reps: ${workout.rep}, : ${workout.restVal}s Rest, Sets: ${workout.setNo} ) `;
  li.dataset.id = workout.workoutID;

  where.append(li);
  console.log(where);
  await createTimer(currentWorkout);
}

// Loads workout.
export async function loadWorkout(id) {
  const response = await fetch(`workout/${id}`);
  let workout;
  if (response.ok) {
    workout = await response.json();
    console.log(workout);
    showWorkout(workout, workoutList);
  } else {
    console.log('failed to find workout', response);
  }
}

// function pageLoaded(){
//     console.log("Hi?")
//     loadWorkout();
// }

// pageLoaded();
