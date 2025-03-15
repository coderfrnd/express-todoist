const projectCreate = async (db, n, batchSize) => {
  try {
    await db.run("BEGIN TRANSACTION");
    let start = performance.now();
    for (let index = 0; index < n; index += batchSize) {
      let batchValues = [];
      let params = [];
      for (let j = 0; j < batchSize && index + j < n; j++) {
        batchValues.push("(?,?,?,?)");
        let project_id = Math.floor(Math.random() * 1000) + 1;
        params.push(
          `project ${index + j}`,
          (index + j) % 2 ? true : false,
          `colour ${j}`,
          project_id
        );
      }
      let sqlQuery = `INSERT INTO projectTable(name,is_favorite,colour,user_id) VALUES ${batchValues.join(
        ","
      )} `;
      await db.run(sqlQuery, params);
    }
    await db.run("COMMIT");
    let end = performance.now();
    console.log(`INSERTED PROJECT ${n} DATA SUCCESSFULLY IN`, end - start);
  } catch (error) {
    await db.run("ROLLBACK");
    console.log("ERROR IN INSERTING PROJECT DATA", error);
  }
};
export { projectCreate };
