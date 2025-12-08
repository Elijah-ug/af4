import express from "express";
import { destroy, index, show, store, update } from "../controllers/adminController.ts";

const adminRouter = express.Router();
adminRouter.post("/", store);
adminRouter.get("/", index);
adminRouter.get("/:admin", show);
adminRouter.put("/", update);
adminRouter.delete("/", destroy);
export default adminRouter;
