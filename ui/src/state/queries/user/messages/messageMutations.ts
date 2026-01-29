// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { MessageRequest, MessageToSend } from "../../../../types/message";
// import { token } from "../../../../utils/global";

// export const messageMutations = createApi({
//   reducerPath: "messageM",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_USER_MESSAGES,
//     prepareHeaders: (headers) => {
//       // const token = localStorage.getItem("token")
//       console.log("Token hereeee=>", token);
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
    
//   }),
// });
// export const { useSendMessageMutation } = messageMutations;
