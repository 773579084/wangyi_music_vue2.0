import request from '@/utils/request'

// 获取二维码的 key
export function getQRKey() {
  return request({
    url: '/login/qr/key',
    params: {
      t: Date.now()
    }
  })
}

// 二维码生成接口 需要传key
export function createQR(key, qrimg = 'qrimg') {
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg
    }
  })
}

// 发送验证码
export function sendAuthCode(phone) {
  return request({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

// 验证码校验
export function checkAuthCode(phone, captcha) {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}

// 检验手机号码是否已注册
export function checkPhoneRegister(phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone
    }
  })
}

// 手机登录
export function phoneLoginApi(phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout'
  })
}

// 获取帐号信息
export function userAccount(cookie) {
  return request({
    url: '/user/account',
    params: {
      cookie
    }
  })
}
