import { Request, Response } from "express";
import { prisma } from "../config/db";
import { safeUserSelect } from "../utils/utils";

export const filterUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const users = await prisma.user.findMany({
      where: search
        ? {
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          }
        : {},
      select: safeUserSelect,
    });

    console.log("filtered users==>", users);
    return res.status(200).json({ message: "Searched users", users });
  } catch (error) {
    console.log("error in filter");
    return res.status(500).json({ message: "Internal server error", error });
  }
};
