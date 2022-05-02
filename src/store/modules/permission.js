import { asyncRoutes } from '@/router/index'

export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    SETROUTES(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    saveRoutes(context) {
      const routes = [...asyncRoutes]
      context.commit('SETROUTES', routes)

      return routes
    }
  }
}

