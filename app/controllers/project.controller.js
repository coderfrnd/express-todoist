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
  projectTable.get((err, data) => {
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

export { projectCreate, getAllProject, deleteById };
