import { connectDb, myDataDb } from "../dataBaseConfig/db.config.js";
const projectTable = {
  create: async (project, result) => {
    let sqlQuery = `INSERT INTO projectTable (name,is_favorite,colour) VALUES(?,?,?)`;
    try {
      let db = await connectDb();
      await db.run(sqlQuery, [
        project.name,
        project.is_favorite,
        project.colour,
      ]);
      let lastID = await db.get(`SELECT last_insert_rowid() AS id`);
      console.log("DATA ENTER SUCCESSFULLY", lastID.id);
      result(null, { id: lastID.id, ...project });
    } catch (error) {
      console.log("ERROR IN INSERTING DATA", error);
      result(error, null);
    }
  },
  get: async (result) => {
    let sqlQuery = `SELECT * FROM projectTable`;
    try {
      let db = await myDataDb();
      let response = await db.all(sqlQuery, []);
      // console.log(response, "heelo");
      result(null, response);
    } catch (error) {
      console.log("Error in selecting all project", err);
      result(error, null);
    }
  },
  deleteId: async (id, result) => {
    let sqlQuery = `DELETE FROM projectTable WHERE id = ?`;
    try {
      let db = await myDataDb();
      let { changes } = await db.run(sqlQuery, [id]);
      if (changes > 0) {
        console.log("Deleted Successfully");
        return result(null, "Deleted Succesfully");
      }
      result(null, "NOt deleted something happen in deletation");
    } catch (error) {
      result(error, null);
    }
  },
  updateById: async (id, newproject, result) => {
    let sqlQuery = `UPDATE projectTable SET name = ? , is_favorite = ? , colour = ? WHERE id = ?`;
    try {
      let db = await myDataDb();
      let response = await db.run(sqlQuery, [
        newproject.name,
        newproject.is_favorite,
        newproject.colour,
        id,
      ]);

      if (response.changes === 0) {
        return result({ message: "No project found with this ID" }, null);
      }
      let updatedProject = await db.get(
        `SELECT * FROM projectTable WHERE id = ?`,
        [id]
      );
      result(null, updatedProject);
    } catch (error) {
      result(error, null);
    }
  },
  getById: async (id, result) => {
    let sqlQuery = `SELECT * FROM projectTable WHERE id = ?`;
    try {
      let db = await myDataDb();
      let response = await db.get(sqlQuery, [id]);
      if (!response) {
        return result({ message: "This ID not exist" }, null);
      }
      result(null, response);
    } catch (error) {
      result(error, null);
    }
  },
  deleteAll: async (result) => {
    let sqlQuery = `DELETE FROM projectTable`;
    try {
      let db = await myDataDb();
      let { changes } = await db.run(sqlQuery, []);
      if (changes == 0) {
        return result({ result: "Data not deleted" }, null);
      }
      result(null, changes);
    } catch (error) {
      result(error, null);
    }
  },
};

export { projectTable };
