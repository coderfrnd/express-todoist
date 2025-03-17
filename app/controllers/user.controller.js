import { userTable } from "../models/user.model.js";

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
  if (!req.query.email || !req.query.name) {
    res
      .status(404)
      .json({ msg: "Plz Enter your email and name both field required" });
  }
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let name = req.query.name;
    let email = req.query.email;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    let response = await userTable.createUser(name, email);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
export { getAllUser, getUserByIdNameEmail, deleteById, createUser };
