import jwt from "jsonwebtoken";
import { JWTPayLoad } from "../../types/express/jwtpayload";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
const today = new Date();
export const minAge = new Date(today.getFullYear() - 18);
export const getAge = (dateOfBirth: any) => {
  return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
};

export const jwtToken = (payload: JWTPayLoad) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1day" });
};

export const safeUser = (user: any) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

export const revealSecrets = (pwd: string) => {
  const parsed = jwt.decode(pwd);
};

export const hashpwd = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const formatUserName = (username: string | any) => {
  const format = username.charAt(0) !== "@" ? `@${username}` : username;
  return format.toLowerCase();
};

export const safeUserSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  email: true,
  gender: true,
  dateOfBirth: true,
  age: true,
  bio: true,
  profilePic: true,
  galary: true,
  location: true,
  interests: true,
  likes: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  verifiedAt: true,
  posts: true,
  sentMessages: true,
  receivedMessages: true,
  userQueries: true,
  isDeleted: true,
  deletedAt: true,
  friend: true,
  user: true,
  role: true,
  likesFrom: true,
  likesTo: true,
  matchesA: true,
  matchesB: true,
  blocker: true,
  blocked: true,
  reporter: true,
  reported: true,
};
