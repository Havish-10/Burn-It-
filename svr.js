import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as work from './workouts.js';

// Defining Directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'client')));

async function getWorkouts(req, res) {
  const accountId = req.query.id;
  res.json(await work.listWorkouts(accountId));
}

async function getWorkout(req, res) {
  const result = await work.findWorkout(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that ID.');
  }
}

async function postWorkout(req, res) {
  console.log(req.body);
  const workouts = await work.addWorkout(req.body);
  res.json(workouts);
}

async function removeWorkout(req, res) {
  await work.removeWorkout(req.params.id);
  const accountId = req.query.id;
  const result = await work.listWorkouts(accountId);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that ID.');
  }
}

async function addUser(req, res) {
  await work.newUser(req.body);
  console.log(await work.listUsers());
  const result = await work.findUser(req.body.name);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that ID.');
  }
}

async function findUser(req, res) {
  const result = await work.findUser(req.params.username);
  if (result) {
    res.json(result);
    console.log('Username Found');
  } else {
    res.status(404).send('No match for that ID.');
  }
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/user/:username', asyncWrap(findUser));
app.post('/user', express.json(), asyncWrap(addUser));
app.get('/workout', asyncWrap(getWorkouts));
app.get('/workouts', asyncWrap(getWorkouts));
app.get('/workout/:id', asyncWrap(getWorkout));
app.get('/remove/:id', asyncWrap(removeWorkout));
app.post('/workout', express.json(), asyncWrap(postWorkout));

app.listen(8080);
