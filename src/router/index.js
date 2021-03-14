import Vue from 'vue'
import Router from 'vue-router'


// 懒加载
const Home = () => import('../page/home/Home.vue')
const Profile = () => import('../page/profile/Profile.vue')
const HotelMall = () => import('../page/mall/HotelMall.vue')
const MyRoom = () => import('../page/profile/MyRoom.vue')
const Shop = () => import('../page/mall/Shop')
const HappyTime = () =>　import('../page/happy/HappyTime.vue')
const CommentArea = () => import('../page/comment/CommentArea.vue')

Vue.use(Router)

const routes = [
  {path: '/', component: HotelMall},
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

