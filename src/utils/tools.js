/** 时间格式化函数
 * @param date          @new Date()一个Date对象
 * @param fmt           时间格式化时间，'yy-MM-dd'
*/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/** 时间戳转化为标砖时间
 * @param msec  时间戳
 */

export function msToDate(msec) {
  const datetime = new Date(msec)
  const year = datetime.getFullYear()
  const month = datetime.getMonth()
  const date = datetime.getDate()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const second = datetime.getSeconds()

  const result1 = year +
    '-' +
    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
    '-' +
    ((date + 1) < 10 ? '0' + date : date) +
    ' ' +
    ((hour + 1) < 10 ? '0' + hour : hour) +
    ':' +
    ((minute + 1) < 10 ? '0' + minute : minute) +
    ':' +
    ((second + 1) < 10 ? '0' + second : second)

  const timeData = formatterDate(result1)

  return timeData
}

function formatterDate(result1) {
  const result = new Date(result1)
  return result
}
