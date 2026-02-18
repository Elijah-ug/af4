import express from "express";
import { destroy, index, show, store, update, getMe } from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";
import { login } from "../controllers/login";
import { like } from "../controllers/actionsController";
import { allNotifications, newLikes } from "../controllers/notificationsController";

const userRouter = express.Router();
userRouter.post("/signup", store);
userRouter.post("/login", login);
userRouter.get("/", index);
userRouter.get("/me", authenticateUser, getMe);
userRouter.get("/new-likes", authenticateUser, newLikes);
userRouter.get("/all-new-notifications", authenticateUser, allNotifications)
userRouter.post("/:to/likes", authenticateUser, like);
userRouter.get("/:user", show);
userRouter.put("/:user", authenticateUser, update);
userRouter.delete("/:user", authenticateUser, destroy);
export default userRouter;
