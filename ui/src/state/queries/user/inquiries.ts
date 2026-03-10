import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { InquiryRequest, InquiryResult } from "../../../types/inquiry";

export const inquiryQueries = createApi({
  reducerPath: "UsersInquiries",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/inquiries`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // console.log("token==>", token);
      return headers;
    },
  }),
  tagTypes: ["Inquiries"],
  endpoints: (builder) => ({
    // endpoints here
    getInquiries: builder.query<InquiryResult, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Inquiries"],
    }),

    inquire: builder.mutation<InquiryRequest, any>({
      query: (body) => ({
        url: "/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inquiries"],
    }),
    destroyInquiry: builder.mutation<InquiryRequest, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),
  }),
});
export const { useGetInquiriesQuery, useInquireMutation, useDestroyInquiryMutation } = inquiryQueries;
