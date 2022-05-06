import request from '@/utils/request'
import axios from 'axios'

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

// 获取帐号详情信息
export function getUserDetail(uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

/* 获取行政区域 */
export function getRegionApi(keywords, subdistrict = 2) {
  return axios({
    url: 'https://restapi.amap.com/v3/config/district',
    params: {
      keywords,
      subdistrict,
      key: '2620fe1e0ef4e972d9a9d8ca4d0fffa6'
    }
  })
}

/* 修改个人用户信息 */
export function updateUserApi(gender, birthday, nickname, province, city, signature, cookie) {
  return request({
    url: '/user/update',
    params: {
      gender,
      birthday,
      nickname,
      province,
      city,
      signature,
      cookie
    }
  })
}

// 个人信息加工
export class UserAccount {
  constructor(user) {
    if (!user) return
    this.userId = user.profile.userId
    this.level = user.level
    this.nickname = user.profile.nickname
    this.avatarUrl = user.profile.avatarUrl
    this.province = user.profile.province
    this.city = user.profile.city
    this.gender = user.profile.gender // 0保密 1 男 2女
    this.birthday = user.profile.birthday
    this.signature = user.profile.signature // 个人介绍
    this.follows = user.profile.follows // 关注
    this.followeds = user.profile.followeds // 粉丝
    this.authority = user.profile.authority // 动态
  }
}
