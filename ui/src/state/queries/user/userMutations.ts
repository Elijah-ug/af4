import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SignupPayload } from "../../../types/types";

export const userMutations = createApi({
  reducerPath: "userMutates",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_ALL_USERS }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<SignupPayload, SignupPayload>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useRegisterUserMutation } = userMutations;
