<template>
  <div class="happytime">
    <!--左边的图片Click 指示器触发 -->
    <div>
      <h3>gif</h3>
      <el-carousel class="leftcss"  trigger="click" height="350px" indicator-position="none">
        <el-carousel-item v-for="leftitem in 19" :key="item">
          <h3 class="small">{{ leftitem }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--在右边的图片-->
    <div>
      <h3>图片</h3>
      <el-carousel class="rightcss"  :interval="6000" type="card" height="350px" indicator-position="none">
        <el-carousel-item v-for="rihhtitem in 50" :key="item">
          <h3 class="medium">{{ rihhtitem }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  // import CScroll from 'better-scroll'

    export default {
      name: "happy-time",
      data(){
        return {
          leftPictureList: [

          ],
          rightPictureList: [

          ]
        }
      },
      mounted(){

      }
    }
</script>

<style lang="less" scoped>

  //element走马灯的原始样式
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .happytime {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 15px;
  }
  .leftcss {
    width: 500px;
  }
  .rightcss {
    width: 600px;
  }


</style>
