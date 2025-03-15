const insertUsers = async (db, n, batchSize = 500) => {
  try {
    await db.run("BEGIN TRANSACTION");
    for (let i = 0; i < n; i += batchSize) {
      let batchValues = [];
      let params = [];
      for (let j = 0; j < batchSize && i + j < n; j++) {
        batchValues.push("(?, ?)");
        params.push(`User ${i + j}`, `user${i + j}@example.com`);
      }
      let sqlQuery = `INSERT INTO userTable (name, email) VALUES ${batchValues.join(
        ", "
      )}`;
      await db.run(sqlQuery, params);
    }
    await db.run("COMMIT");
    console.log(`Inserted ${n} users successfully!`);
  } catch (error) {
    await db.run("ROLLBACK");
    console.error(error, "User creation failed");
  }
};
export { insertUsers };
