import DateGenerator from "random-date-generator";
DateGenerator.getRandomDate();

let startDate = new Date(2025, 2, 2);
let endDate = new Date(2026, 3, 3);
// console.log(due_date);
let start = performance.now();
const taskCreation = async (db, numOfTask, batchSize) => {
  try {
    await db.run("BEGIN TRANSACTION");
    for (let index = 0; index < numOfTask; index += batchSize) {
      let params = [];
      let batchValues = [];
      for (let j = 0; j < batchSize && index + j < numOfTask; j++) {
        batchValues.push("( ? , ? , ? , ?, ?)");
        let project_id = Math.floor(Math.random() * 1000000) + 1;
        let due_date = DateGenerator.getRandomDateInRange(startDate, endDate)
          .toISOString()
          .split("T")[0];
        params.push(
          `content-${index + j}`,
          `description-${index + j}`,
          (index + j) % 2 ? true : false,
          project_id,
          due_date
        );
      }
      let sqlQuery = `INSERT INTO taskTable (content,description,is_completed,project_id,due_date) VALUES ${batchValues.join(
        ","
      )}`;
      await db.run(sqlQuery, params);
    }
    let end = performance.now();
    console.log(`INSERTED TASK ${numOfTask} DATA SUCCESSFULLY IN`, end - start);
    await db.run("COMMIT");
  } catch (error) {
    await db.run("ROLLBACK");
    console.log("ERROR IN INSERTING TODOS DATA", error);
  }
};
export { taskCreation };
