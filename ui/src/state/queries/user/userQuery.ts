import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "../../../types/types";

export const fetchUserQueries = createApi({
  reducerPath: "userQuery",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_ALL_USERS }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUsersQuery } = fetchUserQueries;
