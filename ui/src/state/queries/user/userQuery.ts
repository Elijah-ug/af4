import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse, UserType } from "../../../types/types";
import { token } from "../../../utils/global";

export const fetchUserQueries = createApi({
  reducerPath: "userQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ALL_USERS,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    getLoggedinUser: builder.query<UserType, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (user) => ({
        url: `/${user}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUsersQuery, useGetLoggedinUserQuery, useGetSingleUserQuery } = fetchUserQueries;
