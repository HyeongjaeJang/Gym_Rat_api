import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import path from "path";
import userRouter from "./routes/userRouter.js";
import exerciseRouter from "./routes/exerciseRouter.js";
import weeksRouter from "./routes/weeksRouter.js";
import dateRouter from "./routes/dayExerciseRouter.js";

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/weeks", weeksRouter);
app.use("/api/day", dateRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
