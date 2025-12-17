export type SignupFormValues = {
  name: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  year: string;
  month: string;
  date: string;
};
export type SignupPayload = Omit<SignupFormValues, "year" | "month" | "date"> & { dateOfBirth: string };
