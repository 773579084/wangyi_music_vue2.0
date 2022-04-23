import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入多个模块
import foundMusicRouter from './modules/foundMusic'
import playlistRouter from './modules/playlist'

// 合并动态路由
export const asyncRoutes = [
  foundMusicRouter,
  playlistRouter
]

export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/foundMusic/recommend'
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/home',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
