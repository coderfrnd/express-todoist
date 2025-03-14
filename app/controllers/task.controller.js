import { taskTable } from "../models/task.model.js";

const createTask = (req, res) => {
  if (!req.body || !req.body.project_id) {
    res.status(404).json({ message: "Body is Empty PLZ DEFINE TASK" });
  }
  taskTable.create(req.body, (err, data) => {
    if (err) {
      console.log("SOME THING HAPPEN IN TASK CONTROLLER SECTION", err);
      return res.status(404).json(err);
    }
    res.status(201).json(data);
  });
};

const getAllTask = (req, res) => {
  taskTable.getAllTask((err, data) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    res.status(201).json(data);
  });
};

export { createTask, getAllTask };
