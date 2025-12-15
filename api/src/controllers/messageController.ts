import { Request, Response } from "express";
import { validateMessage } from "../utils/validate";
import { prisma } from "../config/db";

export const store = async (req: Request, res: Response) => {
  try {
    const parsed = validateMessage.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "400 validation error", error: parsed.error });
    const msg = await prisma.message.create({ data: parsed.data });
    return res.status(200).json({ message: "Message sent", msg });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    if (!id) return res.status(404).json({ message: "404 User not found" });
    const messages = await prisma.message.findMany({ where: { senderId: id, deletedAt: null } });
    const check = { id, readAt: null, receiverDeletedAt: null };
    const totalNewMsgs = await prisma.message.count({ where: check });
    return res.status(200).json({ message: "Messages found", messages, totalNewMsgs });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.message);
    const userId = req.user.id;
    if (!id) return res.status(404).json({ message: "404 Message not found" });
    if (!userId) return res.status(404).json({ message: "404 User not found" });
    const msg = prisma.message.findUnique({
      where: {
        id,
        deletedAt: null,
        OR: [
          { senderId: userId, senderDeletedAt: null },
          { receiverId: userId, receiverDeletedAt: null },
        ],
      },
    });
    return res.status(200).json({ message: "Message found", msg });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.message);
    const userId = req.user.id;
    if (!id) return res.status(404).json({ message: "404 User not found" });
    const msg = await prisma.message.findUnique({ where: { id } });
    if (!msg) return res.status(404).json({ message: "404 Message not found" });
    const newMsg = await prisma.message.update({ where: { id }, data: {} });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.message);
    const userId = req.user.id;
    if (!id) return res.status(404).json({ message: "404 User not found" });
    const msg = await prisma.message.findUnique({ where: { id } });
    if (!msg) return res.status(404).json({ message: "404 Message not found" });
    let updateData = {};
    if (userId === msg.senderId) {
      if (req.query.scope === "foreveryone") {
        updateData = { deletedAt: new Date() };
      } else {
        updateData = { senderDeletedAt: new Date() };
      }
    } else if (userId === msg.receiverId) {
      updateData = { receiverDeletedAt: new Date() };
    } else {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }
    const newMsg = await prisma.message.update({ where: { id }, data: updateData });
    return res.status(200).json({ message: "Message deleted", newMsg });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const unread = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.message);
    const userId = req.user.id;

    if (!id && !userId) res.status(404).json({ message: "404 not found" });

    const check = { id, readAt: null, receiverDeletedAt: null };
    const msg = await prisma.message.groupBy({ by: ["senderId"], where: check, _count: { _all: true } });
    if (!msg) return res.status(404).json({ message: "No new message found!" });
    const newMsg = await prisma.message.update({ where: check, data: { readAt: new Date() } });
    const totalNewMsgs = await prisma.message.count({ where: check });
    return res.status(200).json({ message: "New message", newMsg, totalNewMsgs });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error ==>", error.message);
      return res.status(500).json({ message: "Internal sever error", error: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};
