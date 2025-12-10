"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const userRouter = express_1.default.Router();
userRouter.post("/", userController_js_1.store);
userRouter.get("/", userController_js_1.index);
userRouter.get("/:user", userController_js_1.show);
userRouter.put("/:user", userController_js_1.update);
userRouter.delete("/:user", userController_js_1.destroy);
exports.default = userRouter;
