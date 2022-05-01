import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入多个模块
import foundMusicRouter from './modules/foundMusic'
import playlistRouter from './modules/playlist'
import podcastRouter from './modules/podcast'
import videoRouter from './modules/video'
import focusRouter from './modules/focus'
import liveRouter from './modules/live'
import privateFMRouter from './modules/privateFM'
import localDownloadRouter from './modules/localDownload'
import recentPlayRouter from './modules/recentPlay'
import userInfoRouter from './modules/userInfo'

export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/foundMusic/recommend'
  }
]

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

// 动态路由
export const asyncRoutes = [
  userInfoRouter
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/home',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...staticRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
