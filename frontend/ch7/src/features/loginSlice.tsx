import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

// API 서버의 결과를 받도록 변경
export interface LoginInfo {
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  roleNames: string[];
  status: string;
}

const initState: LoginInfo = {
  email: "",
  nickname: "",
  accessToken: "",
  refreshToken: "",
  roleNames: [],
  status: "",
};

export const loginPostAsync = createAsyncThunk(
  "login/loginPostAsync",
  async ({ email, pw }: { email: string; pw: string }) => {
    console.log("---------------loginPostAsync---------------------");
    console.log(email, pw);
    const result = await loginPost(email, pw);
    return result;
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    save: (state, action) => {
      console.log("save ......");
      return action.payload;
    },
    logout: (state, action) => {
      console.log("logout ....");

      removeCookie("member");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const newState: LoginInfo = action.payload;

        newState.status = "fulfilled";

        console.log("newState", newState);

        setCookie("member", JSON.stringify(newState), 1);

        return newState;
      })
      .addCase(loginPostAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginPostAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default loginSlice.reducer;

export const { save, logout } = loginSlice.actions;
