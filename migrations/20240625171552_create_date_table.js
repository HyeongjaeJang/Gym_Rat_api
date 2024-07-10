/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("date", (table) => {
    table.increments("id").primary();
    table.string("day").notNullable();
    table.integer("week_id").unsigned().references("id").inTable("weeks");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("date");
};
