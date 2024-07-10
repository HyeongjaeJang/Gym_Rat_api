import express from "express";
import {
  getEveryExercises as findAllService,
  getSelectedPart as findPartService,
  getOneExercises as findOneService,
  getExerciseDifficulty as findDifficultyService,
  getSelectedPartDifficulty as findPartwithDifficultyService,
} from "../controllers/exercisesController.js";

const router = express.Router();

router.route("/").get((req, res) => {
  if (req.query.part && req.query.difficulty) {
    findPartwithDifficultyService(req, res);
  } else if (req.query.part) {
    findPartService(req, res);
  } else if (req.query.difficulty) {
    findDifficultyService(req, res);
  } else if (req.query.name) {
    findOneService(req, res);
  } else {
    findAllService(req, res);
  }
});

export default router;
