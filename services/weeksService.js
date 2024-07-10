import initKnex from "knex";
import configure from "../knexfile.js";

const knex = initKnex(configure);

export const getWeekDataService = async () => {
  try {
    const currentDate = new Date();

    const currentWeekStartDate = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    currentWeekStartDate.setDate(currentDate.getDate() - daysToSubtract);
    currentWeekStartDate.setHours(0, 0, 0, 0);

    const previousWeekStartDate = new Date(currentWeekStartDate);
    previousWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const prevFormattedDate = formatDate(previousWeekStartDate);
    const currFormattedDate = formatDate(currentWeekStartDate);

    const fetchData = async (formattedDate) => {
      return await knex("weeks")
        .select(
          "weeks.id as week_id",
          "weeks.week_start",
          "weeks.week_end",
          "date.id as date_id",
          "date.day",
          knex.raw(
            "COALESCE(JSON_ARRAYAGG(JSON_OBJECT('exercise_id', exercise.id, 'image', exercise.image, 'name', exercise.name, 'sets', exercise.sets, 'reps', exercise.reps, 'weight', exercise.weight)), '[]') AS exercises",
          ),
        )
        .join("date", "weeks.id", "date.week_id")
        .leftJoin("exercise", "date.id", "exercise.date_id")
        .whereRaw(
          "? BETWEEN weeks.week_start AND weeks.week_end",
          formattedDate,
        )
        .orderBy("date.day", "asc")
        .groupBy(
          "weeks.id",
          "weeks.week_start",
          "weeks.week_end",
          "date.id",
          "date.day",
        );
    };

    const previousWeekData = await fetchData(prevFormattedDate);
    const currentWeekData = await fetchData(currFormattedDate);

    const formatData = (weekData) => {
      const weeks = {};
      weekData.forEach((data) => {
        const { week_id, week_start, week_end, date_id, day, exercises } = data;
        if (!weeks[week_id]) {
          weeks[week_id] = {
            week_id,
            week_start,
            week_end,
            days: [],
          };
        }
        weeks[week_id].days.push({
          date_id,
          day,
          exercises: JSON.parse(exercises),
        });
      });
      return Object.values(weeks);
    };

    const formattedPreviousWeekData = formatData(previousWeekData);
    const formattedCurrentWeekData = formatData(currentWeekData);

    return {
      previousWeekData: formattedPreviousWeekData,
      currentWeekData: formattedCurrentWeekData,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
