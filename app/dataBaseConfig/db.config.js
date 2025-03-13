import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import path from "path";
const dbPath = path.resolve("./app/dataBaseConfig/mydata.db");
async function connectDb() {
  const db = await sqlite.open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  console.log("Connected to the Database");
  await db.exec("PRAGMA foreign_keys = ON;");
  return db;
}

let taskTable = `
CREATE TABLE IF NOT EXISTS taskTable (
id INTEGER PRIMARY KEY AUTOINCREMENT,
content VARCHAR(256) NOT NULL,
description VARCHAR(256) NOT NULL,
isCompleted BOOLEAN DEFAULT FALSE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
project_id INTEGER,
FOREIGN KEY (project_id) REFERENCES projectTable(id) ON DELETE CASCADE 
)
`;

let projectTable = `
CREATE TABLE IF NOT EXISTS projectTable (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(256) NOT NULL,
is_favorite BOOLEAN DEFAULT FALSE,
colour VARCHAR(256)
)
`;

async function createTable(db) {
  try {
    await db.exec(projectTable);
    await db.exec(taskTable);
    console.log("Tables Created");
  } catch (error) {
    console.log("Error occured in table creation", error);
  }
}

async function checkDbStatus() {
  try {
    let db = await connectDb();
    await createTable(db);
    if (db) {
      console.log("Database connection verified.");
      return db;
    } else {
      console.log("⚠️ Database connection could not be established.");
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
}

checkDbStatus();
export { checkDbStatus };
