import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
// Initializing the DB
async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  return db;
}

const connect = init();

async function initDataBase() {
  const db = await connect;
  console.log('Hello!');
  await db.run('DROP TABLE IF EXISTS Workouts;');
  await db.run('DROP TABLE IF EXISTS Users;');
  await db.run('CREATE TABLE Users (accountID CHAR(36) PRIMARY KEY, username TEXT)');
  await db.run('CREATE TABLE Workouts (workoutID CHAR(36) PRIMARY KEY, accountID CHAR(36), nameVal TEXT, restVal INT, setNo INT, rep INT, mins INT, secs INT)');
}

await initDataBase();
