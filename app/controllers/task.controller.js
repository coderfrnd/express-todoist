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

const deleteAllTaskById = (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ msg: "Plz put a id number" });
  }
  let taskId = req.params.id;
  taskTable.deleteAllTaskById(taskId, (err, data) => {
    if (err) {
      return res.status(401).json(err);
    }
    res.status(201).json(data);
  });
};

const updateTaskById = (req, res) => {
  if (!req.params.id || !req.body) {
    return res
      .status(404)
      .json({ "msg ": "All field are required and id also" });
  }
  let taskId = req.params.id;
  taskTable.updateTaskById(taskId, req.body, (err, data) => {
    if (err) {
      return res.status(401).json({ mssg: err.message });
    }
    res.status(201).json(data);
  });
};

const completedTask = (req, res) => {
  taskTable.completedTask((err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    return res.status(201).json(data);
  });
};

export {
  createTask,
  getAllTask,
  deleteAllTaskById,
  updateTaskById,
  completedTask,
};
