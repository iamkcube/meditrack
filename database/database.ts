// database.ts
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseAsync('medicineDB.db');

export async function initializeDatabase() {
  const database = await db;
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      stock INTEGER NOT NULL
    );
  `);
  return database;
}

export async function insertMedicine(name: string, type: string, stock: number) {
  const database = await db;
  return await database.runAsync('INSERT INTO medicines (name, type, stock) VALUES (?, ?, ?)', name, type, stock);
}

export async function getMedicines() {
  const database = await db;
  return await database.getAllAsync('SELECT * FROM medicines');
}
