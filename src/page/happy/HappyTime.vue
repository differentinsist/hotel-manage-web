<template>
  <div class="happytime">
    <!--左边的图片Click 指示器触发 -->
    <div>
      <div class="leftbutton">
        <el-button type="primary" plain>搞笑的类型</el-button>
        <el-button type="success" plain>问候人的类型</el-button>
      </div>
      <el-carousel class="leftcss"  trigger="click" height="350px" indicator-position="none">
        <el-carousel-item v-for="(leftitem, index) in leftPictureList" :key="index">
          <img class="leftimgclass" :src="leftitem.picture">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--在右边的图片-->
    <div>
      <div class="rightbutton">
        <el-button type="warning" round>励志</el-button>
        <el-button type="danger" round>游戏</el-button>
      </div>
      <el-carousel class="rightcss"  :interval="6000" type="card" height="350px" indicator-position="none">
        <el-carousel-item v-for="rightitem in 4" :key="rightitem">
          <h3 class="medium">{{ rightitem }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  // import CScroll from 'better-scroll'

  import {request} from "../../network/request";

  export default {
      name: "happy-time",
      data(){
        return {
          leftPictureList: [

          ],
          rightPictureList: [
            // {id: '', picture: '', createtime: ''}
          ],
          //默认的图片类型；H为开心类型
          // imagetype: {
          //   type: char,
          //   value: 'H'
          // },
          imagetype: 'H',
          //设置图片的排序；也就是暂时在最前面的是最新上传的还是以前的；根据时间排序
          sortbycreatedtime: true // true是代表desc还是asc
        }
      },
      created(){
        //这个是请求获得所有有趣图片的；后面要把主体放在methods里面；方便再调用；
        this.sendRequestLeft();
        // this.sendRequestRight();  //同时发送两个请求；请求同一个接口；会不会有线程问题？？？？？？？？
      },
      methods: {
        //左边图片的获取；同时加上imagetype来筛选；还有按照时间来排序；这样用户上传的就可以在最前面显示；还是放在后面吧；
        sendRequestLeft(){
          request({
            url: '/api/item/happytime/findAllImages',
            params: {
              imagetype: this.imagetype,
              sortbycreatedtime: this.sortbycreatedtime
            }
          }).then((res) => {
            this.leftPictureList = res.data
          console.log(res);
          console.log(res.data[0].picture);//拿到的图片
          console.log('打印本组件的data看看',this.leftPictureList)
          }).catch((err) => {
            console.log(err);
          })
        },

        //右边的图片获取
        sendRequestRight(){
          request({
            url: '/api/item/happytime/findAllImages',
            params: {
              imagetype: this.imagetype,
              sortbycreatedtime: this.sortbycreatedtime
            }
          })
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

  //设置图片的样式
  .leftimgclass {
    /*border-radius: 5%; //圆形边框*/
    width: 70%;
    height: 90%;
    padding-left: 75px;
    padding-top: 18px;
  }

  //设置左边区域那两个按钮的样式
  .leftbutton {
    display: flex;
    justify-content: space-between;
    /*padding-left: 50px;*/
    /*padding-right: 50px;*/
    padding: 20px;
    /*padding-top: 10px;*/
    /*padding-bottom: 10px;*/
  }


  //设置右边区域那两个按钮的样式
  .rightbutton {
    display: flex;
    justify-content: center;
    padding: 20px;
  }


</style>
