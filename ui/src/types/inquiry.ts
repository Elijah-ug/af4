import type { SafeUser } from "./types";

export type InquiryRequest = {
  subject: string;
  message: string;
};

interface Inquiries {
  subject: string;
  message: string;
  createdAt: Date;
  deletedAt: Date;
  id: number;
  senderId: number;
  sender: SafeUser;
}

export type InquiryResult = {
  inquiries: Inquiries[];
};
