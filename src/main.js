import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

import './plugins/element-ui'

// 基础样式
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

// 过滤器全局注册
import * as obj from './filters/index'
for (const key in obj) {
  Vue.filter(`${key}`, obj[key])
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
