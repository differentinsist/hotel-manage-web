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
const Demand = () => import('../page/demand/Demand')

const Login = () => import('../page/Login.vue')
const Register = () => import('../page/Register.vue')

Vue.use(Router)

const routes = [
  {path: '/', redirect: '/login'},
  // 意思是当用户访问/login这个路径时跳转到Login这个组件
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/chouqu', component: ChouQu, redirect: '/hotelmall',
    children: [
      {path: '/hotelmall',component: HotelMall},
      {path: '/myroom',component: MyRoom},
      {path: '/shop', component: Shop},
      {path: '/cart', component: Cart},
      {path: '/profile', component: Profile},
      {path: '/history', component: History},
      {path: '/happytime', component: HappyTime},
      {path: '/commentarea', component: CommentArea},
      {path: '/demand', component: Demand}
    ]
  }
]

const router = new Router({
  routes: routes
})

//使用路由导航守卫；实现没有token不能访问主页面；只能访问登陆或者注册的页面
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to表示将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //next() 放行，  next('/login')  强制跳转
  if(to.path === '/login' || to.path == '/register') return next() //这样子或号来写都不行；难道要分开写？不是；是我少了/号
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  console.log('tokenStr====',tokenStr)//打印看看有东西吗
  if(!tokenStr) return next('/login')
  next()
})

export default router





