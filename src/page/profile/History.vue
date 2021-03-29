<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>本人业务</el-breadcrumb-item>
      <el-breadcrumb-item>历史记录</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "history",
    data(){
      return{

      }
    },
    created(){

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath')
    }
  }
</script>

<style scoped>

</style>
