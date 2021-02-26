import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
//elementui的样式要单独导入
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己定义的全局样式
import './assets/css/global.css'


Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
