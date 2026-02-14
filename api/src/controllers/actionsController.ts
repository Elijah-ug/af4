import { Request, Response } from "express";
import { prisma } from "../config/db";

export const like = async (req: Request, res: Response) => {
  console.log("tested adding a match on this route");
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

// export const likes=async(req: Request, res: Response)=>{
//   try {
//     const user = req.user.id
//     const userLikes=await prisma.like.count({where:{}})
//   } catch (error) {
    
//   }
// }

export const matches = async (req: Request, res: Response) => {
  try {
    console.log("This rouite also gotten");
    // const user = req.user.id;
    // console.log("User==>", user);
    return res.status(200).json({ message: "Matches fetched" });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: "500 internal server error", err: error });
  }
};
