import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import path from "path";
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
  return dbInstance;
}
let taskTable = `
CREATE TABLE IF NOT EXISTS taskTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content VARCHAR(256) NOT NULL,
  description VARCHAR(256) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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
  colour VARCHAR(256)
)
`;
async function createTable(db) {
  try {
    await db.exec(projectTable);
    await db.exec(taskTable);
    console.log("Tables Created");
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
// checkDbStatus();
myDataDb();
export { myDataDb, connectDb };
