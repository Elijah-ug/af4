import { z } from "zod";
import { minAge } from "./utils";

export const validateAdminOnReg = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.string().default("ordinary"),
  status: z.string().default("inactive"),
  username: z.string().min(3).optional(),
  profilePic: z.url().optional(),
  location: z.string().optional(),
});

export const validateUserOnReg = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  gender: z.string(),
  dateOfBirth: z.iso.date(),
  status: z.string().default("inactive"),
  username: z.string().min(3).optional(),
  age: z.int().optional(),
  bio: z.string().optional(),
  profilePic: z.url().optional(),
  location: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export const validateUserOnUpdate = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  // password: z.string().min(6).optional(),
  gender: z.string().optional(),
  dateOfBirth: z.iso.date().optional(),
  status: z.string().default("inactive").optional(),
  username: z.string().min(3).optional(),
  age: z.int().optional(),
  bio: z.string().optional(),
  profilePic: z.url().optional(),
  location: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export const validatePwd = z.object({
  email: z.email(),
  password: z.string().min(6).optional(),
});
export const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const validateMessage = z.object({
  content: z.string().min(1).max(255),
  receiverId: z.int(),
});

export const reportUser = z.object({
  reason: z.string().min(3).max(255),
});
