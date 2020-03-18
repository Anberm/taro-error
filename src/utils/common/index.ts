import Taro from '@tarojs/taro'
import { format } from 'date-fns'

export function guid() {
    return 'xxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/*获取当前页url*/
export const getCurrentPageUrl = () => {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}

export const formatTime = (date: Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss SSS') => {
    return format(date, formatStr);
}

export const promisify = (data) => {
    return new Promise(resolve =>
        resolve(data)
    )
}
