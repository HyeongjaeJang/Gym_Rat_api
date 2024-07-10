import exercise from "../seedData/exercise.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("exercise").del();
  await knex("exercise").insert(exercise);
};
