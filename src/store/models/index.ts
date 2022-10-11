import { pageModel, PageModel } from "./page.model";
import { userModel, UserModel } from "./user.model";

export interface Model {
  userModel: UserModel;
  pageModel: PageModel;
}

export const model: Model = {
  userModel: userModel,
  pageModel: pageModel,
};
