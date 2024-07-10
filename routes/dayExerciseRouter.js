import express from "express";
import { validateUser } from "../middleware/validateUser.js";
import {
  addDayExercise,
  getDayExercise,
  updateDayExercise,
  deleteDayExercise,
} from "../controllers/dayExerciseController.js";

const router = express.Router();

router
  .route("/:id")
  .all(validateUser)
  .get(getDayExercise)
  .post(addDayExercise)
  .put(updateDayExercise)
  .delete(deleteDayExercise);

export default router;
