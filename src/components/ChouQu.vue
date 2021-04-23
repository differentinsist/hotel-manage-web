<template>
  <el-container class="menu-class">
    <!--头部区域-->
    <el-header>
      <div>
        <!--<img :src="personURL" alt="">-->
        <img :src="this.$store.state.imageurl" alt="">
        <span>旅店系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--左边和中间区域-->
    <el-container>






      <!--左边区域-->
      <el-aside width="200px">

        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
          :default-active="this.$store.state.activePath">

          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id" >
            <template slot="title">
              <!--一级 图标-->
              <i :class="iconsObj[item.id-1]"></i>
              <!--一级标题-->
              <span >{{item.title}}</span>
            </template>
            <!--二级菜单                      "'/' + subItem.path 整个是URL后面的那个  -->
            <el-menu-item :index="'/' + subItem.path + ''" v-for="subItem in item.child" :key="subItem.id"
                          @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!--子菜单图标-->
                <i :class="iconsObjChild[subItem.id]"></i>
                <!--副标题-->
                <span>{{subItem.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>




          <!--未改造前-->

          <!--一级菜单(首页)  unique-opened 是只展开一个菜单 default-active是实现菜单高亮通过保存在sessionStorage中的值-->
          <!--<el-submenu index="1" >-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>旅店首页</span>-->
            <!--</template>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/hotelmall" @click="tzHome('/hotelmall')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-open"></i>-->
                <!--<span>旅店详情</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/myroom" @click="tzMyRoom('/myroom')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-medal"></i>-->
                <!--<span>我的房间</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--&lt;!&ndash;一级菜单(商城)&ndash;&gt;-->
          <!--<el-submenu index="2">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-open"></i>-->
              <!--<span>旅店商城</span>-->
            <!--</template>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/shop" @click="tzShop('/shop')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-message"></i>-->
                <!--<span>商品详情</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/cart" @click="tzCart('/cart')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-stopwatch"></i>-->
                <!--<span>我的购物车</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--&lt;!&ndash;一级菜单(本人业务)&ndash;&gt;-->
          <!--<el-submenu index="3" >-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-aim"></i>-->
              <!--<span>用户信息</span>-->
            <!--</template>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/profile" @click="tzProfile('/profile')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-mic"></i>-->
                <!--<span>我的基本信息</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
            <!--&lt;!&ndash;二级菜单&ndash;&gt;-->
            <!--<el-menu-item index="/history" @click="tzHistory('/history')">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-copy-document"></i>-->
                <!--<span>消费记录</span>-->
              <!--</template>-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--&lt;!&ndash;也作为一级菜单(评论区)&ndash;&gt;-->
          <!--<el-menu-item index="/commentarea" @click="tzCommentArea('/commentarea')">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-crop"></i>-->
              <!--<span>本店评论</span>-->
            <!--</template>-->
          <!--</el-menu-item>-->
          <!--&lt;!&ndash;也作为一级菜单(happytime)&ndash;&gt;-->
          <!--<el-menu-item index="/happytime" @click="tzHappyTime('/happytime')">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-trophy-1"></i>-->
              <!--<span>轻松一刻</span>-->
            <!--</template>-->
          <!--</el-menu-item>-->
          <!--&lt;!&ndash;也作为一级菜单(happytime)&ndash;&gt;-->
          <!--<el-menu-item index="/demand" @click="tzDemand('/demand')">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-discover"></i>-->
              <!--<span>需求建议</span>-->
            <!--</template>-->
          <!--</el-menu-item>-->





        </el-menu>

      </el-aside>





      <!--中间内容区域-->
      <!--<el-main class="huadong">-->
      <el-main>
        <!--面包屑-->

        <!--这个占位符必须有的；不然主页就没有内容-->
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

  // import {request} from '../network/request.js'
  // 导入菜单数据
  import MenuData from '../store/menuData.js'


  import HotelMall from '../page/mall/HotelMall.vue'

    export default {
      name: "chouqu",
      data(){
        return {
          //用于实现被点击的菜单高亮，通过把值保存在sessionStorage
          activePath: '',
          // 用户头像
          //personURL: '../assets/touxiang.png'

          //菜单数据
          menuList: [],
          //图标
          iconsObj: [
            'el-icon-office-building',
            'el-icon-shopping-bag-1',
            'el-icon-setting',
            'el-icon-message',
            'el-icon-sunny',
            'el-icon-ice-drink'

          ],
          //子标题图标图标
          iconsObjChild: [
            'el-icon-guide',
            'el-icon-ice-drink ',
            'el-icon-cpu',
            'el-icon-truck',
            'el-icon-map-location',
            'el-icon-position',
            'el-icon-message',
            'el-icon-sunny',
            'el-icon-ice-drink',
            'el-icon-cpu'
          ]
        }
      },
      components: {
        HotelMall
      },
      // 计算属性
      // computed: {
      //   imageP: function () {
      //     this.personURL = this.$store.state.imageurl;
      //   }
      // },
      methods: {
        //保存状态
        saveNavState(activePath){
          window.sessionStorage.setItem('activePath',activePath);

          this.$store.commit('changeActivePath');
          // this.$router.replace(activePath);//这里的路由应该不用
          console.log('执行路由了吗',activePath);
        },
        //保存状态
        // saveNavState2(activePath){
        //   window.sessionStorage.setItem('activePath',activePath);
        //   console.log('打印了大标题的路径了吗=',activePath);
        //   this.$store.commit('changeActivePath');
        //   this.$router.replace(activePath);  //这里的就要
        // },

        getMenuList(){
          this.menuList = MenuData;
        },

        //退出的函数(退出之后要做什么处理吗；比如清除啥的、、)
        logout(){
          console.log('退出登录');
          window.sessionStorage.clear(); //退出的话就清除浏览器的sessionStorage；就是去除token信息这样,
          this.$router.replace('/login');//清除后就定位到登陆页面；就得重新登陆
        }
        // tzHome(hotelmallPath){
        //   console.log('跳转到首页了吗',hotelmallPath);
        //   window.sessionStorage.setItem('activePath',hotelmallPath);//把当前路径存到sessionStorage中，好实现菜单高亮
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/hotelmall');
        // },
        // tzProfile(profilePath){
        //   window.sessionStorage.setItem('activePath',profilePath);//把当前路径存到sessionStorage中，好实现菜单高亮
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/profile');
        // },
        // tzMyRoom(myroomPath){
        //   window.sessionStorage.setItem('activePath',myroomPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/myroom');
        // },
        // tzShop(shopPath){
        //   window.sessionStorage.setItem("activePath",shopPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/shop');
        // },
        // tzHappyTime(happytimePath){
        //   window.sessionStorage.setItem('activePath',happytimePath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/happytime')
        // },
        // tzCommentArea(commentareaPath){
        //   window.sessionStorage.setItem('activePath',commentareaPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/commentarea')
        // },
        // tzCart(cartPath){
        //   window.sessionStorage.setItem('activePath',cartPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/cart')
        // },
        // tzHistory(historyPath){
        //   window.sessionStorage.setItem('activePath',historyPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/history')
        // },
        // tzDemand(demandPath){
        //   window.sessionStorage.setItem('activePath',demandPath);
        //   // this.$store.commit('changeActivePath')
        //   this.$router.replace('/demand');
        // }

        //实现头像更新
        // changeImage: function(){
        //   this.$store.commit('changeImage')
        // }
      },
      created() {
        //获取菜单
        this.getMenuList();

        this.activePath = window.sessionStorage.getItem('activePath');//把当前路径存到sessionStorage中，好实现菜单高亮

        //从sessionStorage中获取头像的路径
        //this.personURL = window.sessionStorage.getItem('personpicture');

        //实现不同页面头像同步变化，在页面初始化后依旧可以拿到正确的头像路径。
        // if(this.$store.state.imageurl !== null){
        //   let getStr = window.sessionStorage.getItem('personobj');
        //   let getObj = JSON.parse(getStr);
        //   if (this.$store.state.imageurl != getObj.personpicture)
        //     this.$store.commit('changeImage');
        //     console.log('chouqu组件的created里面,不等于写对了吗？？');
        // };

        // 用户登录进来就把用户对象保存到Vuex中
        // this.$store.commit('getUserObject');  写在这里没起作用，我写在登陆页面了，登陆成功那里【建议两边都写,不然页面刷新】
        this.$store.commit('getUserObject');

        //用户刚刚注册进来没有头像的，
        this.$store.commit('changeImage')

      }
      //监听图片值的变化，让头像也跟着变化(监听好像是不起作用的，因为跨组件，且当前页面不会再更新
      // 好像是使用vuex来共享数据且实现不同组件之间数据同步更新显示，百度一下)
      // watch: {
      //   'personURL': {
      //     handler(newValue, oldValue){
      //       console.log('实现监听了吗');
      //     }
      //   }
      // }

      //定义一个方法来实现vuex的获取值变化
      // changeImageTogeder(){
      //   this.personURL = this.$store.imageurl;
      //   this.$store.commit('changeImage')
      // }
    }
</script>

<style lang="less" scoped>
  /*设置布局占满整个页面*/
  .menu-class {
    height: 100%;
  }
  /*头部栏样式*/
  .el-header {
    /*position: relative; //新添加的(bu)*/
    width: 100%;
    height: 60%;

    background-color: #373d41;  /*整个头区域的背景色*/
    display: flex;     /*声明使用flex布局*/
    justify-content: space-between;  /*让其使用flex布局；左右布局*/
    padding-left: 2px;   /*设置头像距离左边界距离为0也可以*/
    align-items: center;  /*退出按钮上下居中*/
    color: #fff;   /*文字颜色*/
    font-size: 15px;   /*文字大小*/
    > div {          /*再嵌套设置左边(头像+文字)样式的意思*/
      display: flex;    /*声明也是使用flexbuju*/
      align-items: center;   /*（头像+文字）布局上下居中*/
      span {           /*设置里面文字的样式*/
        margin-left: 10px;       /*文字距离左边界距离10*/
      }
      img {    /*设置里面图片的样式*/
        width: 40px;
        height: 40px;
        border-radius: 50%;  /*设置成圆形边框图片*/
      }
    }
  }
  /*左侧边栏样式*/
  .el-aside {
    /*display: block; //新添加的*/
    /*position: absolute; //新添加的*/
    /*left: 0;*/
    /*top: 60px;*/
    /*bottom: 0;*/

    background-color: #333744;
    position: static;  //原来的
    /*left: 100px;*/
    left: 100px; //原来的
    .el-menu {
      border-right: none; //菜单超出的黑边框就没了
    }
  }

  .el-main {
    position: absolute;
    left: 200px;
    right: 0;
    /*width: 100%;*/
    top: 60px;
    bottom: 0;
    overflow-y: scroll;



    background-color: #eaedf1;
  }



</style>
