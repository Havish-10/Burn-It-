const el = {};
const currentVal = {};


function grabVals() {
  const values = document.querySelectorAll('#setsBox, #weightBox, #repsBox, #mainTimer');
  for (const val of values){
    if(val.value !== undefined){
      currentVal[val.id] = val.value;
    } else {
      currentVal[val.id] = val.textContent;
    }
  }
}

export function addWorkout() {

  grabVals();

  const newUl = document.createElement('ul');
  newUl.classList.add('workList');

  const newLi = document.createElement('li');
  newLi.classList.add('workList');

  const removeSection = document.createElement('section');
  removeSection.classList.add('addSetsSection')

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '-';
  removeSection.appendChild(removeBtn);

  const setSection = document.createElement('section');
  setSection.classList.add('setsSection');

  const setInput = document.createElement('input');
  setInput.placeholder = 'Sets';
  setInput.readOnly = true;
  setSection.appendChild(setInput);

  const weightSection = document.createElement('section');
  weightSection.classList.add('weightSection');

  const weightInput = document.createElement('input');
  weightInput.placeholder = 'KGs';
  weightInput.readOnly = true;
  weightSection.appendChild(weightInput);

  const repsSection = document.createElement('section');
  repsSection.classList.add('repsSection')

  const repsInput = document.createElement('input');
  repsInput.placeholder = 'Reps';
  repsInput.readOnly = true;
  repsSection.appendChild(repsInput);

  const timeSection = document.createElement('section');
  timeSection.classList.add('finTimeSection');

  const timeText = document.createElement('p');
  timeSection.appendChild(timeText);

  const finishSection = document.createElement('section');
  finishSection.classList.add('finishWorkoutSection')

  const finishText = document.createElement('button');
  finishText.textContent = 'Finish Workout';
  finishSection.appendChild(finishText);

  newLi.appendChild(removeSection);
  newLi.appendChild(setSection);
  newLi.appendChild(weightSection);
  newLi.appendChild(repsSection);
  newLi.appendChild(timeSection);
  newLi.appendChild(finishSection);
  newUl.appendChild(newLi);

  sendWorkout(newUl);
  document.body.append(newUl);
  assignVals(newLi)
  console.log(newUl);
}

function assignVals(item) {
  console.log(currentVal);
  for (const i of item.childNodes){
    if(i.className === 'setsSection') {
      i.firstElementChild.value = currentVal['setsBox'];
    }
    if(i.className === 'weightSection') {
      i.firstElementChild.value = currentVal['weightBox'];
    }
    if(i.className === 'repsSection') {
      i.firstElementChild.value = currentVal['repsBox'];
    }
    if(i.className === 'finTimeSection') {
      i.firstElementChild.textContent = currentVal['mainTimer'];
    }
  }
  console.log(item);
}

async function sendWorkout(item) {
  const payload = { };

  for (const i of item.childNodes){
    console.log(i);
  }

  console.log('Payload', payload);

  // const response = await fetch('/workouts', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });

  // if (response.ok) {
  //   const updatedMessages = await response.json();
  // } else {
  //   console.log('failed to send message', response);
  // }
}

function eventListeners(){
  const addBtn = document.querySelector('#addSet');
  addBtn.addEventListener('click', addWorkout);
}

function prepareHandles(){
  el.workoutPage = document.querySelector('#workoutPage');
}

function pageLoaded() {
  eventListeners();
  prepareHandles();
}

pageLoaded();