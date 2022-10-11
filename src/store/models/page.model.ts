import { action, Action } from "easy-peasy";
import { SideBar } from "../interface";

export interface PageState {
  sideBar: SideBar;
}

interface PageActions {
  setIsTransactionsDropdownShowing: Action<this, boolean>;
  setIsGamesDropdownShowing: Action<this, boolean>;
}

export interface PageModel extends PageState, PageActions {}

export const pageModel: PageModel = {
  sideBar: {
    isGamesDropdownShowing: false,
    isTransactionsDropdownShowing: false,
  },
  // Actions
  setIsTransactionsDropdownShowing: action((state, payload) => {
    state.sideBar.isTransactionsDropdownShowing = payload;
  }),
  setIsGamesDropdownShowing: action((state, payload) => {
    state.sideBar.isGamesDropdownShowing = payload;
  }),
};
