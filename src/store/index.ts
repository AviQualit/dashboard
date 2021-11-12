import { configureStore } from "@reduxjs/toolkit";

import userDataSlice from "./userDataSlice";
import drawerSlice from "./drawerLocation";

const store = configureStore({
  reducer: { userData: userDataSlice.reducer, drawer: drawerSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
