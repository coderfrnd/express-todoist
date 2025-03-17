import { connectDb } from "../dataBaseConfig/db.config.js";
const userTable = {
  getAll: async (numOfPage) => {
    let sqlQuery = `SELECT * FROM usersTable LIMIT 100 OFFSET ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [numOfPage * 100]);
      // console.log("haa");
      let totalRowCount = await db.get(
        `SELECT COUNT(*) as cnt FROM usersTable`
      );
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
      // console.log(email);
      let sqlQuery = `SELECT * from usersTable WHERE  1 = 1`;
      let params = [];
      if (name) {
        sqlQuery += ` AND name = ?`;
        params.push(name);
      }
      if (id) {
        sqlQuery += ` AND id = ?`;
        params.push(id);
      }
      if (email) {
        sqlQuery += ` AND email = ?`;
        params.push(email);
      }
      let response = await db.get(sqlQuery, params);
      if (response == null) {
        return null;
      }
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteById: async (id) => {
    let sqlQuery = `DELETE FROM usersTable WHERE id = ?`;
    try {
      // console.log("yess 1");
      let db = await connectDb();
      let response = await db.run(sqlQuery, [id]);
      // console.log("yess 2");
      if (response.changes === 0) {
        return { success: false, msg: "User not found" };
      }
      // console.log("yess");

      return { success: true, msg: "User deleted successfully" };
    } catch (error) {
      return { error: error.message };
    }
  },
  createUser: async (name, email, hashedPassword) => {
    try {
      let db = await connectDb();
      let sqlQuery = `INSERT INTO usersTable (name,email,password) VALUES(?,?,?)`;
      let response = await db.run(sqlQuery, [name, email, hashedPassword]);
      if (response.changes == 0) {
        return { msg: "Input is not permitted" };
      }
      // console.log(response);
      return { msg: "Your Input done", id: response.lastID };
    } catch (error) {
      return error;
    }
  },
};

export { userTable };
