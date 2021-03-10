<template>
  <el-container class="menu-class">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../../assets/touxiang.png" alt="">
        <span>旅店..</span>
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
          active-text-color="#ffd04b" :router="true">
          <!--一级菜单(首页)-->
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>旅店首页</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/hotelmall" @click="tzHome">
              <template slot="title">
                <i class="el-icon-open"></i>
                <span>旅店详情</span>
              </template>
            </el-menu-item>
            <!--二级菜单-->
            <el-menu-item index="/myroom" @click="tzMyRoom">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>我的房间</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!--一级菜单(商城)-->
          <el-submenu index="2" @click="tzHome">
            <template slot="title">
              <i class="el-icon-open"></i>
              <span>旅店商城</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/shop" @click="tzShop">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>商品详情</span>
              </template>
            </el-menu-item>
            <!--二级菜单-->
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>我的购物车</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!--一级菜单(本人业务)-->
          <el-submenu index="3" >
            <template slot="title">
              <i class="el-icon-aim"></i>
              <span>本人业务</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="/profile" @click="tzProfile">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>我的基本信息</span>
              </template>
            </el-menu-item>
            <!--二级菜单-->
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>历史记录</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!--也作为一级菜单(评论区)-->
          <el-menu-item index="/commentarea" @click="tzCommentArea">
            <template slot="title">
              <i class="el-icon-crop"></i>
              <span>本店评论</span>
            </template>
          </el-menu-item>

          <!--也作为一级菜单(happytime)-->
          <el-menu-item index="/happytime" @click="tzHappyTime">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>轻松一刻</span>
            </template>
          </el-menu-item>

        </el-menu>

      </el-aside>

      <!--中间内容区域-->
      <el-main class="huadong">
        <span>面包屑>>>> </span>
        <!--这个占位符必须有的；不然主页就没有内容-->
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

  import {request} from '../../network/request.js'

  import Home from '../../page/home/Home.vue'
  import HotelMall from '../../page/mall/HotelMall.vue'

    export default {
      name: "chouqu",
      data(){
        return {

        }
      },
      components: {
        Home,
        HotelMall
      },
      methods: {

        //退出的函数
        logout(){
          console.log('退出登录');
        },
        tzHome(){
          console.log('跳转到首页了吗');
          this.$router.replace('/hotelmall');
        },
        tzProfile(){
          console.log('跳转到我的信息页面组件');
          this.$router.replace('/profile');
        },
        tzMyRoom(){
          this.$router.replace('/myroom');
        },
        tzShop(){
          this.$router.replace('/shop');
        },
        tzHappyTime(){
          this.$router.replace('/happytime')
        },
        tzCommentArea(){
          this.$router.replace('/commentarea')
        }
      },
      created() {
        // request({
        //   url: '/api/item/person/queryPersonByPid?pid=000001'
        // }).then(res => {
        //   console.log(res);
        // }).catch(err => {
        //   console.log(err);
        // })
      }
    }
</script>

<style lang="less" scoped>
  /*设置布局占满整个页面*/
  .menu-class {
    height: 100%;
  }
  /*头部栏样式*/
  .el-header {
    background-color: #373d41;  /*整个头区域的背景色*/
    display: flex;     /*声明使用flex布局*/
    justify-content: space-between;  /*让其使用flex布局；左右布局*/
    padding-left: 2px;   /*设置头像距离左边界距离为0也可以*/
    align-items: center;  /*退出按钮上下居中*/
    color: #fff;   /*文字颜色*/
    font-size: 20px;   /*文字大小*/
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
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }

  /*.huadong {*/
    /*position: sticky;*/
    /*top: 44px;*/
  /*}*/


</style>
