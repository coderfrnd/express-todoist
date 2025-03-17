import { connectDb } from "../dataBaseConfig/db.config.js";

const userTable = {
  getAll: async (numOfPage) => {
    let sqlQuery = `SELECT * FROM userTable LIMIT 100 OFFSET ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [numOfPage * 100]);
      let totalRowCount = await db.get(`SELECT COUNT(*) as cnt FROM userTable`);
      let totalRow = totalRowCount.cnt;
      let totalPage = totalRow / 100;
      if (totalPage == 0) totalPage++;
      if (numOfPage == 0) numOfPage++;
      let totalUserData = {
        "total-page": totalPage,
        "current-page": numOfPage,
        userData: response,
      };
      return totalUserData;
    } catch (error) {
      return error;
    }
  },
  getByEmailNameId: async (query) => {
    try {
      let db = await connectDb();
      let { name, id, email } = query;
      let sqlQuery = `SELECT * from userTable WHERE 2 = 2`;
      let parms = [];
      if (name) {
        sqlQuery += ` AND name = ?`;
        parms.push(name);
      }
      if (id) {
        sqlQuery += ` AND id = ?`;
        parms.push(id);
      }
      if (email) {
        sqlQuery += ` AND email = ?`;
        parms.push(email);
      }
      let response = await db.get(sqlQuery, parms);
      if (response == null) {
        return { msg: "User not avilable" };
      }

      return response;
    } catch (error) {
      return error;
    }
  },
  deleteById: async (id) => {
    let sqlQuery = `DELETE FROM userTable WHERE id = ?`;
    try {
      let db = await connectDb();
      let response = await db.run(sqlQuery, [id]);
      if (response.changes === 0) {
        return { success: false, msg: "User not found" };
      }
      return { success: true, msg: "User deleted successfully" };
    } catch (error) {
      return { error: error.message };
    }
  },
  createUser: async (name, email) => {
    try {
      let db = await connectDb();
      let sqlQuery = `INSERT INTO userTable (name,email) VALUES(?,?)`;
      let response = await db.run(sqlQuery, [name, email]);
      if (response.changes == 0) {
        return { msg: "Input is not permitted" };
      }
      return { msg: "Your Input done", id: response.lastID };
    } catch (error) {
      return error;
    }
  },
};

export { userTable };
