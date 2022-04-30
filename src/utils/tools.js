import request from '@/utils/request'

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

// 轮询
/**
     * @descripting 轮询功能
     * @param {String} type 请求类型
     * @param {String} url 地址
     * @param {Object} data 请求数据
     * @param {Number} delay 轮询间隔时间
     *  800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
**/

export function polling(type, url, key, delay = 1000) {
  return new Promise((resolve, reject) => {
    request({
      type,
      url,
      params: {
        key,
        t: Date.now()
      }
    }).then(res => {
      console.log(48, res.data.code)
      if (res.data.code === 800) {
        resolve(res)
      } else if (res.data.code === 801) {
        if (delay !== 2000) {
          console.log(56, delay)
          setTimeout(() => {
            resolve(polling(type, url, key, delay))
          }, delay)
        }
      } else if (res.data.code === 802) {
        resolve(res)
      } else if (res.data.code === 803) {
        resolve(res)
      }
    })
  })
}

