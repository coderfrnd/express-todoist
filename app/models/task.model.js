import { connectDb } from "../dataBaseConfig/db.config.js";

const taskTable = {
  create: async (task, result) => {
    let sqlQuery = `INSERT INTO taskTable (content,description,is_completed,project_id,due_date)VALUES(?,?,?,?,?)`;
    try {
      let db = await connectDb();
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
      let db = await connectDb();
      let response = await db.all(sqlQuery, []);
      console.log(response);
      result(null, response);
    } catch (error) {
      console.log("Some thing error in get all data from task table", error);
      result(error, null);
    }
  },
  deleteAllTaskById: async (id, result) => {
    let sqlQuery = `DELETE FROM taskTable WHERE id = ? `;
    try {
      let db = await connectDb();
      let { changes } = await db.run(sqlQuery, [id]);
      if (changes == 0) {
        return result({ msg: "Not Found any row with this Id" }, null);
      }
      result(null, { msg: `this row is delete ${changes}` });
    } catch (error) {
      return result(error, null);
    }
  },
  updateTaskById: async (id, newTask, result) => {
    let sqlQuery = `UPDATE taskTable SET content = ? , description = ? , is_completed = ? ,due_date = ? WHERE id = ?`;
    try {
      let db = await connectDb();
      let { changes } = await db.run(sqlQuery, [
        newTask.content,
        newTask.description,
        newTask.is_completed,
        newTask.due_date,
        id,
      ]);
      if (changes > 0) {
        let updateData = `SELECT * FROM taskTable WHERE id = ${id}`;
        let getUpdateTaskData = await db.get(updateData, []);
        return result(null, getUpdateTaskData);
      }
      result(null, { msg: "No Updation Happen in task Table" });
    } catch (error) {
      result(error, null);
    }
  },
  combineQuery: async (query, result) => {
    let sqlQuery = `SELECT * FROM taskTable WHERE 1 = 1`;
    let params = [];
    const { project_id, due_date, is_completed, created_at } = query;
    try {
      if (project_id) {
        sqlQuery += ` AND project_id = ?`;
        params.push(project_id);
      }
      if (due_date) {
        sqlQuery += ` AND due_date = ?`;
        params.push(due_date);
      }
      if (created_at) {
        sqlQuery += ` AND created_at = ?`;
        params.push(created_at);
      }
      if (is_completed) {
        sqlQuery += ` AND is_completed = ?`;
        params.push(is_completed);
      }
      let db = await connectDb();
      let response = await db.all(sqlQuery, params);
      result(null, response);
    } catch (error) {
      result(error, null);
    }
  },
};

export { taskTable };
