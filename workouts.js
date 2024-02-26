const el = {}

import { open } from 'sqlite';  
import sqlite3 from 'sqlite3';

async function init() {
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database,
      verbose: true
    });
    await db.migrate({ migrationsPath: './migrations-sqlite' });
    return db;
}

const connect = init();

async function initDataBase() {
  const db = await connect;
  console.log('Hello!')
  await db.run('DROP TABLE IF EXISTS Accounts;');
  await db.run('DROP TABLE IF EXISTS Workouts;');
  await db.run('CREATE TABLE Accounts (accountId char(25), accountName char(25))');
  await db.run('CREATE TABLE Workouts (workoutID INT, sets INT, weight INT, reps INT)');
}

await initDataBase();

export async function listWorkouts() {
  const db = await connect;
  return db.all('SELECT * FROM Workouts');
}

export async function addMessage(workout) {
  const db = await dbConn;

  await db.run('INSERT INTO Workouts VALUES (?, ?, ?, ?)', [msg]);

  return listMessages();
}

function prepareHandles() {
  el.workoutList = document.querySelector('#workoutList');
}


function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadMessages();
}