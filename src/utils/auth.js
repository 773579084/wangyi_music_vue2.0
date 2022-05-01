import Cookies from 'js-cookie'

// cookie保存的键名
const TokenKey = 'wangyi-token'

// 设置引入token时的时间戳
const timeKey = 'wangyi-timestamp-key'

// 获取时间戳
export function getTimeStamp() {
    return Cookies.get(timeKey)
}

// 设置时间戳
export function setTimeStamp() {
    return Cookies.set(timeKey, Date.now())
}

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
