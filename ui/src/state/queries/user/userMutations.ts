import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginFormValues, LoginResponse, SignupPayload } from "../../../types/types";
import { token } from "../../../utils/global";

export const userMutations = createApi({
  reducerPath: "userMutates",
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
    registerUser: builder.mutation<SignupPayload, SignupPayload>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginFormValues>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useRegisterUserMutation, useLoginUserMutation } = userMutations;
