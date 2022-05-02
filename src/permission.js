// permission（许可，权限） 此文件夹专门处理路由权限
import router from '@/router'
import store from '@/store/index'
import Router from 'vue-router'
import Layout from '@/layout'

// 引入多个模块
import foundMusicRouter from '@/router/modules/foundMusic'
import playlistRouter from '@/router/modules/playlist'
import podcastRouter from '@/router/modules/podcast'
import videoRouter from '@/router/modules/video'
import focusRouter from '@/router/modules/focus'
import liveRouter from '@/router/modules/live'
import privateFMRouter from '@/router/modules/privateFM'
import localDownloadRouter from '@/router/modules/localDownload'
import recentPlayRouter from '@/router/modules/recentPlay'

// 静态路由
export const staticRoutes = [
  foundMusicRouter,
  playlistRouter,
  podcastRouter,
  videoRouter,
  focusRouter,
  liveRouter,
  privateFMRouter,
  localDownloadRouter,
  recentPlayRouter
]

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 创建新路由，解决动态路由覆盖问题
    const constantRouterMap = [
      {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/foundMusic/recommend'
      },
      ...staticRoutes
    ] // 默认的路由规则，比如登录页（非权限页）
    router.$addRoutes = (params) => {
      router.matcher = new Router({ // 重置路由规则
        routes: constantRouterMap
      }).matcher
      router.addRoutes(params) // 添加路由
    }

    router.onReady(() => {
      store.dispatch('permission/saveRoutes') // 请求动态路由
        .then(e => {
          router.addRoutes(e) // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
          console.log(54, router)
        })
    })
    next()
  } else {
    console.log(12)
    const blackArr = ['/userInfo']
    if (blackArr.indexOf(to.path) !== -1) {
      next('/')
    }
    next()
  }
})

