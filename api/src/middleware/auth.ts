import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader==>", authHeader);

  if (!authHeader) {
    console.log("No auth headers");
    return res.status(401).json({ message: "Auth headers missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No teken found");
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", error: (error as any).message });
  }
};
