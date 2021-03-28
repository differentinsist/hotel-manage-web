import Vue from 'vue'
import App from './App'
import router from './router'

// 挂载在vue里面之后；后面就可以使用this.$store的方式或vuex里面的东西
import store from './store/status.js'

import ElementUI from 'element-ui'
//elementui的样式要单独导入
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己定义的全局样式
import './assets/css/base.css'


Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
