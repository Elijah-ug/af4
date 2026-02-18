import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s";

export const token = localStorage.getItem("token");

export const messages = [
  { id: 1, text: "Hello from sender", sender: "sender" },
  { id: 2, text: "Hello from receiver", sender: "receiver" },
];

export const getErrorMessage = (error: unknown) => {
  if (!error) return "N/A";
  if ("status" in (error as FetchBaseQueryError) && "data" in (error as FetchBaseQueryError)) {
    return ((error as FetchBaseQueryError).data as any)?.message ?? "Error";
  }
  return "N/A";
};
