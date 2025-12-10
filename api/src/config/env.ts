import dotenv from "dotenv";
dotenv.config();

export const appPort = process.env.PORT;
export const dburl = process.env.DATABASE_URL;
