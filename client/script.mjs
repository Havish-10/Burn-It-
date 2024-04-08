import { createTimer } from "./timer.mjs";

const workoutList = document.querySelector('#workoutList');
let currentWorkout;


function showWorkout(workout, where) {
    currentWorkout = workout;
    workoutList.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = `${workout.nameVal} ( Hours; ${workout.hour}, Mins: ${workout.mins}, Secs: ${workout.secs}, Reps: ${workout.rep}, Rest: ${workout.restVal}, Sets: ${workout.setNo} ) `;
    li.dataset.id = workout.workoutID;
    
    where.append(li);
    createTimer(currentWorkout);
}

function getWorkoutID() {
    return window.location.hash.substring(1);
}

async function loadWorkout() {
    const id = getWorkoutID();
    const response = await fetch(`workout/${id}`);
    let workout;
    if (response.ok) {
      workout = await response.json();
      showWorkout(workout, workoutList);
    } else {
      console.log('failed to send message', response);
    }
}

function pageLoaded(){
    console.log("Hi?")
    loadWorkout();
}

pageLoaded();