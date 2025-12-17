import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, { message: "Name has to be atleast 3 characters" }),
    username: z.string().min(3, { message: "User name has to be atleast 3 characters" }).optional(),
    email: z.email({ message: "Invalid email" }),
    gender: z.enum(["M", "F"], { message: "Invalid gender" }),
    password: z.string().min(6, { message: "Password has to be atleast 6 characters" }),
    year: z.string(),
    month: z.string(),
    date: z.string(),
  })
  .refine(
    (data) => {
      const dateStr = new Date(`${data.year}-${data.month}-${data.date}`);
      const parsed = dateStr.toLocaleString().split("T")[0];
      return parsed;
    },
    { message: "Inavlid Date Of Birth", path: ["date"] }
  );

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password has to be atleast 6 characters" }),
});

export const years = () => {
  const today = new Date();
  const baseYear = today.getFullYear();
  const minYear = baseYear - 85;
  const maxYear = baseYear - 18;
  let years: string[] = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(String(i));
  }
  return years;
};
export const months = () => {
  let months: string[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(String(i));
  }
  return months;
};

export const dates = () => {
  let days: string[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(String(i));
  }
  return days;
};
