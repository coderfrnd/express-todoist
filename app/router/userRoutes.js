import express from "express";
import {
  getAllUser,
  getUserByIdNameEmail,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/any", getUserByIdNameEmail);
export { userRouter };
