import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/AuthState";
import { loginThunk, signUpThunk } from "./user.thunks";

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  name: "",
  loading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.email = "";
      state.name = "";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
