import { myDataDb } from "../dataBaseConfig/db.config.js";
const taskTable = {
  create: async (task, result) => {
    let sqlQuery = `INSERT INTO taskTable (content,description,is_completed,project_id,due_date)VALUES(?,?,?,?,?)`;
    try {
      let db = await myDataDb();
      await db.run(sqlQuery, [
        task.content,
        task.description,
        task.is_completed,
        task.project_id,
        task.due_date,
      ]);
      let lastID = await db.get(`SELECT last_insert_rowid() AS id`);
      console.log("DATA ENTER SUCCESSFULLY", lastID.id);
      result(null, { id: lastID.id, ...task });
    } catch (error) {
      console.log("Some thing happen in task table", error);
      result(error, null);
    }
  },
  getAllTask: async (result) => {
    let sqlQuery = `SELECT * FROM taskTable`;
    try {
      let db = await myDataDb();
      let response = await db.all(sqlQuery, []);
      console.log(response);
      result(null, response);
    } catch (error) {
      console.log("Some thing error in get all data fromtask table", error);
      result(error, null);
    }
  },
};

export { taskTable };
