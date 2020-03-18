import { GlobalModel } from "./global";
import { TabbarModel, TabbarModelState } from "./tabbar";

const models = [GlobalModel, TabbarModel];
export default models;

export type AppModelState = {
  // common: CommonModelState;
  tabbar: TabbarModelState;
};
