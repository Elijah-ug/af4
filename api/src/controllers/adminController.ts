import type { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import { validateAdminOnReg, validateUserOnReg } from "../utils/validate";
import { jwtToken, safeUser } from "../utils/utils";

export const store = async (req: Request, res: Response) => {
  try {
    // validate
    const isValid = validateAdminOnReg.safeParse(req.body);
    if (isValid.error) {
      console.log("valid data is==>", isValid.error);
      return res.status(400).json({ message: "validation Error", error: isValid.error });
    }
    const { name, username, email, password } = req.body;
    const hashedpwd = await bcrypt.hash(password, 10);
    // create admin
    const admin = await prisma.admin.create({ data: { name, username, email, password: hashedpwd } });
    const payload = { id: admin.id, email: admin.email };
    const token = jwtToken(payload);
    return res.status(200).json({ message: "Signed up and loggen in admin", admin, token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    console.log("connected index admin");
    return res.status(200).json({ message: "index Admin (all)" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const user = await prisma.admin.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not fount" });
    const safe = await safeUser(user);
    console.log("connected show admin");
    return res.status(200).json({ message: "show single Admin", safe });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const parsed = validateUserOnReg.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Validation error", error: parsed.error });
    const newUser = await prisma.admin.update({ where: { id }, data: parsed.data });
    console.log("Updated admin data==>", newUser);
    return res.status(200).json({ message: "update admin", newUser });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const admin = await prisma.admin.update({
      where: { id },
      data: { deletedAt: new Date(), isDeleted: true },
    });
    console.log("Destroyed admin==>", admin);
    return res.status(200).json({ message: "destroy Admin", admin });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
