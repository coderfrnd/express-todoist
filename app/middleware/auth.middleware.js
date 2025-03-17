import jwt from "jsonwebtoken";
const SECRET_KEY = "Abhishek@123";
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Unauthorized: Invalid token" });
  }
};

export { authMiddleware };
