import bcrypt from "bcryptjs";
const insertUsers = async (db, n, batchSize = 500) => {
  try {
    await db.run("BEGIN TRANSACTION");
    for (let i = 0; i < n; i += batchSize) {
      let batchValues = [];
      let params = [];
      for (let j = 0; j < batchSize && i + j < n; j++) {
        let name = `User${i + j}`;
        let email = `user${i + j}@example.com`;
        let plainPassword = `password(${i + j})`;
        let hashedPassword = await bcrypt.hash(plainPassword, 10);
        batchValues.push("(?, ?, ?)");
        params.push(name, email, hashedPassword);
      }
      let sqlQuery = `INSERT INTO usersTable (name, email,password) VALUES ${batchValues.join(
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
