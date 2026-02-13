import express from "express";
import { destroy, index, show, store, update, getMe } from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";
import { login } from "../controllers/login";
import { like } from "../controllers/actionsController";

const userRouter = express.Router();
userRouter.post("/signup", store);
userRouter.post("/login", login);
userRouter.get("/me", authenticateUser, getMe);
userRouter.post("/:to/likes", authenticateUser, like);
userRouter.get("/", index);
userRouter.get("/:user", show);
userRouter.put("/:user", authenticateUser, update);
userRouter.delete("/:user", authenticateUser, destroy);
export default userRouter;
