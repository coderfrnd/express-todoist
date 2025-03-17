const commentCreation = async (db, numOfComment, batchSize) => {
  try {
    await db.run("BEGIN TRANSACTION");
    let start = performance.now();
    for (let index = 0; index < numOfComment; index += batchSize) {
      let batchValues = [];
      let params = [];
      for (let j = 0; j < batchSize && index + j < numOfComment; j++) {
        batchValues.push("(?,?,?)");
        let idOfProjectOrTask = Math.floor(Math.random() * 10000000) + 1;
        params.push(`comment ${index + j}`);
        if (idOfProjectOrTask <= 1000000) {
          params.push(idOfProjectOrTask);
          params.push(null);
        } else {
          params.push(null);
          params.push(idOfProjectOrTask);
        }
      }
      let sqlQuery = `INSERT INTO commentTable(comment,project_id,task_id) VALUES ${batchValues.join(
        ","
      )} `;
      await db.run(sqlQuery, params);
    }
    await db.run("COMMIT");
    let end = performance.now();
    console.log(`INSERTED COMMENT ${n} DATA SUCCESSFULLY IN`, end - start);
  } catch (error) {
    await db.run("ROLLBACK");
    console.log("ERROR IN INSERTING COMMENT DATA", error);
  }
};
export { commentCreation };
