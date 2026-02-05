import { prisma } from "../config/db";
import { Request, Response } from "express";

export const penpals = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user.id;
    console.log("Loggen in user==>", currentUserId);
    // const chat = await prisma.penpal.findMany({
    //   orderBy: { createdAt: "desc" },
    // });
    console.log("get all chats==>");

    return res.status(200).json({ message: "penpals fetched" });
  } catch (error) {
    // if (error instanceof Error) {
    console.log("Error ==>", error);
    return res.status(500).json({ message: "Internal sever error", error: error });
    // } else {
    //   return res.status(500).json({ message: "Backend says! Unknown error" });
    // }
  }
};
