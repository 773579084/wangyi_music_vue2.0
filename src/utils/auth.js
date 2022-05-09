import Cookies from 'js-cookie'

const TokenKey = 'wangyi-token'

const timeKey = 'wangyi-timestamp-key'

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 360 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}