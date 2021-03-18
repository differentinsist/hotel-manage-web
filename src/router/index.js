import Vue from 'vue'
import Router from 'vue-router'


// 懒加载(都搞懒加载会不会有问题？？？)
const Home = () => import('../page/home/Home.vue')
const Profile = () => import('../page/profile/Profile.vue')
const HotelMall = () => import('../page/mall/HotelMall.vue')
const MyRoom = () => import('../page/profile/MyRoom.vue')
const Shop = () => import('../page/mall/Shop')
const HappyTime = () =>　import('../page/happy/HappyTime.vue')
const CommentArea = () => import('../page/comment/CommentArea.vue')

const Login = () => import('../page/Login.vue')

Vue.use(Router)

const routes = [
  {path: '/', component: HotelMall},
  // 意思是当用户访问/login这个路径时跳转到Login这个组件
  {path: '/login', component: Login},
  {path: '/hotelmall', component: HotelMall},
  // {path: '/myroom', name: '/myroom', component: MyRoom},
  {path: '/myroom',component: MyRoom},
  {path: '/shop', component: Shop},
  {path: '/happytime', component: HappyTime},
  {path: '/commentarea', component: CommentArea},
  {path: '/profile', component: Profile}
]


const router = new Router({
  routes: routes
})

export default router

