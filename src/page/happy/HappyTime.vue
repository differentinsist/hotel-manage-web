<template>
  <div class="happytime">
    <!--左边的图片Click 指示器触发 -->
    <div>
      <div class="leftbutton">
        <el-button type="primary" plain @click="findAllHimages">常规类型({{leftcount1}}+)</el-button>
        <el-button type="success" plain @click="findAllRimages">问候类型({{leftcount2}}+)</el-button>
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
        <el-button type="warning" round @click="findAllLimages">励志({{rightcount1}}+)</el-button>
        <el-button type="danger" round @click="findAllGimages">游戏({{rightcount2}}+)</el-button>
      </div>
      <el-carousel class="rightcss"  :interval="6000" type="card" height="350px" indicator-position="none">
        <el-carousel-item v-for="(rightitem, index) in rightPictureList" :key="index">
          <img class="rightimgclass" :src="rightitem.picture">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  // import CScroll from 'better-scroll'

  //上传图片我要限制图片大小；不然服务器容量不够了
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
          //默认的图片类型（左边）；H为开心类型、R为骂人类型
          imagetypeleft: 'H',
          //设置图片的排序；也就是暂时在最前面的是最新上传的还是以前的；根据时间排序
          sortbycreatedtime: true, // true是代表desc还是asc
          //设置默认图片的类型（右边）
          imagetyperight: 'L',  //L是励志图片的类型分类
          //返回有多少张图片（左边）
          leftcount1: 0,
          leftcount2: 0, //左二按钮；要分开写；不然就一样了
          //返回有多少张图片（右边）
          rightcount1: 0,
          rightcount2: 0
        }
      },
      created(){
        //这个是请求获得所有有趣图片的；后面要把主体放在methods里面；方便再调用；
        this.sendRequestLeft();
        this.sendRequestRight();  //同时发送两个请求；请求同一个接口；会不会有线程问题？？？？？？？？
      },
      methods: {
        //（左边）图片的获取；同时加上imagetype来筛选；还有按照时间来排序；这样用户上传的就可以在最前面显示；还是放在后面吧；
        sendRequestLeft(){
          request({
            url: '/api/item/happytime/findAllImages',
            params: {
              imagetype: this.imagetypeleft,
              sortbycreatedtime: this.sortbycreatedtime
            }
          }).then((res) => {
            this.leftPictureList = res.data.happytimeimageList; //集合对象
            if(this.imagetypeleft == 'H'){
              this.leftcount1 = res.data.havecount;  //常规图片的图片
            }else if(this.imagetypeleft == 'R'){
              this.leftcount2 = res.data.havecount;  //问候人
            }
            console.log('左边图片的整个对象',res);
            console.log(res.data.happytimeimageList[0].picture);//拿到的图片
            console.log('打印本组件的data看看',this.leftPictureList)
          }).catch((err) => {
            console.log(err);
          })
        },

        //（右边）的图片获取
        sendRequestRight(){
          request({
            url: '/api/item/happytime/findAllImages',
            params: {
              imagetype: this.imagetyperight,
              sortbycreatedtime: this.sortbycreatedtime
            }
          }).then((res) => {
            this.rightPictureList = res.data.happytimeimageList;
            if(this.imagetyperight == 'G'){
              this.rightcount2 = res.data.havecount;  //游戏类型
            } else if(this.imagetyperight == 'L'){
              this.rightcount1 = res.data.havecount;  //励志
            }
            console.log('右边的图片',res.data);
          }).catch((err) => {
            console.log('错误日志',err);
          })
        },

        //点击【搞笑类型】按钮获取搞笑类型的图片(左边)
        findAllHimages(){
          this.imagetypeleft = 'H';
          // this.leftcount2 = 9;
          this.sendRequestLeft();
        },
        //点击【问候朋友类型】按钮获取骂人的图片（左边）
        findAllRimages(){
          this.imagetypeleft = 'R';
          this.sendRequestLeft();
        },

        //点击【励志类型按钮】发送请获取励志的图片
        findAllLimages(){
          this.imagetyperight = 'L';
          this.sendRequestRight();
        },
        //点击【游戏类型按钮】发送请求获取游戏类型的图片
        findAllGimages(){
          this.imagetyperight = 'G';
          this.sendRequestRight();
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
    padding-left: 30px;
    padding-right: 30px;
  }
  .leftcss {
    width: 400px;
  }
  .rightcss {
    width: 600px;
  }

  //设置图片的样式(左边)
  .leftimgclass {
    /*border-radius: 5%; //圆形边框*/
    width: 100%;
    height: 100%;
    /*padding-left: 75px;*/
    /*padding-top: 18px;*/
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
  //右边图片样式
  .rightimgclass {
    width: 90%;
    height: 90%;
    padding-left: 15px;
    padding-top: 15px;

  }


</style>
