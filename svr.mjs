import express from 'express';
import * as work from './workouts.js'

const app = express();
app.use(express.static('client'));
app.listen(8080);