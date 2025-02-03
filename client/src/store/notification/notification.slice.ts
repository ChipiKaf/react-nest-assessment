import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NotificationState,
  NotificationType,
} from "../../types/NotificationState";

const initialState: NotificationState = {
  message: null,
  type: null,
};

export const notificationSlice = createSlice({
  name: "notiifcation",
  initialState,
  reducers: {
    showNotification(
      state,
      action: PayloadAction<{ message: string; type: NotificationType }>
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification(state) {
      state.message = null;
      state.type = null;
    },
  },
});

export default notificationSlice.reducer;

export const { clearNotification, showNotification } =
  notificationSlice.actions;
