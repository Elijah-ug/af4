"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const env_1 = require("./config/env");
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
const baseUrl = "/realcompanion/api/v1/";
app.use(`${baseUrl}admins/`, adminRoutes_1.default);
app.use(`${baseUrl}users/`, userRoutes_1.default);
app.listen(env_1.appPort, () => console.log(`Listening on appPort ${env_1.appPort} and url is http://localhost:${env_1.appPort}${baseUrl}admins`));
