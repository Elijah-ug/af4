import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../../../../utils/global";
import type { MessageRequest, MessageToSend, UserMessages } from "../../../../types/message";

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
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    // endpoints here
    getAllMessages: builder.query<UserMessages, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),

    getAllMessagesWithUser: builder.query<UserMessages, number | any>({
      query: (receiverId) => ({
        url: `/chat?with=${receiverId}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<MessageRequest, MessageToSend>({
      query: (body) => ({
        url: "/send",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
export const { useGetAllMessagesQuery, useGetAllMessagesWithUserQuery, useSendMessageMutation } = messageQueries;
