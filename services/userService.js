import initKnex from "knex";
import configure from "../knexfile.js";
const knex = initKnex(configure);
import bcrypt from "bcryptjs";

export const getOneUser = async (id) => {
  try {
    const one = await knex("user").where({ id: id }).first();
    if (!one) {
      throw new Error("User not found");
    }
    const weeks = await knex("weeks").where({ user_id: one.id });
    const dates = await knex("date").whereIn(
      "week_id",
      weeks.map((week) => week.id),
    );
    const exercises = await knex("exercise").whereIn(
      "date_id",
      dates.map((date) => date.id),
    );

    return { ...one, weeks, dates, exercises };
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    const all = await knex("user");
    return all;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (user) => {
  try {
    const password = bcrypt.hashSync(user.password);
    user.password = password;
    const createdUser = await knex("user").insert(user);
    const newUser = await knex("user").where({ id: createdUser[0] }).first();
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const updatedUser = await knex("user").where({ id: id }).update(user);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    const newUser = await knex("user").where({ id: id }).first();
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneUserByEmail = async (email) => {
  try {
    const one = await knex("user").where({ email: email }).first();
    if (!one) {
      throw new Error("User not found");
    }

    return {
      id: one.id,
      name: one.name,
      email: one.email,
      password: one.password,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
