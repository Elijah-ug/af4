import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchUserQueries } from "../queries/user/userQuery";
import { messageQueries } from "../queries/user/messages/messageQueries";
import { actionsQueries } from "../queries/user/messages/actionsQueries";
import { inquiryQueries } from "../queries/user/inquiries";

export const store = configureStore({
  reducer: {
    [fetchUserQueries.reducerPath]: fetchUserQueries.reducer,
    [messageQueries.reducerPath]: messageQueries.reducer,
    [actionsQueries.reducerPath]: actionsQueries.reducer,
    [inquiryQueries.reducerPath]: inquiryQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fetchUserQueries.middleware,
      messageQueries.middleware,
      actionsQueries.middleware,
      inquiryQueries.middleware,
    ),
});
setupListeners(store.dispatch);
// infer the rootState and appDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
// inferred {app data eg users, posts, matches, messages, complaints}
export type AppDispatch = typeof store.dispatch;
