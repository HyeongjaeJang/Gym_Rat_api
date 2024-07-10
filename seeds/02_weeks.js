import weeks from "../seedData/weeks.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("weeks").del();
  await knex("weeks").insert(weeks);
};
