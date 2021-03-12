<template>
  <div>

    <el-row class="huadong">
      <el-col :span="8" v-for="(o, index) in roomList" :key="o" :offset="index > 0 ? index : 0" class="col">
        <div class="wrapper">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/room/11.jpg" class="image">
          <div style="padding: 10px;" class="divs">
            <div class="roomspan"><span >房间编号：{{roomList[index].roomid}}</span></div>
            <div class="roomprice"><span>价格：{{roomList[index].roomprice}}元</span></div>
            <!--订单弹出框-->
            <el-button type="text" @click="dialogVisible = true">点击下单</el-button>
            <el-dialog
              center="true"
              title="请确认你的订单信息"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <div class="h3Class">
                <h3>房间编号：{{roomList[index].roomid}}</h3>
                <h3>价格：{{roomList[index].roomprice}}元</h3>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定下单</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>

    <!--分页栏-->
    <div class="block">
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageh"
        :page-sizes="[4, 8, 12, 16, 24, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalh">
      </el-pagination>
    </div>
  </div>

</template>

<script>

  import {request} from "../../network/request";
  import CScroll from 'better-scroll'


  export default {
    name: "hotel-mall",
    data() {
      return {
        roomList: [],
        //设置滚动的；改
        scroll: null,

        //我应该定义为一个对象的；这样就不用一个个赋值；有时候
        pageh: 1,
        //怎么动态绑定一页显示的条数？[4,8,12,16,24],还有你要注意的是在page或rows改变时都需要重新发送请求的
        //你请求写在created里面了；怎么样在页码参数改变的时候重新发送请求？？
        rowsh: 4,
        sortByh: 'roomprice',
        desch: false,
        totalh: 0,

        input: '', //搜索框,
        //订单弹出框
        dialogVisible: false
      };
    },
    // present request GET  api路径前面必须有斜杠    拿到数组的对象的话，就要通过索引来拿数据？
    created(){
      this.sendRequest();
    },
    methods: {
      sendRequest(){
        request({
          // url: '/api/item/room/showAllRoomMessage?page=1&rows=12&sortBy=roomprice&desc=false',
          url: '/api/item/room/showAllRoomMessage',
          params: {
            page: this.pageh,
            rows: this.rowsh,
            sortBy: this.sortByh,
            desc: this.desch
          }
        }).then(res => {
          this.roomList = res.data.items;
        console.log(res.data.items);
        console.log(res.data.total); //没有items那级别
        console.log(res);
        this.totalh = res.data.total;
        console.log('有多少条记录：',this.totalh);
      }).catch(err => {
          console.log(err);
      })
      },

      //设置分页条的（在分页参数改变的时候重新发送请求重新获取分页后的数据；
      // 就是你选第几页的时候会触发一些方法；传递val参数进来；然后再从新发送请求）
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.rowsh = val;
        this.pageh = 1; //每页显示条数改变后；我想重置为默认显示第一页；可以写死？？？？？？？？？？？？
        console.log('rows',this.rowsh);
        this.sendRequest();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageh = val;
        console.log('page',this.pageh);
        this.sendRequest();
      },
      //订单弹出框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
          done();
      })
      .catch(_ => {});
      }

    },
    mounted(){
      thid.scroll = new CScroll(document.querySelector('.wrapper'), {

      })
    }
  }
</script>

<style lang="less" scoped>

  .el-col {
    margin-left: 0px;
  }
  .el-row {
    padding-right: 1px;
    padding-left: 55px;
  }
  /*显示太多的话；装不下浏览器自带自带滑动拉条
  是整体上去；很难看；自己搞一个*/
  .el-card {
    width: 250px;
    height: 320px;
    /*padding-left: 10px;*/
  }
  .col {
    width: 300px;
    height: 350px;
  }
  .roomspan {
    height: 25px;
  }
  .roomprice {
    height: 25px;
  }

  .huadong {
    height: 20%;
    /*width: 100%;*/
    overflow: hidden;
    overflow-y: scroll;
  }



  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 95%;
    height: 180px;
    padding: 5px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  //如何固定分页栏？在数据很少的时候不会自动缩上去；让其一直在底部
  /*.block {*/
    /*position: center;*/
  /*}*/

  /*订单弹出框的样式*/
  .h3Class {
    padding-left: 50px;
  }
</style>
