import { action, Action, computed, Computed } from "easy-peasy";
import { User } from "../interface";

export interface UserState {
  user: User;
  isAdmin: Computed<this, boolean>;
}

interface UserActions {
  setUser: Action<this, User>;
}

export interface UserModel extends UserState, UserActions {}

export const userModel: UserModel = {
  user: {},
  isAdmin: computed((state) => {
    return state.user.role === "admin";
  }),
  //   ACTIONS
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};
