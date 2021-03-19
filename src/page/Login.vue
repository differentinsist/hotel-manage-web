<template>
  <div class="login_container">
    <div class="login_box"> 登陆组件</div>
  </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style lang="less" scoped>

  //设置最外面的div的也是和背景色；背景色可以替换为图片吗？？？
  .login_container {
    background-color: #2b4b6d;
    height: 100%;
  }
  //设置那个登陆框的颜色
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
  }

</style>
