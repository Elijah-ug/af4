import type { Request, Response } from "express";
import { validateUserOnReg, validateUserOnUpdate } from "../utils/validate";
import { formatUserName, getAge, hashpwd, jwtToken, safeUser, safeUserSelect } from "../utils/utils";
import { prisma } from "../config/db";
import { paginationHelper } from "../utils/paginator";

export const store = async (req: Request, res: Response) => {
  try {
    const parsed = validateUserOnReg.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Bad request", error: parsed.error.message });
    const { password, dateOfBirth, username } = parsed.data;

    const format = formatUserName(username);
    const userAge = getAge(dateOfBirth);
    if (userAge <= 18) return res.status(400).json({ message: "Under age" });
    const pwd = await hashpwd(password);
    const user = await prisma.user.create({
      data: { ...parsed.data, password: pwd, age: userAge, username: format },
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const usersd = await prisma.user.findMany();
    const users = await paginationHelper(
      prisma.user,
      { page, limit },
      { select: safeUserSelect, where: { role: "user", status: "active" }, orderBy: { createdAt: "desc" } },
    );
    // const users = allUsers.map(({ password, ...safeInfo }) => safeInfo);
    const totalUsers = await prisma.user.count({ where: { role: "user" } });
    const totalpages = users.meta.totalPages;

    // const pwd = users.map((user) => user.password);
    // the following are gonna be worked upon later
    //  -->1️⃣ filter online users
    //  -->2️⃣ pagination of online users
    //  -->3️⃣ get users from the nearby

    // console.log("Users==>", users);
    return res.status(200).json({ message: "index user", users, totalUsers, totalpages });
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
    const id = parseInt(req.params.user as string);
    if (!id || Number.isNaN(id)) {
      console.log("No user id", id, typeof id);
      return res.status(400).json({ message: "Invalid or missing user id" });
    }
    const user = await prisma.user.findUnique({
      where: { id },
      include: { _count: { select: { likesTo: true } } },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const newUser = await safeUser(user);
    return res.status(200).json({ message: "show user", newUser });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    if (!id) {
      console.log("my id not passed");
      return res.status(400).json({ message: "Invalid or missing user id" });
    }
    const user = await prisma.user.findUnique({ where: { id }, include: { likesTo: true } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const newUser = await safeUser(user);
    return res.status(200).json({ message: "show user", newUser });
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
    const parsed = validateUserOnUpdate.safeParse(req.body);
    console.log("updated user==>", parsed);

    if (!parsed.success) return res.status(400).json({ message: "Bad request, validation failed", err: parsed.error });
    const { dateOfBirth, username } = parsed.data;
    const format = formatUserName(username);
    const userAge = getAge(dateOfBirth);

    const user = await prisma.user.update({
      where: { id },
      data: { ...parsed.data, username: format, age: userAge },
    });
    console.log("updated user==>", user);
    return res.status(200).json({ message: "User updated", user });
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
    const user = await prisma.user.delete({
      where: { id },
    });
    console.log("Destroyed user==>", user);
    return res.status(200).json({ message: "destroy user", user });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
