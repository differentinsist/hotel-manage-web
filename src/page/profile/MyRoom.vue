<template>
  <div class="tet">
    <div>
      <span>我订购的房间信息</span>
      <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>  <h1>2626262</h1>
      <h1>2626262</h1>
      <h1>2626262</h1>
    </div>
  </div>
</template>

<script>

  import CScroll from 'better-scroll'

    export default {
      name: "my-room",
      data(){
        return {
          scroll: null
        }
      },
      mounted(){
        console.log('yyyyyyyyyyyyyy');
        this.scroll = new CScroll(document.querySelector('.tet'), {

        })
      }
    }
</script>

<style scoped>

  .tet {
    height: 30%;
    background-color: red;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
