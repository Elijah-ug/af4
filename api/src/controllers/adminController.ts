import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

export const store = async (req: Request, res: Response) => {
  try {
    console.log("connected store admin");
    const { name, username, email, role, password } = req.body;
    const admin = await prisma
    // console.log("Created here==>", admin);
    return res.status(200).json({ message: "store Admin" });
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
    console.log("connected show admin");
    return res.status(200).json({ message: "show single Admin" });
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
    console.log("connected update admin");
    return res.status(200).json({ message: "update admin" });
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
    console.log("connected destroy admin");
    return res.status(200).json({ message: "destroy Admin" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
