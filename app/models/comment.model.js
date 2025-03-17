import { connectDb } from "../dataBaseConfig/db.config.js";

const commentTable = {
  create: async (comment, project_id = null, task_id = null) => {
    let sqlQuery = `
      INSERT INTO commentTable (comment, project_id, task_id) 
      VALUES (?, ?, ?)
    `;
    try {
      let db = await connectDb();
      let response = await db.run(sqlQuery, [comment, project_id, task_id]);
      return { success: true, id: response.lastID };
    } catch (error) {
      return { error: error.message };
    }
  },

  getAll: async (numOfPage) => {
    let sqlQuery = `SELECT * FROM commentTable LIMIT 100 OFFSET ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [numOfPage * 100]);
      let totalRowCount = await db.get(
        `SELECT COUNT(*) as cnt FROM commentTable`
      );
      let totalRow = totalRowCount.cnt;
      let totalPage = Math.floor(totalRow / 100);
      return {
        "total-page": totalPage || 1,
        "current-page": numOfPage || 1,
        commentData: response,
      };
    } catch (error) {
      return error;
    }
  },

  getById: async (id) => {
    let sqlQuery = `SELECT * FROM commentTable WHERE id = ?`;
    try {
      let db = await connectDb();
      let response = await db.get(sqlQuery, [id]);
      return response || { msg: "Comment not found" };
    } catch (error) {
      return { error: error.message };
    }
  },
  getByProjectId: async (project_id) => {
    let sqlQuery = `SELECT * FROM commentTable WHERE project_id = ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [project_id]);
      return response.length > 0
        ? response
        : { msg: "No comments found for this project" };
    } catch (error) {
      return { error: error.message };
    }
  },
  getByTaskId: async (task_id) => {
    let sqlQuery = `SELECT * FROM commentTable WHERE task_id = ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [task_id]);
      return response.length > 0
        ? response
        : { msg: "No comments found for this task" };
    } catch (error) {
      return { error: error.message };
    }
  },

  deleteById: async (id) => {
    let sqlQuery = `DELETE FROM commentTable WHERE id = ?`;
    try {
      let db = await connectDb();
      let response = await db.run(sqlQuery, [id]);
      if (response.changes === 0) {
        return { success: false, msg: "Comment not found" };
      }
      return { success: true, msg: "Comment deleted successfully" };
    } catch (error) {
      return { error: error.message };
    }
  },
};

export { commentTable };
// http://localhost:3000/comment/task?taskid=3488914
