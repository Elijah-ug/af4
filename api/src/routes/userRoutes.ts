import express from "express";
import { destroy, index, show, store, update } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/", store);
userRouter.get("/", index);
userRouter.get("/:user", show);
userRouter.put("/:user", update);
userRouter.delete("/:user", destroy);
export default userRouter;
