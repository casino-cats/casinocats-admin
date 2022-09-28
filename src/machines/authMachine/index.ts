import { assign, createMachine } from "xstate";
import { AuthEventType, AuthStateType } from "./types";

export const authMachine = createMachine<any, AuthEventType, AuthStateType>(
  {
    context: { isAuth: true },
    id: "authMachine",
    initial: "disconnected",
    states: {
      disconnected: {
        on: {
          AUTHORIZATION_SUCCEED: {
            actions: "onAuthorizationSucceed",
          },
        },
      },
      authorized: {
        on: {
          LOGOUT: "disconnected",
        },
      },
    },
  },
  {
    actions: {
      onAuthorizationSucceed: assign(() => {
        return { isAuth: true };
      }),
    },
  }
);
