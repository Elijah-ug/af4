import express from "express";
import { authenticateUser } from "../middleware/auth";
import { destroy, index, chatIndex, show, store, unread, update } from "../controllers/messageController";
import { penpals, read, readCahts } from "../controllers/chatsController";

const messageRouter = express.Router();
messageRouter.post("/send", authenticateUser, store);
messageRouter.get("/", authenticateUser, index);
messageRouter.get("/chat-index", authenticateUser, chatIndex);
messageRouter.get("/my-chats", authenticateUser, penpals);
messageRouter.put("/my-messages/read", authenticateUser, read);
messageRouter.put("/my-chats/read", authenticateUser, readCahts);
messageRouter.get("/:message", authenticateUser, show);
messageRouter.put("/:message", authenticateUser, update);
messageRouter.put("/:message", authenticateUser, destroy);
messageRouter.put("/:message/unread", authenticateUser, unread);

// chat

export default messageRouter;
