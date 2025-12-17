import { configureStore } from "@reduxjs/toolkit";
import { userMutations } from "../queries/user/userMutations";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fetchUserQueries } from "../queries/user/userQuery";

export const store = configureStore({
  reducer: {
    [userMutations.reducerPath]: userMutations.reducer,
    [fetchUserQueries.reducerPath]: fetchUserQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMutations.middleware, fetchUserQueries.middleware),
});
setupListeners(store.dispatch);
// infer the rootState and appDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
// inferred {app data eg users, posts, matches, messages, complaints}
export type AppDispatch = typeof store.dispatch;
