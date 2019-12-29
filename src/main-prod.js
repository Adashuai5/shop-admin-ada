import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.less'
import './assets/fonts/iconfont.css'
import Element from 'element-ui'
import './utils/request'
import Vuex from 'vuex'
import mixins from './utils/mixins'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

Vue.use(Vuex)

Vue.use(mixins)

const store = new Vuex.Store({
  state: {}
})

Vue.use(Element, {
  zIndex: 3000,
  size: 'small'
})

Vue.filter('dataFormat', val => {
  const dateTime = new Date(val)

  const Y = dateTime.getFullYear()
  const M = (dateTime.getMonth() + 1 + '').padStart(2, '0')
  const D = (dateTime.getDate() + 1 + '').padStart(2, '0')

  const hh = (dateTime.getHours() + '').padStart(2, '0')
  const mm = (dateTime.getMinutes() + '').padStart(2, '0')
  const ss = (dateTime.getSeconds() + '').padStart(2, '0')

  return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
