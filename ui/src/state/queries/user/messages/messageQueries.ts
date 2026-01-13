import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../../../../utils/global";
import type { UserMessages } from "../../../../types/message";

export const messageQueries = createApi({
  reducerPath: "messageQ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_MESSAGES,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // endpoints here
    getAllMessages: builder.query<UserMessages, void>({
      query: () => ({
        url: "/",
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
    }),

    getAllMessagesWithUser: builder.query<UserMessages, void>({
      query: (receiverId) => ({
        url: `/chat?with=${receiverId}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
export const { useGetAllMessagesQuery, useGetAllMessagesWithUserQuery } = messageQueries;
