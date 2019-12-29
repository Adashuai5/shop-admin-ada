import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/user/Users.vue'
import Roles from '../views/auth/role/Roles.vue'
import Rights from '../views/auth/right/Rights.vue'
import Cate from '../views/goods/cates/Cate.vue'
import Params from '../views/goods/params/Params.vue'
import Goods from '../views/goods/goods/Goods.vue'
import Add from '../views/goods/goods/add.vue'
import Order from '../views/order/Order.vue'
import Reports from '../views/report/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/rights',
        name: 'rights',
        component: Rights
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      },
      {
        path: '/categories',
        name: 'cate',
        component: Cate
      },
      {
        path: '/params',
        name: 'params',
        component: Params
      },
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/goods/add',
        name: 'add',
        component: Add
      },
      {
        path: '/orders',
        name: 'orders',
        component: Order
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // next 是个函数，表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
