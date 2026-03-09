import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { paginationHelper } from "../../utils/paginator";

export const banUser = async (req: Request, res: Response) => {
  try {
    const admin = req.user.id;
    const user = Number(req.params.user as string);
    // check if admin is the one triggering
    const isAdmin = await prisma.user.findUnique({ where: { id: admin, role: "admin" } });
    if (!isAdmin) {
      return res.status(403).json({ message: "User is authorized" });
    }
    // check if user is already banned
    const isBanned = await prisma.user.findUnique({ where: { id: user, status: "inactive" } });
    if (isBanned) {
      return res.status(403).json({ message: "User is already banned" });
    }
    const banUser = await prisma.user.update({ where: { id: user }, data: { status: "inactive" } });
    return res.status(201).json({ message: "User banned", banUser });
  } catch (error) {
    console.log("Error ==>", error);
    return res.status(500).json({ message: "Internal sever error", error: error });
  }
};

export const bannedUsers = async (req: Request, res: Response) => {
  try {
    const admin = req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    // check if admin is the one triggering
    const isAdmin = await prisma.user.findUnique({ where: { id: admin, role: "admin" } });
    if (!isAdmin) {
      return res.status(403).json({ message: "User is authorized" });
    }
    // const users = await prisma.user.findMany({ where: { status: "inactive" } });
    const users = await paginationHelper(prisma.user, { page, limit }, { where: { status: "inactive" } });
    const totalpages = users.meta.totalPages;

    return res.status(200).json({ message: "Banned Users", users, totalpages });
  } catch (error) {
    console.log("Error ==>", error);
    return res.status(500).json({ message: "Internal sever error", error: error });
  }
};

// unban user
export const unbanUser = async (req: Request, res: Response) => {
  try {
    const admin = req.user.id;
    const user = Number(req.params.user as string);

    // check if admin is the one triggering
    const isAdmin = await prisma.user.findUnique({ where: { id: admin, role: "admin" } });
    if (!isAdmin) {
      return res.status(403).json({ message: "User is authorized" });
    }
    const recover = await prisma.user.update({ where: { id: user, status: "inactive" }, data: { status: "active" } });
    return res.status(200).json({ message: "Recovered banned User!", recover });
  } catch (error) {
    console.log("Error ==>", error);
    return res.status(500).json({ message: "Internal sever error", error: error });
  }
};
