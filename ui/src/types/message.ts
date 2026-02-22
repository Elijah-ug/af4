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
  chat: SafeUser;
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
  globalCount: number;
  chat: Chat[];
};
type name = {
  username: string;
};
export type UserMessages = {
  message: string;
  messages: MessageRequest[];
  totalNewMsgs: number;
  them: number;
  count: number;
  globalCount: number;
  user: name;
};
export type PenpalRequest = {
  id: number;
  friendId: number;
  userId: number;
  chat: SafeUser[];
  createdAt: Date;
  updatedAt: Date;
  readAt: Date;
  count: number;
  countP: number;
  message: string;
};
