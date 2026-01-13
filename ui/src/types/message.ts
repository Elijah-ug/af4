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
export type UserMessages = {
  message: string;
  messages: MessageRequest[];
  totalNewMsgs: number;
};
