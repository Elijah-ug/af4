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
type likesToUser = {
  id: number;
  fromUser: number;
  toUser: number;
  length: number;
};

export type SafeUser = {
  id: number;
  age: number;
  name: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  role: string;
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
  likesTo: likesToUser;
  _count: { likesTo: number };
};
export type LoginResponse = {
  message: string;
  token: string;
  account: SafeUser;
};

export type UserType = {
  message: string;
  newUser: SafeUser;
};
type PaginatedUsers = {
  data: SafeUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
export type UserResponse = {
  message: string;
  totalUsers: number;
  users: PaginatedUsers;
  totalpages: number;
};
type Like = {
  id: number;
  fromUser: number;
  toUser: number;
  createdAt: Date;
  readAt: Date;
};
export type UserRelational = {
  message: string;
  userLikes: Like[];
  users: SafeUser[];
};
export type Matches = {
  message: string;
  matches: Like[];
};

export type MessageData = { text: string };

// block
type IsBlocked = { id: number; blockerId: number; blockedId: number; createdAt: Date };
export type BlockRequest = {
  message: string;
  isBlocked: IsBlocked;
};
