import jwt from "jsonwebtoken";
import { JWTPayLoad } from "../../types/express/jwtpayload";
import bcrypt from "bcrypt";
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

export const hashpwd = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const formatUserName = (username: string | any) => {
  const format = username.charAt(0) !== "@" ? `@${username}` : username;
  return format;
};
