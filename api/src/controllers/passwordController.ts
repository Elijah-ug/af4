import { Request, Response } from "express";
import { prisma } from "../config/db";
import { validatePwd } from "../utils/validate";
import { hashpwd } from "../utils/utils";

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const parsed = validatePwd.safeParse(req.body);
    console.log("updated user==>", parsed);

    if (!parsed.success) return res.status(400).json({ message: "Bad request, validation failed", err: parsed.error });
    const isAvailable = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!isAvailable) return res.status(404).json({ message: "404, User not found", err: parsed.error });
    const { email, password } = parsed.data;
    if (!password) return;
    const hashed = await hashpwd(password);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });
    console.log("updated password==>", user);
    return res.status(200).json({ message: "User password updated", user });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
