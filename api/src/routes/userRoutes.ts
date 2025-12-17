import express from "express";
import { destroy, index, show, store, update } from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";
import { login } from "../controllers/login";

const userRouter = express.Router();
userRouter.post("/signup", store);
userRouter.post("/login", login);
userRouter.get("/", index);
userRouter.get("/:user", authenticateUser, show);
userRouter.put("/:user", authenticateUser, update);
userRouter.put("/:user", authenticateUser, destroy);
export default userRouter;
