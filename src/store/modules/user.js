export default {
  namespaced: true,
  state: {
    isShowBoolean: false
  },
  mutations: {
    ISSHOWFN(state, Boolean) {
      state.isShowBoolean = Boolean
    }
  },
  actions: {
    isShowFn(context, Boolean) {
      context.commit('ISSHOWFN', Boolean)
    }
  }
}
