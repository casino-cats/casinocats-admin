import { createMachine } from "xstate";
import { AuthEventType, AuthStateType } from "./types";

export const authMachine = createMachine<null, AuthEventType, AuthStateType>({
  id: "authMachine",
  initial: "disconnected",
  states: {
    disconnected: {
      on: {
        AUTHORIZATION_SUCCEED: "authorized",
      },
    },
    authorized: {
      on: {
        LOGOUT: "disconnected",
      },
    },
  },
});
