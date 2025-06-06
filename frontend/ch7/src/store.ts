import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";

const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
