import Vue from 'vue'
import Router from 'vue-router'


// 懒加载
const Luyou = () => import('../components/homeitem/Luyou')

Vue.use(Router)

const routes = [
  {
    path: '/luyou',
    componenet: Luyou
  }
]


const router = new Router({
  routes: routes
})

export default router

