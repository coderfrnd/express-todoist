import express from "express";
import {
  createUser,
  deleteById,
  getAllUser,
  getUserByIdNameEmail,
  login,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.get("/", authMiddleware, getAllUser);
userRouter.get("/any", authMiddleware, getUserByIdNameEmail);
userRouter.post("/login", login);
userRouter.post("/register", createUser);
userRouter.delete("/delete/:id", authMiddleware, deleteById);
export { userRouter };
