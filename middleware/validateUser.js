import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants.js";

export const validateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing or improperly formatted" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    if (verified) {
      req.user = verified;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  res.status(401).json({ message: "You are not authorized" });
};
