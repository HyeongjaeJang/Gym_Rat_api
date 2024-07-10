import express from "express";
import { validateUser } from "../middleware/validateUser.js";
import { getWeekData } from "../controllers/weeksController.js";

const router = express.Router();

router.route("/:id").all(validateUser).get(getWeekData);

export default router;
