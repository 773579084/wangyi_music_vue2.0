import { getToken, setToken, setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    isShowBoolean: false, // 控制登录页面显示和隐藏
    userDetail: {}, // 存储用户详情
    token: getToken(), // 用户cookie
    isLogin: null, // 用户登录状态
    isRouterBoolean: false // 管理动态路由添加
  },
  mutations: {
    // 存储token
    SAVECOOKIE(state, token) {
      state.token = token
      setToken(token)
    },
    ISSHOWFN(state, Boolean) {
      state.isShowBoolean = Boolean
    },
    // 存储/获取 用户基本数据
    SAVEUSERDETAIL(state) {
      const userRes = JSON.parse(localStorage.getItem('userDetail_01'))
      if (userRes) {
        state.userDetail = userRes
      }
    },
    // 用户登录状态
    USERSTATE(state) {
      const state1 = localStorage.getItem('userState_01')
      if (state1) {
        state.isLogin = Boolean(state1)
      } else {
        state.isLogin = false
      }
    },
    // 更改动态路由添加
    CONTROLROUTES(state) {
      state.isRouterBoolean = localStorage.getItem('isRouterBoolean_01')
    }
  },
  actions: {
    // 存储token
    saveCookie(contex, token) {
      contex.commit('SAVECOOKIE', token)
      // 登录成功时设置时间戳
      setTimeStamp()
    },
    isShowFn(context, Boolean) {
      context.commit('ISSHOWFN', Boolean)
    },
    // 存储 用户基本数据
    saveUserDetail(context, Obj) {
      localStorage.setItem('userDetail_01', JSON.stringify(Obj))
      context.commit('SAVEUSERDETAIL')
    },
    // 用户登录状态
    userState(context, state) {
      localStorage.setItem('userState_01', state)
      context.commit('USERSTATE')
    },
    // 更改动态路由添加
    controlRoutes(context, valueBoolean) {
      localStorage.setItem('isRouterBoolean_01', valueBoolean)
      context.commit('CONTROLROUTES')
    }
  }
}
