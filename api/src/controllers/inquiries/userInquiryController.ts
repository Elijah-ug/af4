import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { UserInquiryValidator } from "../../utils/validate";
import { includes } from "zod";

export const store = async (req: Request, res: Response) => {
  console.log("waiting for the store");

  try {
    const senderId = req.user.id;
    console.log("senderId==>", senderId);
    const parsed = UserInquiryValidator.safeParse(req.body);
    console.log("parsed==>", parsed);
    if (!parsed.success) return res.status(400).json({ message: "Bad request", error: parsed.error.message });
    const inquiry = await prisma.userQueries.create({ data: { ...parsed.data, senderId } });
    return res.status(200).json({ message: "Inquiry sent!", inquiry });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    // const isAdmin = await prisma.user.findUnique({ where: { id, role: "admin" } });
    // if (!isAdmin) {
    //   return res.status(403).json({ message: "Not Authorized" });
    // }
    const inquiries = await prisma.userQueries.findMany({ include: { sender: true } });
    return res.status(200).json({ message: "Users' Iquiries", inquiries });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const adminId = req.user.id;
    const id = parseInt(req.params.id as string);
    const isAdmin = await prisma.user.findUnique({ where: { id: adminId, role: "admin" } });
    if (!isAdmin) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    const remove = await prisma.userQueries.delete({ where: { id } });
    return res.status(200).json({ message: "Inquiry deleted!", remove });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};
