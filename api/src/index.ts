import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes";
import { appPort } from "./config/env";
import adminRouter from "./routes/adminRoutes";
import messageRouter from "./routes/messageRoutes";
import http from "http";
import { Server } from "socket.io";
import inquiriesRouter from "./routes/inquiresRoutes";

// console.log("DB URL==>", process.env.DATABASE_URL);

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: ["http://localhost:8080", "https://af4-gilt.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));
const baseUrl = "/realcompanion/api/v1/";

app.use(`${baseUrl}admins/`, adminRouter);
app.use(`${baseUrl}users/`, userRouter);
app.use(`${baseUrl}messages/`, messageRouter);
app.use(`${baseUrl}inquiries/`, inquiriesRouter);

// create http server
const server = http.createServer(app);
// attach socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "https://af4-gilt.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
});
// socket events
io.on("connection", (socket) => {
  console.log("⚡ SOCKET CONNECTED:", socket.id);
  const userId = socket.handshake.auth.userId;
  console.log("Handshake ==>", userId);

  // join the room
  if (userId) {
    socket.join(userId);
  }
  // handle typing flag events
  socket.on("typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("user_typing", { senderId });
  });

  // stop the typing flag
  socket.on("stop_typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("user_stop_typing", { senderId });
  });
  // user joins their own room
  // socket.join(userId);
  // console.log("User id from socket==>", userId);

  socket.on("message", ({ newMsg }) => {
    // send to receiver
    io.to(newMsg.receiverId).emit("chat_message", newMsg);
    // send back to the sender
    io.to(newMsg.senderId).emit("chat_message", newMsg);
    // emits an event to socket.on(client)
  });

  socket.onAny((e, ...args) => {
    console.log("📡 Event received:", e, args);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// console.log("server==>", server);
server.listen(appPort, () =>
  console.log(`Listening on appPort ${appPort} and url is http://localhost:${appPort}${baseUrl}admins`),
);
