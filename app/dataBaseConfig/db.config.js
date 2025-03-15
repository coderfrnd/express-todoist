import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import path from "path";
import { insertUsers } from "./userCreation.js";
import { projectCreate } from "./projectCreation.js";
import { taskCreation } from "./taskCreation.js";
const dbPath = path.resolve("./app/dataBaseConfig/mydata.db");
let dbInstance = null;
async function connectDb() {
  if (dbInstance) {
    console.log("Reusing existing database connection.");
    return dbInstance;
  }
  dbInstance = await sqlite.open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  console.log("Connected to the Database");
  await dbInstance.exec("PRAGMA foreign_keys = ON;");
  // await dbInstance.exec("PRAGMA max_variable_number = 10000;");
  return dbInstance;
}
let taskTable = `
CREATE TABLE IF NOT EXISTS taskTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content VARCHAR(256) NOT NULL,
  description VARCHAR(256) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at  DATE DEFAULT (DATE('now')),
  project_id INTEGER NOT NULL,
  due_date VARCHAR(256) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projectTable(id) ON DELETE CASCADE 
)
`;
let projectTable = `
CREATE TABLE IF NOT EXISTS projectTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(256) NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  colour VARCHAR(256),
  user_id INTEGER ,
  FOREIGN KEY (user_id) REFERENCES userTable(id) ON DELETE CASCADE
)
`;
let userTable = `
CREATE TABLE IF NOT EXISTS userTable(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL
)
`;
// taskCreation
let commentTable = `
CREATE TABLE IF NOT EXISTS commentTable (
id INTEGER PRIMARY KEY AUTOINCREMENT,
comment TEXT ,
posted_at DATE DEFAULT (DATE('now')),
project_id INTEGER NOT NULL,
task_id INTEGER NOT NULL,
FOREIGN KEY (project_id) REFERENCES projectTable(id) ON DELETE CASCADE
FOREIGN KEY (task_id) REFERENCES taskTable(id) ON DELETE CASCADE
)
`;
async function createTable(db) {
  try {
    await db.exec(userTable);
    console.log("User table created");
    await db.exec(commentTable);
    await db.exec(projectTable);
    await db.exec(taskTable);
    await insertUsers(db, 1000);
    await projectCreate(db, 1000000, 1500);
    await taskCreation(db, 10000000, 1500);
  } catch (error) {
    console.error("Error in table creation:", error);
  }
}
async function myDataDb() {
  try {
    let db = await connectDb();
    await createTable(db);
    if (db) {
      console.log("Database connection verified.");
      return db;
    } else {
      console.log("Database connection could not be established.");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
// myDataDb();
export { myDataDb, connectDb };
