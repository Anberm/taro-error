import { Reducer } from "@/utils/dva/types";

export interface TabbarModelState {
  current: number;
}

export interface TabbarModelType {
  namespace: "tabbar";
  state: TabbarModelState;
  effects: {
    // query: Effect
  };
  reducers: {
    save: Reducer<TabbarModelState>;
  };
}

export const TabbarModel: TabbarModelType = {
  namespace: "tabbar",
  state: {
    current: 0
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      state = payload;
      return state;
    }
  }
};
