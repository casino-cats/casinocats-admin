import React from "react";
import { useInterpret } from "@xstate/react";
import { authMachine } from "../../machines/authMachine";
import { MachineInterpreter } from "../../machines/authMachine/types";

interface AuthContext {
  authService: MachineInterpreter;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const Context = React.createContext<AuthContext>({} as AuthContext);

export const Provider = (props: AuthProviderProps) => {
  const authService = useInterpret(
    authMachine
  ) as unknown as MachineInterpreter;

  return (
    <Context.Provider value={{ authService }}>
      {props.children}
    </Context.Provider>
  );
};
