import dva from '@/utils/dva';
import { useCallback, useEffect, useReducer, useRef } from '@tarojs/taro';

const eqlisStore = dva.eqlisStore;
const refEquality = (a, b) => a === b
/**
 * 允许你使用 selector 函数从一个 Redux Store 中获取数据
 * @param selector 相对于mapStateToProps函数
 * @param equalityFn 自定义比较数据是否前后一致的函数，true则不更新，false则更新
 */
export function useH5Selector(selector, equalityFn = refEquality) {
  const store = eqlisStore;
  const unsubscribe = useRef(null as any)
  const [, forceRender] = useReducer(s => s + 1, 0)

  const latestSubscriptionCallbackError = useRef()
  const latestSelector = useRef()
  const latestSelectedState = useRef()

  let selectedState

  try {
    if (
      selector !== latestSelector.current ||
      latestSubscriptionCallbackError.current
    ) {
      selectedState = selector(store.getState())
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
    let errorMessage = `An error occured while selecting the store state: ${
      err.message
      }.`

    if (latestSubscriptionCallbackError.current) {
      errorMessage += `\nThe error may be correlated with this previous error:\n${
        // @ts-ignore
        latestSubscriptionCallbackError.current.stack
        }\n\nOriginal stack trace:`
    }

    throw new Error(errorMessage)
  }

  useEffect(() => {
    latestSelector.current = selector
    latestSelectedState.current = selectedState
    latestSubscriptionCallbackError.current = undefined
  })

  useEffect(
    () => {
      function checkForUpdates() {
        try {
          // @ts-ignore
          const newSelectedState = latestSelector.current(store.getState())

          if (equalityFn(newSelectedState, latestSelectedState.current)) {
            return
          }

          latestSelectedState.current = newSelectedState
        } catch (err) {
          // we ignore all errors here, since when the component
          // is re-rendered, the selectors are called again, and
          // will throw again, if neither props nor store state
          // changed
          latestSubscriptionCallbackError.current = err
        }

        forceRender({})
      }

      unsubscribe.current = store.subscribe(() => checkForUpdates())

      checkForUpdates()

      return () => unsubscribe.current()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store]
  )
  return selectedState
}

export function useH5Dispatch() {
  return useCallback((action) => {
    eqlisStore.dispatch(action)
  }, [])
}
