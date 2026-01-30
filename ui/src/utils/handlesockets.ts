import { socket } from "../components/app/services/socket";

export const connectSocket = (userId: number | any) => {
  if (socket.connected) return;
  socket.auth = { userId };
  socket.connect();

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("🔴 Socket error:", err);
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
