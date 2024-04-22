import { loadWorkout } from "./script.mjs";
import { goBack, handleDOM } from "./timer.mjs";

const saveBtn = document.querySelector('#save');
const workoutList = document.querySelector('#workoutList');

export let min = 0,
        sec = 0,
        hours = 0,
        sets = 0,
        reps = 0,
        rest = 0,
        name = ''


function fixTime() {
    if (sec >= 60) {
        sec = 0;
        min++;
    } if(min >= 60){
        min = 0;
        hours++;
    }
}

function grabValues() {
    fixTime();
    const nameVal = document.querySelector('#workoutName');
    const timeVal = document.querySelector('#setTime');
    const restVal = document.querySelector('#rest');
    const setsVal = document.querySelector('#sets');

    console.log(nameVal.value);
    if(nameVal.value !== '') {
        name = nameVal.value;
    } else if (nameVal.value === '') {
        name = 'Untitled Workout';
    }

    if(restVal.value > 60) {
        restVal.value = 60;
    }

    const [hour, minutes, seconds] = timeVal.value.split(":");
    
    hours = parseInt(hour, 10);
    min = parseInt(minutes, 10);
    sec = parseInt(seconds, 10);

    if(restVal.value){
        rest = restVal.value;
    } else if(!restVal.value){
        rest = 0;
    }

    if(setsVal.value){
        sets = setsVal.value;
    } else if(!setsVal.value){
        sets = 1;
    }

    console.log(`Min: ${min}, Sec ${sec}, Hour ${hours}, Rep ${reps}, Rest ${rest}, Name ${name}, Set ${sets}`);
    sendWorkout();
}

async function sendWorkout() {
    const payload = { mins: min, secs: sec, hour: hours, setNo: sets, rep: reps, restVal: rest, nameVal: name  };
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

function showWorkouts(workouts, where) {
    console.log('hi, hello hello');
    workoutList.innerHTML = '';

    for (const workout of workouts){
        const li = document.createElement('li');
        li.textContent = `${workout.nameVal} ( Hours; ${workout.hour}, Mins: ${workout.mins}, Secs: ${workout.secs}, Reps: ${workout.rep}, Rest: ${workout.restVal}, Sets: ${workout.setNo} ) `;
        li.dataset.id = workout.workoutID;
    
        const start = document.createElement('button');
        start.textContent = 'Start This Workout!';

        start.addEventListener('click', async () => {
            const response = await fetch(`/workout/${workout.workoutID}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                const current = await response.json();
                selectWorkout(current);
              } else {
                console.log('failed to load workouts', response);
              }
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Workout';

        deleteBtn.addEventListener('click', async () => {
            const response = await fetch(`/remove/${workout.workoutID}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                const updatedWorkouts = await response.json();
                console.log(updatedWorkouts);
                showWorkouts(updatedWorkouts, workoutList);
              } else {
                console.log('failed to load workouts', response);
              }
        })

        // const editBtn = document.createElement('button');
        // editBtn.textContent = 'Edit Workout';
        // start.href = `/workout/${workout.workoutID}`;
        li.append('(', start);
        li.append( deleteBtn, ')'); 
        // li.append(editBtn, ')');
    
        where.append(li);
    }
}

async function selectWorkout(workout) {
    const allWorkouts = document.querySelector('#allWorkouts');
    allWorkouts.hidden = true;

    const currentWorkout = document.querySelector('#currentWorkout');
    currentWorkout.hidden = false;
    await loadWorkout(workout.workoutID);
    handleDOM();
}

function eventListeners() {
    saveBtn.addEventListener('click', function() {
        grabValues();
    })

    const backBtn = document.querySelector('#backBtn');
    backBtn.addEventListener('click', goBack);
}

async function loadWorkouts() {
    const response = await fetch('workouts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.ok) {
        const updatedWorkouts = await response.json();
        console.log(updatedWorkouts);
        showWorkouts(updatedWorkouts, workoutList);
      } else {
        console.log('failed to load workouts', response);
      }
}

function pageLoaded(){
    console.log("Hi?")
    eventListeners();
    loadWorkouts();
}

pageLoaded();