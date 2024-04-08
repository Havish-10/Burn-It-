import express from 'express';
import * as work from './workouts.js'
const express = require('express');
const path = require('path'); 

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
    console.log(req.body);
    const workouts = await work.addWorkout(req.body);
    res.json(workouts);
}

async function putWorkout(req, res) {
    const filePath = path.join(__dirname, 'client', 'workout.html');
    res.sendFile(filePath);
    const workout = await work.findWorkout(req.body);
    res.json(workout);
}

function asyncWrap(f) {
    return (req, res, next) => {
      Promise.resolve(f(req, res, next))
        .catch((e) => next(e || new Error()));
    };
}


app.get('/workout', asyncWrap(getWorkouts));
app.get('/workouts', asyncWrap(getWorkouts));
app.get('/workout/:id', asyncWrap(getWorkout));
app.put('/workout/:id', express.json(), asyncWrap(putWorkout));
app.post('/workout', express.json(), asyncWrap(postWorkout));

app.listen(8080);

// import express from 'express';
// import * as work from './workouts.js'
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory
// app.use(express.static(path.join(__dirname, 'client')));

// async function getWorkouts(req, res) {
//     res.json(await work.listWorkouts());
// }

// async function getWorkout(req, res) {
//     const result = await work.findWorkout(req.params.id);
//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).send('No match for that ID.');
//     }
// }

// async function postWorkout(req, res) {
//     console.log(req.body);
//     const workouts = await work.addWorkout(req.body);
//     res.json(workouts);
// }

// async function putWorkout(req, res) {
//     const filePath = path.join(__dirname, 'client', 'workout.html');
//     res.sendFile(filePath);
//     const workout = await work.findWorkout(req.body);
//     res.json(workout);
// }

// function asyncWrap(f) {
//     return (req, res, next) => {
//       Promise.resolve(f(req, res, next))
//         .catch((e) => next(e || new Error()));
//     };
// }


// app.get('/workout', asyncWrap(getWorkouts));
// app.get('/workouts', asyncWrap(getWorkouts));
// app.get('/workout/:id', asyncWrap(getWorkout));
// app.put('/workout/:id', express.json(), asyncWrap(putWorkout));
// app.post('/workout', express.json(), asyncWrap(postWorkout));

// app.listen(8080);