import { prisma } from "../config/db";
import { Request, Response } from "express";

export const penpals = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user.id;
    console.log("Loggen in user==>", currentUserId);

    const chats: any = await prisma.penpal.findMany({
      where: {
        OR: [{ friendId: currentUserId }],
      },
      include: {
        user: true,
        friend: true,
        message: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!chats) return;
    const chat: any = chats.map((penpal: any) => (penpal.userId === currentUserId ? penpal.friend : penpal.user));
    const count = await prisma.penpal.count({ where: { readAt: null, friendId: currentUserId } });

    console.log("get all chats==>", chat);

    return res.status(200).json({ message: "penpals fetched", chat, count });
  } catch (error) {
    // if (error instanceof Error) {
    console.log("Error ==>", error);
    return res.status(500).json({ message: "Internal sever error", error: error });
    // } else {
    //   return res.status(500).json({ message: "Backend says! Unknown error" });
    // }
  }
};

export const readCahts = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const chats = await prisma.penpal.findMany({
      where: { userId, readAt: null },
    });
    let updated;
    if (chats) {
      updated = await prisma.penpal.updateMany({
        where: { userId },
        data: {
          readAt: new Date(),
        },
      });
    }
    console.log("Updated==>", updated);
    return res.status(201).json({ message: "All chats read", updated });
  } catch (error) {
    console.log("Error in reading chats", error);
    return res.status(500).json({ message: "Error in reading chat", error });
  }
};
