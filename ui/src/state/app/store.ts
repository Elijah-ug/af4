import { configureStore } from "@reduxjs/toolkit";
import { userMutations } from "../queries/user/userMutations";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [userMutations.reducerPath]: userMutations.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userMutations.middleware),
});
setupListeners(store.dispatch);
// infer the rootState and appDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
// inferred {app data eg users, posts, matches, messages, complaints}
export type AppDispatch = typeof store.dispatch;
