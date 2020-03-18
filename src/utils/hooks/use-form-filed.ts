import { useState } from "@tarojs/taro";
import curryRight from 'lodash/curryRight';

const defaultSetState = (value, event, setField) => {
    setField(value);
}
const textAreaSetState = (event, setField) => {
    setField(event.target.value);
}

function useFormField(initialState, setState = defaultSetState) {
    const [field, setField] = useState(initialState);
    const bindState = curryRight(setState);
    return [field, bindState(setField)];
}
export default useFormField;
export { defaultSetState, textAreaSetState }