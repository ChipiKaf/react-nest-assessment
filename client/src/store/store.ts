import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import notificationReducer from "./notification/notification.slice";
import listenerMiddleware from "./middleware/listeners";
const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
