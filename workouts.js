import { open } from 'sqlite';  
import sqlite3 from 'sqlite3';

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
    console.log('Hello!')
}
  
await initDataBase();