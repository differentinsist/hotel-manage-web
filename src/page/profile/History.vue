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
      name: "history"
  }
</script>

<style scoped>

</style>
