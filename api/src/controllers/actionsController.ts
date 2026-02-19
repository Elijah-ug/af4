import { Request, Response } from "express";
import { prisma } from "../config/db";

export const like = async (req: Request, res: Response) => {
  try {
    const from: number = req?.user.id;
    const to: number = Number(req.params.to);
    console.log("From==>", from, "to==>", to);

    let like = await prisma.like.upsert({
      where: {
        fromUser_toUser: { fromUser: from, toUser: to },
      },
      update: {},
      create: { fromUser: from, toUser: to },
    });
    //   check for reciprocal
    const reciprocal = await prisma.like.findUnique({
      where: { fromUser_toUser: { fromUser: to, toUser: from } },
    });
    // if reciprocal exists, create a match
    let match = null;
    if (reciprocal) {
      match = await prisma.match.upsert({
        where: {
          userAId_userBId: {
            userAId: Math.max(from, to), //normalization of order
            userBId: Math.min(from, to),
          },
        },
        update: {},
        create: {
          userAId: Math.max(from, to), //normalization of order
          userBId: Math.min(from, to),
        },
      });
    }
    return res.status(201).json({ message: reciprocal ? "It's a match" : "Liked User", like, match });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error on like==>", error);
      return res.status(500).json({ message: "An error", err: error });
    } else {
      console.log("Unknown error");
      return res.status(500).json({ message: "Unknown error", err: error });
    }
  }
};

export const unreadLikes = async (req: Request, res: Response) => {
  try {
    const toUser = req.user.id;
    const userLikes = await prisma.like.findMany({ where: { readAt: null }, orderBy: { createdAt: "desc" } });
    const likers = await prisma.user.findMany({
      where: { likesTo: { some: { id: toUser } } },
      include: { likesTo: true },
    });
    return res.status(200).json({ message: "My likes", userLikes, likers });
  } catch (error) {
    console.log("Error in likes", error);
    return res.status(500).json({ message: "Internal Server error", err: error });
  }
};

export const userLikes = async (req: Request, res: Response) => {
  try {
    const toUser = req.user.id;
    const userLikes = await prisma.like.findMany({ where: { toUser } });
    const users = await prisma.user.findMany({
      where: { likesFrom: { some: { toUser: toUser } } },
      include: { likesTo: true },
    });
    return res.status(200).json({ message: "My likes", userLikes, users });
  } catch (error) {
    console.log("Error in likes", error);
    return res.status(500).json({ message: "Internal Server error", err: error });
  }
};

export const matches = async (req: Request, res: Response) => {
  try {
    const user = req.user.id;
    const matches = await prisma.match.findMany({
      where: { OR: [{ userAId: user }, { userBId: user }] },
      include: { userA: true, userB: true },
    });
    // to filter the logged in user here
    return res.status(200).json({ message: "Matches fetched", matches });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};

// update many likes(readAt)
export const readLikes = async (req: Request, res: Response) => {
  try {
    const toUser = req.user.id;
    const read = await prisma.like.updateMany({ where: { toUser, readAt: null }, data: { readAt: new Date() } });
    return res.status(200).json({ message: "Read likes", read });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};
