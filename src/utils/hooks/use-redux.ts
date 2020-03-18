/* eslint-disable react-hooks/rules-of-hooks */
import {
  useDispatch as useTaroDispatch,
  useSelector as useTaroSelector
} from "@tarojs/redux";
import Taro from "@tarojs/taro";
import { useH5Dispatch, useH5Selector } from "./h5/use-h5-redux";

export function useSelector<TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    return useH5Selector(selector, equalityFn);
  }
  return useTaroSelector(selector, equalityFn);
}

export function useDispatch<T>(): T {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    // @ts-ignore
    return useH5Dispatch();
  }
  return useTaroDispatch();
}
