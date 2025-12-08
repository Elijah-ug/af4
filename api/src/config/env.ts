import dotenv from "dotenv";
dotenv.config();

export const appPort = process.env.PORT;
console.log("port==>", appPort);
