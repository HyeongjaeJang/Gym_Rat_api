import { getWeekDataService } from "../services/weeksService.js";

export const getWeekData = async (req, res) => {
  try {
    const currWeek = await getWeekDataService();
    res.status(200).json(currWeek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
