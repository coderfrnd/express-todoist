import { checkDbStatus } from "../dataBaseConfig/db.config";

let myData = checkDbStatus();
const projectTable = function (project) {
  (this.name = project.description),
    (this.is_favorite = project.is_favorite),
    (this.colour = project.colour);
};
projectTable.create = (project, result) => {
  let sqlQuery = `INSERT INTO projectTable (name,is_favorite,colour) Values(?,?,?)`;
  myData.run(
    sqlQuery,
    [project.name, project, is_favorite, project.colour],
    function (err) {
      if (err) {
        return result(err, null);
      }
      result(null, { id: this.lastID, ...project });
    }
  );
};

export { projectTable };
