import express from "express";
import {
  createUser,
  deleteById,
  getAllUser,
  getUserByIdNameEmail,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/any", getUserByIdNameEmail);
userRouter.post("/create", createUser);
userRouter.delete("/delete/:id", deleteById);
// userRouter
export { userRouter };
