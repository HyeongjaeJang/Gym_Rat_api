import date from "../seedData/date.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("date").del();
  await knex("date").insert(date);
};
