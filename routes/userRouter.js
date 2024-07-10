import express from "express";
import {
  getOneUser as findOne,
  getAllUsers as findAll,
  createUser as create,
  updateUser as update,
  loginUser as login,
} from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.route("/signup").post(create);
router.route("/login").post(login);

router.route("/:id").all(validateUser).get(findOne).put(update);

router.route("/").get(findAll);

export default router;
