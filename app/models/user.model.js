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
  getById: async (query) => {
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
        sqlQuery += `AND email = ?`;
        parms.push(email);
      }
      let response = await db.get(sqlQuery, parms);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export { userTable };
