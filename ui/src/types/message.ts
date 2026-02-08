import type { SafeUser } from "./types";

export type MessageToSend = {
  content: string;
  receiverId: number;
};

export type MessageRequest = {
  content: string;
  id: number;
  receiverId: number;
  senderId: number;
  createdAt: Date;
  readAt: Date | null;
  deletedAt: Date | null;
  senderDeletedAt: Date | null;
  receiverDeletedAt: Date | null;
};

type ChatMsg = {
  content: string;
  createdAt: Date;
  deletedAt: Date;
  id: number;
  penpalId: number;
  readAt: Date;
  receiverDeletedAt: Date;
  receiverId: number;
  senderDeletedAt: Date;
  senderId: number;
};
export type Chat = {
  friendId: number;
  userId: number;
  id: number;
  createdAt: Date;
  readAt: Date;
  updatedAt: Date;
  friend: SafeUser;
  user: SafeUser;
  message: ChatMsg[];
};
export type ChatRequest = {
  message: string;
  count: number;
  chat: Chat[] | SafeUser[];
};
export type UserMessages = {
  message: string;
  messages: MessageRequest[];
  totalNewMsgs: number;
  them: number;
};
