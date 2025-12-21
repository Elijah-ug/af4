import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MessageToSend } from "../../../../types/message";
import { token } from "../../../../utils/global";

export const messageQueries = createApi({
  reducerPath: "messageQueries",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_MESSAGES,
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<MessageToSend, any>({
      query: (body) => ({
        url: "/send",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body,
      }),
    }),
  }),
});
export const { useSendMessageMutation } = messageQueries;
