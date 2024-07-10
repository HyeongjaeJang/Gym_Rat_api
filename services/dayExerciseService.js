import initKnex from "knex";
import configure from "../knexfile.js";

const knex = initKnex(configure);

export const addDayExerciseService = async (id, weekData) => {
  try {
    const { week_start, week_end, date, exercises } = weekData;
    const user_id = id;

    const week = await getOrCreateWeek(user_id, week_start, week_end);
    const dateEntry = await getOrCreateDate(week.id, date.day);

    const exerciseData = exercises.map((exercise) => ({
      ...exercise,
      date_id: dateEntry.id,
    }));

    await knex("exercise").insert(exerciseData);

    return { week, date: dateEntry, exercises: exerciseData };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDayExerciseService = async (id, date) => {
  try {
    const dayEntry = await knex("date").where({ day: date }).first();
    if (!dayEntry) {
      return [];
    }
    const exercises = await knex("exercise").where({ date_id: dayEntry.id });
    return exercises;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDayExerciseService = async (id, day, exercises) => {
  try {
    const dayEntry = await knex("date").where({ day: day }).first();
    if (!dayEntry) {
      throw new Error("Day not found");
    }
    const exercise = exercises[0];

    const existingExercise = await knex("exercise")
      .where({ id: exercise.id, date_id: dayEntry.id })
      .first();

    if (existingExercise) {
      await knex("exercise")
        .where({ id: exercise.id, date_id: dayEntry.id })
        .update({
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          image: exercise.image,
        });
    } else {
      await knex("exercise").insert({
        ...exercise,
        date_id: dayEntry.id,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDayExerciseService = async (id, exerciseId) => {
  try {
    console.log("Exercise ID to delete:", exerciseId);
    await knex("exercise").where({ id: exerciseId }).del();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOrCreateWeek = async (user_id, week_start, week_end) => {
  let week = await knex("weeks").where({ week_start: week_start }).first();

  if (!week) {
    const [weekId] = await knex("weeks").insert({
      week_start,
      week_end,
      user_id,
    });
    week = await knex("weeks").where({ id: weekId }).first();
  }

  return week;
};

const getOrCreateDate = async (week_id, day) => {
  let dateEntry = await knex("date")
    .where({ week_id: week_id, day: day })
    .first();

  if (!dateEntry) {
    const [dateId] = await knex("date").insert({
      day,
      week_id,
    });
    dateEntry = await knex("date").where({ id: dateId }).first();
  }

  return dateEntry;
};
