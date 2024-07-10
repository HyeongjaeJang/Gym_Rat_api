import {
  getOneUser as findOneService,
  getAllUsers as findAllService,
  createUser as createService,
  updateUser as updateService,
  getOneUserByEmail as findOneByEmailService,
} from "../services/userService.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants.js";
import bcrypt from "bcryptjs";

export const getOneUser = async (req, res) => {
  try {
    const one = await findOneService(req.params.id);
    res.status(200).json(one);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const all = await findAllService();
    res.status(200).json(all);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await createService(req.body);
    res.status(201).json({ user: createdUser, status: "success" });
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateService(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await findOneByEmailService(req.body.email);
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1d",
      });
      const id = user.id;
      res.status(200).json({ token, id, status: "success" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
};
