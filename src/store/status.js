import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const  store = new Vuex.Store({
  state: {
    // 这样子写是没生效的吗？？？生效了，只不过初始化没有值的；我猜想是Vuex比页面初始化还早一步存在，所以一开始是没有值的
    // imageurl: window.sessionStorage.getItem('personpicture')
    //imageurl: 'http://image.renthotel.com/hotelhappyimages/2/0/01xixuegui.jpg', 本机
    imageurl: 'http://8.129.187.106/touxiang/01xixuegui.jpg',
    activePath: '/hotelmall',
    cartData: {
      gid: '',
      goodsid: '',
      goodsname: '',
      goodsbrand: '',
      goodsprice: '',
      goodsstock: '',
      goodsdiscription: '',
      goodspicture: ''
    },
    //控制房间首页下单按钮的显示或隐藏,隐藏之后显示倒计时(隐藏是因为有人入住了,倒计时是显示还有多久可用)
    btnStatus: true,
    //当前用户对象
    userObj: {
      userid: '',
      username: '',
      idcard: ''
    }

  },
  mutations: {
    changeImage(state){
      console.log('状态管理有打印吗实现页面不初始化且不同页面头像同步显示--')
      let getUserStr = window.sessionStorage.getItem('personobj')
      let getUserObj = JSON.parse(getUserStr)
      if(getUserObj.personpicture == null){
        //如果写相对路径会生效吗
        state.imageurl = 'http://8.129.187.106/touxiang/01xixuegui.jpg'
      }else {
        state.imageurl = getUserObj.personpicture
      }
    },
    changeActivePath(state){
      console.log('状态管理实现高亮当前路径菜单----')
      state.activePath = window.sessionStorage.getItem('activePath')
    },
    //
    getHotelmallActivePath(state){
      // 可以写死
      state.activePath = '/hotelmall'
    },
    //设置购物车数据
    getCartData(state){
      console.log('能进来这里面购物车的状态吗------------------------')
      let getStr = window.sessionStorage.getItem('dialogButtonData') //从sessionStorage中获取到的是String类型
      let getObj = JSON.parse(getStr)  //字符串转换为对象
      state.cartData = getObj
      console.log('state中打印购物车对象看看-----',state.cartData)
    },
    //清除购物车
    clearCartData(state){
      state.cartData = {
        gid: '',
        goodsid: '',
        goodsname: '无待支付商品',
        goodsbrand: '',
        goodsprice: '',
        goodsstock: '',
        goodsdiscription: '',
        goodspicture: ''
      }
    },
    //改变状态值；实现显示按钮还是显示状态值
    changeButtonStatus(state){
      state.btnStatus = !state.btnStatus
    },
    //当前用户对象的基本数据
    getUserObject(state){
      let getUserStr = window.sessionStorage.getItem('personobj')
      let getUserObject = JSON.parse(getUserStr)
      state.userObj.userid = getUserObject.id
      state.userObj.username = getUserObject.name
      state.userObj.idcard = getUserObject.idcard
      console.log('打印看看这个Vuex中的用户对象=',state.userObj)
    }
  }
})

export default store














