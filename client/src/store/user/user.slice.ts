import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/AuthState";
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  signUpThunk,
} from "./user.thunks";

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  status: "pending",
  name: "",
  loading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.payload || "Login failed";
      });
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.payload || "Login failed";
      });

    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.payload || "Login failed";
      });

    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.email = "";
        state.name = "";
        state.error = undefined;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.email = "";
        state.name = "";
        state.error = undefined;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.email = "";
        state.name = "";
        state.error = undefined;
      });
  },
});

export default userSlice.reducer;
