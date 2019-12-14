import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.less'
import './assets/fonts/iconfont.css'
import Element from 'element-ui';

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 为请求头添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

Vue.use(Element, {
  zIndex: 3000
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
