import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BlockRequest,
  LoginFormValues,
  LoginResponse,
  SignupPayload,
  UserRelational,
  UserResponse,
  UserType,
} from "../../../types/types";

export const fetchUserQueries = createApi({
  reducerPath: "userQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getLoggedinUser: builder.query<UserType, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query<UserType, number>({
      query: (user) => ({
        url: `/${user}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    registerUser: builder.mutation<SignupPayload, SignupPayload>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/user/update-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<LoginResponse, LoginFormValues>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfie: builder.mutation<SignupPayload, SignupPayload>({
      query: (body) => ({
        url: "/profile/update",
        method: "PATCH",
        body,
      }),
    }),
    destroyAccount: builder.mutation<any, number>({
      query: (user) => ({
        url: `/${user}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    triggerLike: builder.mutation<any, number>({
      query: (to) => ({
        url: `${to}/likes`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    readLikes: builder.mutation<any, void>({
      query: () => ({
        url: "/read-likes",
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    getMatches: builder.query<any, void>({
      query: () => ({
        url: "/my-matches",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    unreadLikes: builder.query<any, void>({
      query: () => ({
        url: "/new-likes",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    userLikes: builder.query<UserRelational, void>({
      query: () => ({
        url: "/user-likes",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    blockUser: builder.mutation<any, number>({
      query: (userId) => ({
        url: `/block-user?user=${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    unBlockUser: builder.mutation<any, number>({
      query: (userId) => ({
        url: `/unblock-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    restrictBlocked: builder.query<BlockRequest, number>({
      query: (userId) => ({
        url: `/blocked?user=${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    allNewNotifications: builder.query<any, void>({
      query: () => ({
        url: "/all-new-notifications",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});
export const {
  useGetAllUsersQuery,
  useGetLoggedinUserQuery,
  useGetSingleUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useTriggerLikeMutation,
  useGetMatchesQuery,
  useDestroyAccountMutation,
  useUnreadLikesQuery,
  useUserLikesQuery,
  useUpdateProfieMutation,
  useUpdatePasswordMutation,
  useAllNewNotificationsQuery,
  useReadLikesMutation,
  useBlockUserMutation,
  useRestrictBlockedQuery,
  useUnBlockUserMutation
} = fetchUserQueries;
