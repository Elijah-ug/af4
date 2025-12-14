import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes";
import { appPort } from "./config/env";
import adminRouter from "./routes/adminRoutes";

console.log("DB URL==>", process.env.DATABASE_URL);
console.log("type of url==>", typeof process.env.DATABASE_URL);
console.log("URL is there");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

const baseUrl = "/realcompanion/api/v1/";

app.use(`${baseUrl}admins/`, adminRouter);
app.use(`${baseUrl}users/`, userRouter);

app.listen(appPort, () =>
  console.log(`Listening on appPort ${appPort} and url is http://localhost:${appPort}${baseUrl}admins`)
);
