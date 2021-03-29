<template>
  <dev>
    <h1>需求列表</h1>
  </dev>
</template>

<script>
  export default {
    name: "demand",
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
