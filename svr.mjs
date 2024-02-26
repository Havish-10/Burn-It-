import express from 'express';
import * as work from './workouts.js'

const app = express();
app.use(express.static('client', { extensions: ['html'] }));

async function getWorkouts(req, res) {
    res.json(await work.listWorkouts());
}

async function postWorkout(req, res) {
    const workouts = await work.addWorkout(req.body.workout);
    res.json(workouts);
}

function asyncWrap(f) {
    return (req, res, next) => {
      Promise.resolve(f(req, res, next))
        .catch((e) => next(e || new Error()));
    };
}


app.get('/workouts', asyncWrap(getWorkouts));
// app.post('/messages', express.json(), asyncWrap(postMessage));

app.listen(8080);