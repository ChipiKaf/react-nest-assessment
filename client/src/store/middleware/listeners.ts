import { createListenerMiddleware } from "@reduxjs/toolkit";
import { loginThunk, signUpThunk } from "../user/user.thunks";
import { showNotification } from "../notification/notification.slice";

/**
 * Listeners to handle toast showing
 */
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: loginThunk.fulfilled,
  effect: async (isAction, listenerApi) => {
    listenerApi.dispatch(
      showNotification({ message: "Login successful", type: "success" })
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: loginThunk.rejected,
  effect: async (action, listenerApi) => {
    const message = action.payload || "Login failed";

    listenerApi.dispatch(showNotification({ message, type: "error" }));
  },
});

listenerMiddleware.startListening({
  actionCreator: signUpThunk.fulfilled,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(
      showNotification({ message: "Signup successful", type: "success" })
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: signUpThunk.rejected,
  effect: async (action, listenerApi) => {
    const message = action.payload || "Signup failed";

    listenerApi.dispatch(showNotification({ message, type: "error" }));
  },
});
export default listenerMiddleware;
