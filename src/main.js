import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.less'
import './assets/fonts/iconfont.css'
import Element from 'element-ui'
import Vuex from 'vuex'
import './request'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {}
})

Vue.use(Element, {
  zIndex: 3000,
  size: 'small'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
