import express from "express";
import { authenticateUser } from "../middleware/auth";
import { destroy, index, show, store, unread, update } from "../controllers/messageController";

const messageRouter = express.Router();
messageRouter.post("/send", store);
messageRouter.get("/", authenticateUser, index);
messageRouter.get("/:message", authenticateUser, show);
messageRouter.put("/:message", authenticateUser, update);
messageRouter.put("/:message", authenticateUser, destroy);
messageRouter.put("/:message/unread", authenticateUser, unread);

export default messageRouter;
