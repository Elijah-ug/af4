import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ChatRequest,
  MessageRequest,
  MessageToSend,
  PenpalRequest,
  UserMessages,
} from "../../../../types/message";

export const messageQueries = createApi({
  reducerPath: "messageQ",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}messages`,
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
        url: `/chat-index?with=${receiverId}`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    getChats: builder.query<PenpalRequest, void>({
      query: () => ({
        url: "/my-chats",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),

    updateMyChats: builder.mutation<ChatRequest, void>({
      query: () => ({
        url: `/my-chats/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<MessageRequest, MessageToSend>({
      query: (body) => ({
        url: "/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),

    readUserMessages: builder.mutation<MessageRequest, void>({
      query: () => ({
        url: "/my-messages/read",
        method: "PUT",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});
export const {
  useGetAllMessagesQuery,
  useGetAllMessagesWithUserQuery,
  useSendMessageMutation,
  useGetChatsQuery,
  useUpdateMyChatsMutation,
  useReadUserMessagesMutation,
} = messageQueries;
