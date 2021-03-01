<template>
  <div id="app">
    <chou-qu></chou-qu>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>

  import Home from './page/home/Home.vue'
  import ChouQu from './components/homeitem/ChouQu.vue'

export default {
  name: 'App',
  components: {
    Home,
    ChouQu
  }
}
</script>

<style>

  /*@import './assets/css/base.css';*/

</style>
