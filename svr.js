import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as work from './workouts.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'client')));

async function getWorkouts(req, res) {
    res.json(await work.listWorkouts());
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
    const workouts = await work.addWorkout(req.body);
    res.json(workouts);
}

async function removeWorkout(req, res) {
  const workouts = await work.removeWorkout(req.params.id);
  const result = await work.listWorkouts();
      if (result) {
      res.json(result);
    } else {
      res.status(404).send('No match for that ID.');
    }
}

// async function putWorkout(req, res) {
//   console.log('putWorkout');
//   try {
//       const filePath = path.join(__dirname, 'client', 'workout.html');
//       console.log(filePath);
//       res.sendFile(filePath);
//       const workout = await work.findWorkout(req.body);
//       res.json(workout);
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to find workout.' });
//   }
// }


function asyncWrap(f) {
    return (req, res, next) => {
      Promise.resolve(f(req, res, next))
        .catch((e) => next(e || new Error()));
    };
}


app.get('/workout', asyncWrap(getWorkouts));
app.get('/workouts', asyncWrap(getWorkouts));
app.get('/workout/:id', asyncWrap(getWorkout));
app.get('/remove/:id', asyncWrap(removeWorkout))
// app.put('/workout/:id', express.json(), asyncWrap(putWorkout));
app.post('/workout', express.json(), asyncWrap(postWorkout));

app.listen(8080);