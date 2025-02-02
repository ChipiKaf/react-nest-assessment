import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User";

/**
 * Login thunk
 */
export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Login failed");
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error during login");
  }
});

/**
 * Sign up thunk
 */
export const signUpThunk = createAsyncThunk<
  User,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("user/signup", async (registrationInfo, thunkAPI) => {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationInfo),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Sign up failed");
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error during sign up");
  }
});

/**
 * Check if still authenticated
 */
export const checkAuthThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/me", {
      method: "GET",
      credentials: "include", // Send cookies
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error during auth check");
  }
});
