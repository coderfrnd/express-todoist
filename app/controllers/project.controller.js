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
  if (!req.params.id && !req.body) {
    return res.status(404).json({ message: "PLZ PROVIDE A ID" });
  }
  let projectId = req.params.id;
  projectTable.updateById(projectId, req.body, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "ALL FIELD REQUIRED" });
    }
    res.status(201).json(data);
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
