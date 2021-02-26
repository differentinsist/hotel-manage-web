<template>
  <el-row class="tac">
    <el-col :span="12">
      <!--<h5>自定义颜色</h5>-->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-place"></i>
            <span>商店</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-lollipop"></i>
            <span>我的业务</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-potato-strips"></i>
            <span>我的信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-milk-tea"></i>
            <span>本店评论</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>

  import {request} from '../../network/request.js'

    export default {
      name: "chouquhome",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        tzhuang(){
          this.$router.push('/luyou')
        }
      },
      created() {
        request({
          url: '/api/item/person/queryPersonByPid?pid=000001'
        }).then(res => {
          console.log(res);
        }).catch(errr => {
          console.log(err);
        })
      }
    }
</script>

<style scoped>
  .tac {
    width: 400px;
    height: 100%;
  }
</style>
