import express from "express";
import { destroy, index, show, store, update } from "../controllers/adminController";
import { authenticateUser } from "../middleware/auth";
import { login } from "../controllers/login";

const adminRouter = express.Router();
adminRouter.post("/register", store);
adminRouter.post("/login", login);
adminRouter.get("/", index);
adminRouter.get("/:admin", authenticateUser, show);
adminRouter.put("/:admin", authenticateUser, update);
adminRouter.delete("/:admin", authenticateUser, destroy);
export default adminRouter;
