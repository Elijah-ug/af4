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

export type LoginFormValues = {
  email: string;
  password: string;
  // token: string;
};
export type SafeUser = {
  id: number;
  age: number;
  name: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  bio: string;
  profilePic: string;
  location: string;
  interests: string[]; // <-- fix here
  status: string;
  createdAt: Date; // better than object
  updatedAt: Date;
  verifiedAt: Date | null;
  isDeleted: boolean;
  deletedAt: Date | null;
};

export type UserType = {
  message: string;
  newUser: SafeUser;
};
export type UserResponse = {
  message: string;
  totalUsers: number;
  users: SafeUser[];
};

// export type SingleUser={
//   message:string
//   safe:
// }

export type MessageData = { text: string };
