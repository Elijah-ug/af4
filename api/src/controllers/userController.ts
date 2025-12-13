import type { Request, Response } from "express";
import { validateUserOnReg } from "../utils/validate";
import { getAge, hashpwd, jwtToken, safeUser } from "../utils/utils";
import { prisma } from "../config/db";

export const store = async (req: Request, res: Response) => {
  try {
    const parsed = validateUserOnReg.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Bad request", error: parsed.error.message });
    const { password, dateOfBirth } = parsed.data;
    const userAge = getAge(dateOfBirth);
    if (userAge <= 18) return res.status(400).json({ message: "Under age" });
    const pwd = await hashpwd(password);
    console.log(pwd, typeof pwd);
    const user = await prisma.user.create({
      data: { ...parsed.data, password: pwd, age: userAge },
    });
    const newUser = safeUser(user);
    const payload = { id: newUser.id, email: newUser.email };
    const token = jwtToken(payload);
    console.log("Created user==>", newUser);
    return res.status(200).json({ message: "store user", newUser, token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    console.log("connected index user");
    return res.status(200).json({ message: "index user" });
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
    console.log("connected show user");
    return res.status(200).json({ message: "show user" });
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
    console.log("connected update user");
    return res.status(200).json({ message: "update user" });
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
    console.log("connected destroy user");
    return res.status(200).json({ message: "destroy user" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
