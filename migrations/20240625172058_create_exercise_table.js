/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("exercise", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("sets").notNullable();
    table.integer("reps").notNullable();
    table.integer("weight").notNullable();
    table.string("image").notNullable();
    table.integer("date_id").unsigned().references("id").inTable("date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("exercise");
};
