import express from "express";
import { destroy, index, show, store, update } from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";

const userRouter = express.Router();
userRouter.post("/", store);
userRouter.get("/", index);
userRouter.get("/:user", authenticateUser, show);
userRouter.put("/:user", authenticateUser, update);
userRouter.put("/:user", authenticateUser, destroy);
export default userRouter;
