import express from "express";
import { destroy, index, show, store, update } from "../controllers/userController.ts";

const userRouter = express.Router();
userRouter.post("/", store);
userRouter.get("/", index);
userRouter.get("/:user", show);
userRouter.put("/", update);
userRouter.delete("/", destroy);
export default userRouter;
