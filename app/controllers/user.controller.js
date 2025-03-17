import { userTable } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "Abhishek@123";

const getAllUser = async (req, res) => {
  let pageNum = 0;
  if (req.query.page) {
    pageNum = req.query.page;
    pageNum = Number(pageNum);
  }
  try {
    let response = await userTable.getAll(pageNum);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getUserByIdNameEmail = async (req, res) => {
  if (!req.query.id && !req.query.name && !req.query.email) {
    return res
      .status(400)
      .json({ message: "SORRY PLZ PUT A VALID ID, NAME, OR EMAIL" });
  }
  try {
    let userId = req.user;
    console.log(userId);
    let response = await userTable.getByEmailNameId(req.query);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ msg: "Please provide an ID" });
    }
    let userId = req.params.id;
    // console.log(typeof userId);
    userId = Number(userId);

    const deletedUser = await userTable.deleteById(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ msg: "Both name and email are required" });
  }
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    let existingUser = await userTable.getByEmailNameId({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let response = await userTable.createUser(name, email, hashedPassword);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Both name and email are required" });
  }
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    let user = await userTable.getByEmailNameId({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email is invalid" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(404).json(error);
  }
};
export { getAllUser, getUserByIdNameEmail, deleteById, createUser, login };
