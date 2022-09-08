import { Interpreter } from "xstate";

export interface ConnectButtonClickedType {
  type: "CONNECT_BUTTON_CLICKED";
}

export interface WalletConnectedType {
  type: "WALLET_CONNECTED";
}

export interface WalletDisconnected {
  type: "WALLET_DISCONNECTED";
}

export interface AuthorizationSucceeded {
  type: "AUTHORIZATION_SUCCEEDED";
}

export interface AuthorizationFailed {
  type: "AUTHORIZATION_FAILED";
}

export interface Logout {
  type: "LOGOUT";
}

export type AuthEventType =
  | ConnectButtonClickedType
  | WalletConnectedType
  | WalletDisconnected
  | AuthorizationSucceeded
  | AuthorizationFailed
  | Logout;

export type AuthStateType = {
  context: null;
  value: "disconnected" | "connecting" | "connected" | "authorized";
};

export type MachineInterpreter = Interpreter<
  any,
  any,
  AuthEventType,
  AuthStateType
>;
