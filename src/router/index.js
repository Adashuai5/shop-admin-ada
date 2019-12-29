import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import(/* webpackChunkName: "Login-Home-Welcome" */ '../views/Login.vue')
const Home = () =>
  import(/* webpackChunkName: "Login-Home-Welcome" */ '../views/Home.vue')
const Welcome = () =>
  import(/* webpackChunkName: "Login-Home-Welcome" */ '../views/Welcome.vue')

const Users = () =>
  import(/* webpackChunkName: "Users-Roles-Rights" */ '../views/user/Users.vue')
const Roles = () =>
  import(
    /* webpackChunkName: "Users-Roles-Rights" */ '../views/auth/role/Roles.vue'
  )
const Rights = () =>
  import(
    /* webpackChunkName: "Users-Roles-Rights" */ '../views/auth/right/Rights.vue'
  )

const Cate = () =>
  import(/* webpackChunkName: "Cate-Rights" */ '../views/goods/cates/Cate.vue')
const Params = () =>
  import(
    /* webpackChunkName: "Cate-Params" */ '../views/goods/params/Params.vue'
  )

const Goods = () =>
  import(/* webpackChunkName: "Goods-Add" */ '../views/goods/goods/Goods.vue')
const Add = () =>
  import(/* webpackChunkName: "Goods-Add" */ '../views/goods/goods/add.vue')

const Order = () =>
  import(/* webpackChunkName: "Order-Reports" */ '../views/order/Order.vue')
const Reports = () =>
  import(/* webpackChunkName: "Order-Reports" */ '../views/report/Reports.vue')

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
