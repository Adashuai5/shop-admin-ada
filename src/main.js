import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.less'
import './assets/fonts/iconfont.css'
import Element from 'element-ui'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {}
})

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 为请求头添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
},
error => {
  Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.data.meta.status && response.data.meta.status !== 200) {
    Element.Message.error({
      message: response.data.meta.msg
    })
    return
  }
  return response
},
error => {
  Promise.reject(error)
})

Vue.prototype.$http = axios

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
