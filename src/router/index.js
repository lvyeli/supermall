import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail.vue')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      showTabBar: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showTabBar: true
    }
  },
  {
    //动态路由传递参数
    path: '/detail/:iid',
    component: Detail,
    meta: {
      showTabBar: false
    }
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
