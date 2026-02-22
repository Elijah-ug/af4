import { prisma } from "../config/db";
import { Request, Response } from "express";

export const penpals = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user.id;
    console.log("Loggen in user==>", currentUserId);

    const chats: any = await prisma.penpal.findMany({
      where: {
        OR: [{ userId: currentUserId }, { friendId: currentUserId }],
      },
      include: {
        user: true,
        friend: true,
        message: {
          orderBy: { createdAt: "desc" },
          where: { readAt: null },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!chats) return;
    const chat: any = chats.map((penpal: any) => (penpal.userId === currentUserId ? penpal.friend : penpal.user));
    const count = await prisma.message.count({ where: { readAt: null, receiverId: currentUserId } });
    const countP = await prisma.penpal.count({ where: { readAt: null, friendId: currentUserId } });
    // console.log("get all chats==>", chat);

    return res.status(200).json({ message: "penpals fetched", chat, count, countP, chats });
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
    const friendId = req.user.id;

    const chats = await prisma.penpal.findMany({
      where: { friendId, readAt: null },
    });
    let updated;
    if (chats) {
      // =========== to be modified =============
      updated = await prisma.penpal.updateMany({
        where: { friendId },
        data: {
          readAt: new Date(),
        },
      });
    }
    // update updatedAt of messages
    const reamAll = await prisma.message.updateMany({
      where: { receiverId: friendId },
      data: {
        updatedAt: new Date(),
      },
    });
    console.log("Updated==>", updated);
    console.log("reamAll message notification==>", reamAll);

    return res.status(201).json({ message: "All chats read", updated, reamAll });
  } catch (error) {
    console.log("Error in reading chats", error);
    return res.status(500).json({ message: "Error in reading chat", error });
  }
};

// read messages with user and update the sender in the UI
export const read = async (req: Request, res: Response) => {
  console.log("messages read==> coming");

  try {
    const receiverId = req.user.id;
    console.log("receiverId ==>", receiverId);

    // const senderId = Number(req.query.with as string);
    const readUserMessages = await prisma.message.updateMany({
      where: {
        receiverId,
        readAt: null,
        deletedAt: null,
      },
      data: { readAt: new Date() },
    });
    console.log("messages read==>", readUserMessages);
    return res.status(200).json({ message: "Messages read", readUserMessages });
  } catch (error) {
    console.log("Error in reading chats", error);
    return res.status(500).json({ message: "Error in reading chat", error });
  }
};
