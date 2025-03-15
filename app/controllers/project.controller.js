import { projectTable } from "../models/project.model.js";

const projectCreate = (req, res) => {
  if (!req.body || !req.body.name || !req.body.colour) {
    return res
      .status(404)
      .json({ message: "Invalid data. Name and colour are required." });
  }
  projectTable.create(req.body, (err, data) => {
    if (err) {
      console.error(" Error inserting project:", err);
      return res
        .status(500)
        .json({ message: "Something went wrong while inserting project" });
    }
    console.log("Project created successfully:", data);
    res.status(201).json(data);
  });
};
const getAllProject = (req, res) => {
  let pageNum = 0;
  console.log(req.query);

  if (req.query.num) {
    pageNum = req.query.num;
    pageNum = Number(pageNum);
  }
  projectTable.get(pageNum, (err, data) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    res.status(201).json(data);
  });
};
const deleteById = (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({ message: "Give a proper id" });
  }
  projectTable.deleteId(req.params.id, (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(201).json(data);
  });
};
const projectUpdateById = (req, res) => {
  const projectId = req.params.id;
  const updates = req.body;

  if (!projectId) {
    return res.status(400).json({ message: "PLZ PROVIDE AN ID" });
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "NO FIELDS TO UPDATE" });
  }

  projectTable.updateById(projectId, updates, (err, data) => {
    if (err) {
      return res
        .status(400)
        .json({ message: err.message || "ERROR UPDATING PROJECT" });
    }
    res.status(200).json(data);
  });
};
const getById = (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({ messgae: "Put a Id" });
  }
  let projectId = req.params.id;
  projectTable.getById(projectId, (err, data) => {
    if (err) {
      return res.status(401).json({ MESSAGE: err.message });
    }
    res.status(201).json(data);
  });
};
const deleteAll = (req, res) => {
  projectTable.deleteAll((err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(201).json(data);
  });
};

export {
  projectCreate,
  getAllProject,
  deleteById,
  projectUpdateById,
  getById,
  deleteAll,
};
