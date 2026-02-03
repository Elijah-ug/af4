import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginFormValues, LoginResponse, SignupPayload, UserResponse, UserType } from "../../../types/types";

export const fetchUserQueries = createApi({
  reducerPath: "userQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ALL_USERS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getLoggedinUser: builder.query<UserType, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (user) => ({
        url: `/${user}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    registerUser: builder.mutation<SignupPayload, SignupPayload>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<LoginResponse, LoginFormValues>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useGetAllUsersQuery,
  useGetLoggedinUserQuery,
  useGetSingleUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = fetchUserQueries;
