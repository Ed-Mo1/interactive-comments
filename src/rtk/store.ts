import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import commentsSlice from "./slices/commentsSlice";

export const store = configureStore({
  reducer: {
    comments: commentsSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
