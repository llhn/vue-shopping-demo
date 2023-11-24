const INFO_KEY = 'shopping_info'//个人信息
const HISTORY_KEY = 'history_info'//搜索历史信息


//获取个人信息
export const getInfo = () => {
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : { token: '', userId: '' }
}

//设置个人信息
export const setInfo = (info) => {
    localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

//移除个人信息
export const removeInfo = () => {
    localStorage.removeItem(INFO_KEY)
}

//获取搜索历史记录
export const getHistory = () => {
    const res = localStorage.getItem(HISTORY_KEY)
    return res ? JSON.parse(res) : []
}
//设置历史记录
export const setHistory = (val) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(val))
}