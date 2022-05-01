import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import playerSong from './modules/playerSong'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    playerSong,
    permission
  },
  getters
})

export default store
