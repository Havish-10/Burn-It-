import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import uuid from 'uuid-random';

// Initializing the DB
async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const connect = init();

async function initDataBase() {
  const db = await connect;
  console.log('Hello!');
  await db.run('DROP TABLE IF EXISTS Workouts;');
  await db.run('CREATE TABLE Workouts (workoutID CHAR(36) PRIMARY KEY, nameVal TEXT, restVal INT, setNo INT, rep INT, hour INT, mins INT, secs INT)');
}

await initDataBase();

export async function addWorkout(payload) {
  const db = await connect;
  const workoutID = uuid();

  await db.run('INSERT INTO Workouts VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [workoutID, payload.nameVal, payload.restVal, payload.setNo, payload.rep, payload.hour, payload.mins, payload.secs]);

  return listWorkouts();
}

export async function listWorkouts() {
  const db = await connect;
  return db.all('SELECT * FROM Workouts');
}

export async function findWorkout(workoutID) {
  const db = await connect;
  return db.get('SELECT * FROM Workouts WHERE workoutID = ?', workoutID);
}

export async function removeWorkout(workoutID) {
  const db = await connect;
  return db.run('DELETE FROM Workouts WHERE workoutID = ?', workoutID);
}
