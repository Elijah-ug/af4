import { configureStore } from "@reduxjs/toolkit";
import { userMutations } from "../queries/user/userMutations";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchUserQueries } from "../queries/user/userQuery";
import { messageQueries } from "../queries/user/messages/messageQueries";

export const store = configureStore({
  reducer: {
    [userMutations.reducerPath]: userMutations.reducer,
    [fetchUserQueries.reducerPath]: fetchUserQueries.reducer,
    [messageQueries.reducerPath]: messageQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMutations.middleware, fetchUserQueries.middleware, messageQueries.middleware),
});
setupListeners(store.dispatch);
// infer the rootState and appDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
// inferred {app data eg users, posts, matches, messages, complaints}
export type AppDispatch = typeof store.dispatch;
