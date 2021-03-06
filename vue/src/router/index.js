import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'
import Roles from '../components/Roles.vue'
import Rights from '../components/Rights.vue'
import Goods from '../components/Goods.vue'
import Params from '../components/Params.vue'
import Categories from '../components/Categories.vue'
import Orders from '../components/Orders.vue'
import Reports from '../components/Reports.vue'



Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/Home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path:'/roles',
        component: Roles
      },
      {
        path:'/rights',
        component: Rights
      },
      {
        path:'/goods',
        component: Goods
      },
      {
        path:'/params',
        component: Params
      },
      {
        path:'/categories',
        component: Categories
      },
      {
        path:'/orders',
        component: Orders
      },
      {
        path:'/Reports',
        component: Reports
      },
     
    ]
  },

]
const router = new VueRouter({
  routes
})
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next是一个函数,表示放行
// next() 放行 next('/login') 强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()

})
export default router