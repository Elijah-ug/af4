import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actionsQueries = createApi({
  reducerPath: "Match_Like",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Token hereeee=>", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Match_Like"],
  endpoints: (builder) => ({
    triggerLike: builder.mutation<any, number>({
      query: (to) => ({
        url: `${to}/likes`,
        method: "POST",
      }),
      invalidatesTags: ["Match_Like"],
    }),
    getMatches: builder.query<any, void>({
      query: () => ({
        url: "/matches",
        method: "GET",
      }),
      providesTags: ["Match_Like"],
    }),
  }),
});
export const { useTriggerLikeMutation, useGetMatchesQuery } = actionsQueries;
