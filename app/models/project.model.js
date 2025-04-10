import { connectDb } from "../dataBaseConfig/db.config.js";
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
  get: async (n, result) => {
    let sqlQuery = `SELECT * FROM projectTable LIMIT 1000 OFFSET ?`;
    try {
      let db = await connectDb();
      let response = await db.all(sqlQuery, [n * 1000]);
      let pageCount = await db.get(`SELECT Count(*) as num from projectTable`);
      let totalPage = pageCount.num;
      totalPage = totalPage / 1000;
      let aboutPage = {
        "total-page": totalPage,
        currentPage: n,
        projects: response,
      };
      result(null, aboutPage);
    } catch (error) {
      console.log("Error in selecting all project", error);
      result(error, null);
    }
  },
  deleteId: async (id, result) => {
    let sqlQuery = `DELETE FROM projectTable WHERE id = ?`;
    try {
      let db = await connectDb();
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
  updateById: async (id, newProject, result) => {
    try {
      let db = await connectDb();
      let fields = [];
      let values = [];
      if (newProject.name !== undefined) {
        fields.push("name = ?");
        values.push(newProject.name);
      }
      if (newProject.is_favorite !== undefined) {
        fields.push("is_favorite = ?");
        values.push(newProject.is_favorite);
      }
      if (newProject.colour !== undefined) {
        fields.push("colour = ?");
        values.push(newProject.colour);
      }
      if (fields.length === 0) {
        return result({ message: "No valid fields to update" }, null);
      }
      values.push(id);
      let sqlQuery = `UPDATE projectTable SET ${fields.join(
        ", "
      )} WHERE id = ?`;
      let response = await db.run(sqlQuery, values);
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
      let db = await connectDb();
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
      let db = await connectDb();
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
