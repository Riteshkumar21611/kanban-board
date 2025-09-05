import { configureStore } from "@reduxjs/toolkit";
import columnSlice from "./slices/columnSlice";
import taskSlice from "./slices/TaskSlice";

export const store = configureStore({
  reducer: {
    column: columnSlice.reducer,
    task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
