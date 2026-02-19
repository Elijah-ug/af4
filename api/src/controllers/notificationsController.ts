import { Request, Response } from "express";
import { prisma } from "../config/db";

export const unreadMessages = async (req: Request, res: Response) => {
  try {
    const receiverId = req.user.id;
    const unreadMsg = await prisma.message.count({ where: { readAt: null, deletedAt: null, receiverId } });
    return res.status(200).json({ message: "Unread Messages", unreadMsg });
  } catch (error) {
    console.log("Error in unread messages==>", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// new likes
export const newLikes = async (req: Request, res: Response) => {
  try {
    const toUser = req.user.id;
    const unreadLikes = await prisma.like.count({ where: { readAt: null, toUser } });
    return res.status(200).json({ message: "Unread Messages", unreadLikes });
  } catch (error) {
    console.log("Error in unread likes==>", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// all new notifications
export const allNotifications = async (req: Request, res: Response) => {
  try {
    const receiverId = req.user.id;
    const unreadLikes = await prisma.like.count({ where: { readAt: null, toUser: receiverId } });
    const unreadMsg = await prisma.message.count({ where: { readAt: null, deletedAt: null, receiverId } });
    const all = unreadLikes + unreadMsg;
    return res.status(200).json({ message: "Unread Messages", all });
  } catch (error) {
    console.log("Error in unread likes==>", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
