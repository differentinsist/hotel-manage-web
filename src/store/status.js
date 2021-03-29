import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const  store = new Vuex.Store({
  state: {
    // 这样子写是没生效的吗？？？生效了，只不过初始化没有值的；我猜想是Vuex比页面初始化还早一步存在，所以一开始是没有值的
    // imageurl: window.sessionStorage.getItem('personpicture')
    imageurl: 'http://image.renthotel.com/hotelhappyimages/2/0/01xixuegui.jpg',
    activePath: '/hotelmall'

  },
  mutations: {
    changeImage(state){
      console.log('状态管理有打印吗实现页面不初始化且不同页面头像同步显示--')
      state.imageurl = window.sessionStorage.getItem('personpicture')
    },
    changeActivePath(state){
      console.log('状态管理实现高亮当前路径菜单----')
      state.activePath = window.sessionStorage.getItem('activePath')
    },
    //
    getHotelmallActivePath(state){
      // 可以写死
      state.activePath = '/hotelmall'
    }
  }
})

export default store














