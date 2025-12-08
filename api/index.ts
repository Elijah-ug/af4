import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { appPort } from "./src/config/env.ts";
import adminRouter from "./src/routes/adminRoutes.ts";
import userRouter from "./src/routes/userRoutes.ts";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

const baseUrl = "/dapp/api/v1/";

app.use(`${baseUrl}/admin/`, adminRouter);
app.use(`${baseUrl}/admin/`, userRouter);

app.listen(appPort, () => console.log(`Listening on appPort ${appPort}`));
