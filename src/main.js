import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import Element from 'element-ui';
Vue.use(Element, {
  zIndex: 3000
});

import './assets/css/global.less'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
