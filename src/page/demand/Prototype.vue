<template>
  <div class="demo-image__lazy">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </div>

</template>

<script>
  export default {
    name: "prototype",
    data(){
      return {
        urls: [
          'http://image.renthotel.com/group1/M00/00/00/wKjZgGBNoJKACkPvAACH26k-HN4936.jpg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        ]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
