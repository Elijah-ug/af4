import type { SignupFormValues } from "../types/types";

export const handleFormSubmission = (values: SignupFormValues) => {
  console.log("Values are here==>", values);
  const dateOfBirth = new Date(`${values.year}-${values.month}-${values.date}`).toISOString();
};
