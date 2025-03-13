import { projectTable } from "../modals/task.modal";

const projectCreate = (req, res) => {
  if (!req.body) {
    res.send(404).json({ message: "put a data" });
  }
  const { name, is_favorite, colour } = req.body;
};
