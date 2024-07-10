import fs from "fs";
import path from "path";

const jsonFilePath = path.resolve("exerciseData/exercise.json");

const readExerciseData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const handleError = (res, statusCode, message) => {
  console.error(message);
  res.status(statusCode).json({ message });
};

export const getSelectedPart = async (req, res) => {
  try {
    const exerciseData = await readExerciseData();
    const exercisePart = exerciseData.exercise.find(
      (ex) => ex.part === req.query.part,
    );

    if (!exercisePart || exercisePart.children.length === 0) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const transformedData = exercisePart.children.map((exercise) => ({
      name: exercise.name,
      type: exercise.type,
      muscle: exercise.muscle,
      equipment: exercise.equipment,
      difficulty: exercise.difficulty,
      instructions: exercise.instructions,
      images: exercise.images,
    }));

    res.json(transformedData);
  } catch (error) {
    handleError(res, 500, "Error reading the JSON file");
  }
};

export const getOneExercises = async (req, res) => {
  try {
    const exerciseData = await readExerciseData();
    let foundExercise = null;

    for (const ex of exerciseData.exercise) {
      foundExercise = ex.children.find(
        (child) => child.name === req.query.name,
      );
      if (foundExercise) break;
    }

    if (!foundExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(foundExercise);
  } catch (error) {
    handleError(res, 500, "Error reading the JSON file");
  }
};

export const getExerciseDifficulty = async (req, res) => {
  try {
    const exerciseData = await readExerciseData();
    let foundExercises = [];

    for (const ex of exerciseData.exercise) {
      const matchingExercises = ex.children.filter(
        (child) => child.difficulty === req.query.difficulty,
      );
      foundExercises = [...foundExercises, ...matchingExercises];
    }

    if (foundExercises.length === 0) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(foundExercises);
  } catch (error) {
    handleError(res, 500, "Error reading the JSON file");
  }
};

export const getSelectedPartDifficulty = async (req, res) => {
  try {
    const exerciseData = await readExerciseData();
    const exercisePart = exerciseData.exercise.find(
      (ex) => ex.part === req.query.part,
    );

    if (!exercisePart) {
      return res.json({ message: "Exercise not found" });
    }

    const matchingExercises = exercisePart.children.filter(
      (child) => child.difficulty === req.query.difficulty,
    );

    if (matchingExercises.length === 0) {
      return res.json({ message: "Exercise not found" });
    }

    res.json({ exercise: matchingExercises });
  } catch (error) {
    handleError(res, 500, "Error reading the JSON file");
  }
};

export const getEveryExercises = async (_req, res) => {
  try {
    const exerciseData = await readExerciseData();
    res.json(exerciseData);
  } catch (error) {
    handleError(res, 500, "Error reading the JSON file");
  }
};
