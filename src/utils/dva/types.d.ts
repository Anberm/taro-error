import { AnyAction, Action } from "redux";
import { AppModelState } from "@/models";

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: AppModelState) => T) => T;
  }
) => void;

interface DvaReducerAction<T> extends AnyAction {
  payload: T;
}

export type Reducer<S = any, A extends Action = DvaReducerAction<S>> = (
  state: S | undefined,
  action: A
) => S;

export type Dispatch<T> = <P = T, C = (payload: P) => void>(action: {
  type: string;
  payload?: Partial<T>;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [P in keyof AppModelState]?: boolean;
  };
}

export interface ConnectProps<T> {
  dispatch?: Dispatch<T>;
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}
