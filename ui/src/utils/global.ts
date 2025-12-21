export const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s";

export const token: string | null = localStorage.getItem("token");

export const messages = [
  { id: 1, text: "Hello from sender", sender: "sender" },
  { id: 2, text: "Hello from receiver", sender: "receiver" },
];
