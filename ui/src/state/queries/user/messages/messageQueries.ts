import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ChatRequest, MessageRequest, MessageToSend, UserMessages } from "../../../../types/message";

export const messageQueries = createApi({
  reducerPath: "messageQ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_MESSAGES,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log("token==>", token);
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
      }),
      providesTags: ["Messages"],
    }),
    getChats: builder.query<ChatRequest, void>({
      query: () => ({
        url: "/my-chats",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<MessageRequest, MessageToSend>({
      query: (body) => ({
        url: "/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
export const { useGetAllMessagesQuery, useGetAllMessagesWithUserQuery, useSendMessageMutation, useGetChatsQuery } =
  messageQueries;
