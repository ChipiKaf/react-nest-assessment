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
      return thunkAPI.rejectWithValue(error.message[0]);
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
    const response = await fetch(`${config.baseUrl}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationInfo),
    });
    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message[0]);
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
    const response = await fetch(`${config.baseUrl}/api/auth/me`, {
      method: "GET",
      credentials: "include", // Send cookies
    });
    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message[0]);
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error during auth check");
  }
});
