import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { config } from "../../config/config";

/**
 * Login thunk
 */
export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      const message =
        typeof error.message === "string" ? error.message : error.message[0];
      return thunkAPI.rejectWithValue(message);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
    const response = await fetch(`${config.baseUrl}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationInfo),
    });
    if (!response.ok) {
      const error = await response.json();
      const message =
        typeof error.message === "string" ? error.message : error.message[0];
      return thunkAPI.rejectWithValue(message);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
    const response = await fetch(`${config.baseUrl}/api/auth/me`, {
      method: "GET",
      credentials: "include", // Send cookies
    });
    if (!response.ok) {
      const error = await response.json();
      const message =
        typeof error.message === "string" ? error.message : error.message[0];
      return thunkAPI.rejectWithValue(message);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Network error during auth check");
  }
});

export const logoutThunk = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string }
>("user/logout", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      const message =
        typeof error.message === "string" ? error.message : error.message[0];
      return thunkAPI.rejectWithValue(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Network error during logout");
  }
});
