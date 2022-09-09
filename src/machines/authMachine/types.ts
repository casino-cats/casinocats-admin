import { Interpreter } from "xstate";

export interface AuthorizationSucceeded {
  type: "AUTHORIZATION_SUCCEED";
}

export interface Logout {
  type: "LOGOUT";
}

export type AuthEventType = AuthorizationSucceeded | Logout;

export type AuthStateType = {
  context: null;
  value: "disconnected" | "authorized";
};

export type MachineInterpreter = Interpreter<
  any,
  any,
  AuthEventType,
  AuthStateType
>;
