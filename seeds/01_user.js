/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import user from "../seedData/user.js";

export const seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert(user);
};
