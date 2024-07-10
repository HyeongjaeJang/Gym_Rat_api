import {
  addDayExerciseService,
  getDayExerciseService,
  updateDayExerciseService,
  deleteDayExerciseService,
} from "../services/dayExerciseService.js";

export const addDayExercise = async (req, res) => {
  try {
    const id = req.params.id;
    const weekData = req.body;
    const dayExercise = await addDayExerciseService(id, weekData);
    res.status(201).json(dayExercise);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getDayExercise = async (req, res) => {
  try {
    const id = req.params.id;
    const day = req.query.day;

    const dayExercise = await getDayExerciseService(id, day);
    res.status(200).json(dayExercise);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateDayExercise = async (req, res) => {
  try {
    const id = req.params.id;
    const day = req.body.day;
    const exercises = req.body.exercises;
    const updatedDayExercise = await updateDayExerciseService(
      id,
      day,
      exercises,
    );
    res.status(200).json(updatedDayExercise);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDayExercise = async (req, res) => {
  try {
    const id = req.params.id;
    const { id: exerciseId } = req.body;
    const deletedDayExercise = await deleteDayExerciseService(id, exerciseId);
    res.status(200).json(deletedDayExercise);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
