import express from "express";
import { authenticateUser } from "../middleware/auth";
import { destroy, index, chatIndex, show, store, unread, update } from "../controllers/messageController";
import { penpals } from "../controllers/chatsController";

const messageRouter = express.Router();
messageRouter.post("/send", authenticateUser, store);
messageRouter.get("/chat", authenticateUser, chatIndex);
messageRouter.get("/", authenticateUser, index);
messageRouter.get("/:message", authenticateUser, show);
messageRouter.put("/:message", authenticateUser, update);
messageRouter.put("/:message", authenticateUser, destroy);
messageRouter.put("/:message/unread", authenticateUser, unread);

// chat
messageRouter.get("/all-chats", authenticateUser, penpals);

export default messageRouter;
