import { Request, Response } from "express";
import { reportUser } from "../utils/validate";
import { prisma } from "../config/db";

export const report = async (req: Request, res: Response) => {
  console.log("Waiting for data parsed");
  try {
    const reporterId = req.user.id;
    const reportedId = Number(req.params.user);
    const parsed = reportUser.safeParse(req.body);
    console.log("Parsed data==>", parsed);
    if (!parsed.success) return res.status(400).json({ message: "Validation failed" });
    const report = await prisma.report.create({ data: { ...parsed.data, reporterId, reportedId } });
    return res.status(201).json({ message: "Reported user", report });
  } catch (error) {
    console.log("Error in reporting", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// === NOTE === to be viewed by the admin
export const reports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.report.findMany();
    return res.status(201).json({ message: "Reported user", reports });
  } catch (error) {
    console.log("Error in getting reports", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
