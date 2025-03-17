import { commentTable } from "../models/comment.model.js";

const getAllComments = async (req, res) => {
  let pageNum = 0;
  if (req.query.page) {
    pageNum = Number(req.query.page);
  }
  try {
    let response = await commentTable.getAll(pageNum);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ message: "Please provide a valid comment ID" });
  }
  try {
    let response = await commentTable.getById(req.query.id);
    if (!response) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByProjectId = async (req, res) => {
  if (!req.query.projectid) {
    return res
      .status(400)
      .json({ message: "Please provide a valid project ID" });
  }
  try {
    let response = await commentTable.getByProjectId(req.query.projectid);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByTaskId = async (req, res) => {
  if (!req.query.taskid) {
    return res.status(400).json({ message: "Please provide a valid task ID" });
  }
  try {
    let response = await commentTable.getByTaskId(req.query.taskid);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  let { comment, project_id, task_id } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment text is required" });
  }
  if (!project_id && !task_id) {
    return res
      .status(400)
      .json({ message: "Provide either project_id or task_id" });
  }

  try {
    let response = await commentTable.create(comment, project_id, task_id);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommentById = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "Please provide a valid comment ID" });
  }
  try {
    let response = await commentTable.deleteById(req.params.id);
    if (!response.success) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllComments,
  getCommentById,
  getCommentsByProjectId,
  getCommentsByTaskId,
  createComment,
  deleteCommentById,
};
