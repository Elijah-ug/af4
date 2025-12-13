import { NextFunction, Request, Response } from "express";
import { loginValidator } from "../utils/validate";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import { jwtToken } from "../utils/utils";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginValidator.safeParse(req.body);
    if (!parsed.success) {
      console.log("Login Error==>", parsed.error.message);
      return res.status(400).json({ message: "Login Error", error: parsed.error });
    }
    const { email, password } = parsed.data;
    const user = await prisma.admin.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    const pwdMatch = bcrypt.compare(password, user.password);
    if (!pwdMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = { id: user.id, email: user.email };
    const token = jwtToken(payload);
    return res.status(200).json({ message: "User logged in", user, token });
    // const token =  jwt.sign()
  } catch (error) {
    next(error);
  }
};
