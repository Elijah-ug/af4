import { Request, Response } from "express";
import { prisma } from "../config/db";

export const blockUser = async (req: Request, res: Response) => {
  try {
    const blockerId = req.user.id;
    const blockedId = Number(req.query.user as string);
    const block = await prisma.block.create({
      data: { blockerId, blockedId },
    });
    return res.status(200).json({ message: "User blocked", block });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};

export const restrictBlocked = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const friendId = Number(req.query.user as string);
    const isBlocked = await prisma.block.findFirst({
      where: {
        OR: [
          { blockerId: userId, blockedId: friendId },
          { blockerId: friendId, blockedId: userId },
        ],
      },
    });
    return res.status(200).json({ message: "User blocked", isBlocked });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};

export const destroyBlock = async (req: Request, res: Response) => {
  try {
    const blockerId = req.user.id;
    const blockedId = Number(req.params.user as string);
    const isBlocked = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: { blockedId, blockerId },
      },
    });
    if (!isBlocked) return res.status(404).json({ message: "404 not found" });
    if (isBlocked.blockerId !== blockerId) return res.status(403).json({ message: "403 You cannot unblock yourself" });
    const unblock = await prisma.block.delete({
      where: {
        blockerId_blockedId: { blockedId, blockerId },
      },
    });
    return res.status(200).json({ message: "User blocked", unblock });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};
