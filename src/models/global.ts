import { wxLogin } from '@/services/user';
import { TabbarDto, User } from './interface';

const managerTabs: TabbarDto[] = [
  {
    pagePath: '/pages/manager/home/index',
    iconPath: '/assets/icon/home.png',
    selectedIconPath: '/assets/icon/home_selected.png',
    text: '首页',
  },
  {
    pagePath: '/pages/manager/goods/index',
    iconPath: '/assets/icon/goods.png',
    selectedIconPath: '/assets/icon/goods_selected.png',
    text: '商品',
  },
  {
    pagePath: '/pages/manager/order/index',
    iconPath: '/assets/icon/order.png',
    selectedIconPath: '/assets/icon/order_selected.png',
    text: '订单',
  },
  {
    pagePath: '/pages/manager/my/index',
    iconPath: '/assets/icon/my.png',
    selectedIconPath: '/assets/icon/my_selected.png',
    text: '我的',
  },
];

const customerTabs: TabbarDto[] = [
  {
    pagePath: '/pages/client/home/index',
    iconPath: '/assets/icon/home.png',
    selectedIconPath: '/assets/icon/home_selected.png',
    text: '首页',
  },
  {
    pagePath: '/pages/client/cart/index',
    iconPath: '/assets/icon/cart.png',
    selectedIconPath: '/assets/icon/cart_selected.png',
    text: '购物车',
  },
  {
    pagePath: '/pages/client/my/index',
    iconPath: '/assets/icon/my.png',
    selectedIconPath: '/assets/icon/my_selected.png',
    text: '我的',
  },
];

export type GlobalState = {
  currentUser: User | null;
  settings: any;
  tabbar: number;
  tabbarList: TabbarDto[];
  color: string;
  selectedColor: string;
};
export const initiaGlobalState: GlobalState = {
  currentUser: null,
  settings: null,
  tabbar: 0,
  tabbarList: [...customerTabs],
  color: '#666',
  selectedColor: 'red',
};

type GlobalModel = {
  state: GlobalState;
  [prop: string]: any;
};

export const GlobalModel: GlobalModel = {
  namespace: 'global',
  state: initiaGlobalState,
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(wxLogin, payload);
      yield put({
        type: 'setUserInfo',
        payload: res,
      });
    },
    *setCustomerTab(_, { call, put }) {
      yield put({
        type: 'setTabbarList',
        payload: customerTabs,
      });
    },
    *setManagerTab(_, { call, put }) {
      yield put({
        type: 'setTabbarList',
        payload: managerTabs,
      });
    },
  },
  reducers: {
    setUserInfo(state: GlobalState, { payload }) {
      return { ...state, currentUser: payload };
    },
    setTabbar(state: GlobalState, { payload }) {
      return { ...state, tabbar: payload };
    },
    setTabbarList(state: GlobalState, { payload }) {
      return { ...state, tabbarList: payload };
    },
  },
};
