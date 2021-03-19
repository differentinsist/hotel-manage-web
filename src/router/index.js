import Vue from 'vue'
import Router from 'vue-router'


// 懒加载(都搞懒加载会不会有问题？？？)
const ChouQu = () => import('../components/ChouQu.vue')
const HotelMall = () => import('../page/mall/HotelMall.vue')
const MyRoom = () => import('../page/profile/MyRoom.vue')
const Profile = () => import('../page/profile/Profile.vue')
const History = () => import('../page/profile/History.vue')
const Shop = () => import('../page/mall/Shop')
const Cart = () => import('../page/mall/Cart')
const HappyTime = () =>　import('../page/happy/HappyTime.vue')
const CommentArea = () => import('../page/comment/CommentArea.vue')


const Login = () => import('../page/Login.vue')

Vue.use(Router)

const routes = [
  {path: '/', redirect: '/login'},
  // 意思是当用户访问/login这个路径时跳转到Login这个组件
  {path: '/login', component: Login},
  {path: '/chouqu', component: ChouQu, redirect: '/hotelmall',
    children: [
      {path: '/hotelmall',component: HotelMall},
      {path: '/myroom',component: MyRoom},
      {path: '/shop', component: Shop},
      {path: '/cart', component: Cart},
      {path: '/profile', component: Profile},
      {path: '/history', component: History},
      {path: '/happytime', component: HappyTime},
      {path: '/commentarea', component: CommentArea}
    ]
  }
]


const router = new Router({
  routes: routes
})

export default router

