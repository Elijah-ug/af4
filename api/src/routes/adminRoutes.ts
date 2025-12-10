import express from "express";
import { destroy, index, show, store, update } from "../controllers/adminController.js";

const adminRouter = express.Router();
adminRouter.post("/register", store);
adminRouter.get("/", index);
adminRouter.get("/:admin", show);
adminRouter.put("/:admin", update);
adminRouter.delete("/:admin", destroy);
export default adminRouter;
