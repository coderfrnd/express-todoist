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
    let response = await userTable.getById(req.query);
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
export { getAllUser, getUserByIdNameEmail };
