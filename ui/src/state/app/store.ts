import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchUserQueries } from "../queries/user/userQuery";
import { messageQueries } from "../queries/user/messages/messageQueries";
import { actionsQueries } from "../queries/user/messages/actionsQueries";

export const store = configureStore({
  reducer: {
    [fetchUserQueries.reducerPath]: fetchUserQueries.reducer,
    [messageQueries.reducerPath]: messageQueries.reducer,
    [actionsQueries.reducerPath]: actionsQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchUserQueries.middleware, messageQueries.middleware, actionsQueries.middleware),
});
setupListeners(store.dispatch);
// infer the rootState and appDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
// inferred {app data eg users, posts, matches, messages, complaints}
export type AppDispatch = typeof store.dispatch;
