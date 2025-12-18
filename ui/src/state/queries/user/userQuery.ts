import { createApi, fetchBaseQuery, type RootState } from "@reduxjs/toolkit/query/react";
import type { UserResponse, UserType } from "../../../types/types";

export const fetchUserQueries = createApi({
  reducerPath: "userQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ALL_USERS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        console.log("Token in query==>", token);
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
      query: (id) => ({
        url: `/:${id}`,
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUsersQuery, useGetLoggedinUserQuery, useGetSingleUserQuery } = fetchUserQueries;
