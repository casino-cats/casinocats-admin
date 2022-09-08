import { createMachine } from "xstate";
import { AuthEventType, AuthStateType } from "./types";

export const authMachine = createMachine<null, AuthEventType, AuthStateType>({
  id: "authMachine",
  initial: "disconnected",
  states: {
    disconnected: {
      on: {
        CONNECT_BUTTON_CLICKED: "connecting",
      },
    },
    connecting: {
      on: {
        WALLET_CONNECTED: "connected",
        WALLET_DISCONNECTED: "disconnected",
      },
    },
    connected: {
      on: {
        AUTHORIZATION_SUCCEEDED: "authorized",
        AUTHORIZATION_FAILED: "disconnected",
      },
    },
    authorized: {
      on: {
        LOGOUT: "disconnected",
      },
    },
  },
});
