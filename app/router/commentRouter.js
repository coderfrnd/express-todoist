import express from "express";
import {
  getAllComments,
  getCommentById,
  getCommentsByProjectId,
  getCommentsByTaskId,
  createComment,
  deleteCommentById,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/project", getCommentsByProjectId);
commentRouter.get("/task", getCommentsByTaskId);
commentRouter.post("/create", createComment);
commentRouter.delete("/delete/:id", deleteCommentById);

export { commentRouter };
