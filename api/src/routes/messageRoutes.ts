import express from "express";
import { authenticateUser } from "../middleware/auth";
import { destroy, index, chatIndex, show, store, unread, update } from "../controllers/messageController";
import { penpals, readCahts } from "../controllers/chatsController";

const messageRouter = express.Router();
messageRouter.post("/send", authenticateUser, store);
messageRouter.get("/chat", authenticateUser, chatIndex);
messageRouter.get("/", authenticateUser, index);
messageRouter.get("/my-chats", authenticateUser, penpals);
messageRouter.get("/:message", authenticateUser, show);
messageRouter.put("/:message", authenticateUser, update);
messageRouter.put("/:message", authenticateUser, destroy);
messageRouter.put("/:message/unread", authenticateUser, unread);
messageRouter.put("/my-chats/read", authenticateUser, readCahts);

// chat

export default messageRouter;
