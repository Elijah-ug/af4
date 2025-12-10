"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_js_1 = require("../controllers/adminController.js");
const adminRouter = express_1.default.Router();
adminRouter.post("/register", adminController_js_1.store);
adminRouter.get("/", adminController_js_1.index);
adminRouter.get("/:admin", adminController_js_1.show);
adminRouter.put("/:admin", adminController_js_1.update);
adminRouter.delete("/:admin", adminController_js_1.destroy);
exports.default = adminRouter;
