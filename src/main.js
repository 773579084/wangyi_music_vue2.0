import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

import './permission'

import ElementUI from 'element-ui'

// 基础样式
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

Vue.use(ElementUI)

// 全局注册混合
// 注册混入
import mixin from './mixin/index'
Vue.mixin(mixin)

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
