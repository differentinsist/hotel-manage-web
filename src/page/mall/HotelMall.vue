<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>旅店详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!--级联选择器-->
    <div class="casca">
      <el-cascader
        placeholder="根据价格或房间号筛选"
        :props="cascaderProps"
        v-model="values"
        :options="options1"
        @change="handleChange"
        @clear="dd"
        clearable></el-cascader>
    </div>


    <el-row class="huadong">
      <el-col :span="8" v-for="(o, index) in roomList" :key="o" :offset="index > 0 ? index : 0" class="col">
        <div class="wrapper">
          <el-card class="minCard" :body-style="{ padding: '0px' }">
            <img :src="roomList[index].roompicture" class="image">
            <div style="padding: 10px;" class="divs">
              <div class="roomspan"><span >房间编号：{{roomList[index].roomid}}</span></div>
              <div class="roomprice"><span>价格：{{roomList[index].roomprice}}元</span></div>
              <!--订单弹出框的按钮，弹出框别放在循环里面，低级写法，放在外面了；-->
              <!--<el-button type="text" @click="dialogVisible = true">点击下单</el-button>-->
              <!--订单弹出框的按钮，弹出框别放在循环里面，低级写法，放在外面了；把当前对象传递进去o，就是当前房间的信息了-->
              <div class="btnClassA">
                <el-button  type="primary" @click="sendMsgToDialog(o)" round>点击下单</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>



      <!--弹出框放在这里了，别放上面的循环里-->
      <el-dialog
        title="请确认你的订单信息"
        :visible.sync="dialogVisible"
        :center="true"
        width="30%"
                                       >
        <!--:before-close="handleClose">-->
        <div class="h3Class">
          <!--这里拿不到对应的值-->
          <h3>房间编号：{{dialogData.roomid}}</h3>
          <h3>价格：{{dialogData.roomprice}}元</h3>
          <h3>时长：{{dialogData.roomtime}}</h3>
          <h3>提示：下单成功会生成一个房间密码用来开门</h3>
          <h3>现在这个状态一个人只能定一间</h3>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <!--<el-button type="primary" @click="dialogVisible = false">确定下单</el-button>-->
          <el-button type="primary"  @click="jumpToMyRoom()" >确定下单</el-button>
        </span>
      </el-dialog>

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
  import CScroll from 'better-scroll';



  export default {
    name: "hotel-mall",
    data() {
      return {
        //这个数组必须要有的，用来装选中的条目(级联选择器相关)
        values: [],
        //级联选择器的数据源
        options1: [
          {
            value: 'jiage', label: '价格', children: [
              {value: 'jiageshengxu', label: '价格从高到底'},
              {value: 'jiagejiangxu', label: '价格从低到高'}
            ]
          },
          {
            value: 'fangjianhao', label: '房间号', children: [
              {value: 'fjdadaoxiao', label: '房间编号降序'},
              {value: 'fjxiaodaoda', label: '房间编号升序'}
            ]
          }
        ],
        //（级联选择器相关）用来指定显示哪个值
        cascaderProps: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        roomList: [],
        //设置滚动的；改
        scroll: null,

        //我应该定义为一个对象的；这样就不用一个个赋值；有时候
        pageh: 1,
        //怎么动态绑定一页显示的条数？[4,8,12,16,24],还有你要注意的是在page或rows改变时都需要重新发送请求的
        //你请求写在created里面了；怎么样在页码参数改变的时候重新发送请求？？
        rowsh: 4,
        totalh: 0,
        // 排序属性
        sortAndDesc: {
          sortBy: '',
          desc: ''
        },
        input: '', //搜索框,
        //订单弹出框（控制对话框的显示和隐藏）
        dialogVisible: false,

        //拿到弹窗数据用来赋值，就是在按钮哪里写一个方法；把对象传递进去，拿到当前的值就是当前房间
        dialogData: {
          roomid: '',
          roomprice: '',
          roomtime: ''
        }


      };
    },

    // present request GET  api路径前面必须有斜杠    拿到数组的对象的话，就要通过索引来拿数据？
    created(){
      this.sendRequest();

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单 (这个首页组件需要吗)
      //因为我在Vuex状态管理那里设置了activePath的初始值，如果这里本组件初始化的时候，也从status.js里面
      //获取值，将会是空的，因为status也是从sessionStorage中获取值，刚开始sessionStorage中是为null的
      // this.$store.commit('changeActivePath');  但是可以这样写：在点回来本hotelmall组件的时候可以高亮
      // if(window.sessionStorage.getItem('activePath') != null){
        if(this.$store.state.activePath != '/hotelmall'){
          this.$store.commit('getHotelmallActivePath');//就是这样改，调用写法的函数
        }
        //我直接改变Vuex的status里面的值,他有个方法来修改；而不是直接改
        // this.$store.commit('getHotelmallActivePath');//就是这样改，调用写法的函数
      // }
    },
    methods: {
      //发送请求的代码抽取到这里
      sendRequest(){
        request({
          // url: '/api/item/room/showAllRoomMessage?page=1&rows=12&sortBy=roomprice&desc=false',
          // url: '/api/item/room/showAllRoomMessage',
          url: '/item/room/showAllRoomMessage',
          params: {
            page: this.pageh,
            rows: this.rowsh,
            sortBy: this.sortAndDesc.sortBy,
            desc: this.sortAndDesc.desc
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
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      // })
      // .catch(_ => {});
      // },

      //拿到当前房间的数据到弹出对话框中显示
      sendMsgToDialog(itemDialog){
        this.dialogVisible = true; //意思是点击的时候改变为true就是运行弹出对话框;
        this.dialogData.roomid = itemDialog.roomid;
        this.dialogData.roomprice = itemDialog.roomprice;
        this.dialogData.roomtime = itemDialog.roomtime;
      },

      //跳转到我的订单页面；显示订房信息和开房门的密码（这是通过路由传递值的方式；不好；页面刷新就没了）
      // jumpToMyRoom(){
      //   this.dialogVisible = false; //设置为false就是让弹出框隐藏;
      //   this.$router.replace({name:'/myroom', params:{roomvalue: this.dialogData}});
      // }

      //跳转到我的订单页面；显示订房信息和开房门的密码
      //思路就是获取到当前按钮房间的信息，然后把信息存储在sessionStorage中；好像sessionStorage中只能
      // 存储String类型；对象的话就要通过转换JSON.stringify()来转换。
      //注意：最开始我是通过路由带参数的方式把值传递过去没使用存储在sessionStorage中；但是路由带参数的方式在
      //页面刷新或者点其他页面再点回来就没有值了；因为页面初始化就没有值了；你不是从按钮点跳转过来的话；实际保存在redis中最好
      jumpToMyRoom(){
        this.dialogVisible = false; //设置为false就是让弹出框隐藏;
        // sessionStorage.setItem('roomkey',this.dialogData);//不能直接存储对象
        let str = JSON.stringify(this.dialogData);
        let sessionObject = window.sessionStorage;
        sessionObject.obj = str; //保存到sessionStorage中这样在另一个页面中就可以从sessionStorage中那值了（obj就是key了对吧）
        // let getStr = sessionStorage.obj;  //获取值(这个是值是字符串[本来是对象的])；在另一个vue页面写
        // let getOb = JSON.parse(getStr);   //把字符串转为对象;也是在另一个页面写的
        console.log('看看sessionStorage：',sessionStorage.getItem('obj')); //obj就相当于对象的键了；可以获取值了
        console.log('看看sessionStorage：',sessionObject); //整个sessionStorage里面的东西

        //实现菜单栏高亮(就是保存菜单的路径在sessionStorage里面；然后此路径的菜单就会高亮)
        window.sessionStorage.setItem('activePath','/myroom');
        // this.$store.commit('changeActivePath')不用在这里写；因为我在myroom组件的created里面写了

        this.$router.replace('/myroom');
      },

      // 级联选择器会触发的方法(默认传递进来的是一个选择值的数组进来)  ["jiage", "jiageshengxu"]
      handleChange(value){
        console.log('级联选择器触发了吗,传递进来的参数是什么value',value);
        if(value[0] == 'jiage'){
          if (value[1] == 'jiageshengxu'){  //价格升序
            this.sortAndDesc.sortBy = 'roomprice',
            this.sortAndDesc.desc = 'true',
            console.log('价格升序',value[1]);
            this.sendRequest();
          }else if (value[1] == 'jiagejiangxu'){  //价格降序
            this.sortAndDesc.sortBy = 'roomprice',
            this.sortAndDesc.desc = 'false';
            console.log('价格降序',value[1]);
            this.sendRequest();
          }
        }else if (value[0] == 'fangjianhao'){
          if (value[1] == 'fjdadaoxiao'){  //房间号降序
            this.sortAndDesc.sortBy = 'roomid';
            this.sortAndDesc.desc = 'true';
            console.log('房间号降序',value[1]);
            this.sendRequest();
          }else if (value[1] == 'fjxiaodaoda'){ //房间号升序
            this.sortAndDesc.sortBy = 'roomid';
            this.sortAndDesc.desc = 'false';
            console.log('房间号升序',value[1]);
            this.sendRequest();
          }
        }
      },

      dd(){
        console.log('-------------')
      }

    },
    mounted(){
      this.scroll = new CScroll(document.querySelector('.wrapper'), {

      })
    }
  }
</script>

<style lang="less" scoped>

  .btnClassA {
    padding-left: 0%;
  }

  //级联选择器
  .el-cascader {
    /*width: 100%;*/
    /*background-color: aquamarine;*/
  }

  /*级联选择器*/
  .casca {
    padding-top: 6px;
    padding-left: 55px;
    /*background-color: aquamarine;*/
  }

  /*卡片*/
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
    /*width: 250px;*/
    /*height: 320px;*/
    /*padding-left: 10px;*/
  }
  //代替上面原生的el-card
  .minCard {
    width: 250px;
    height: 320px;
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
    padding-top: 15px;
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

  /*房间图片的样式*/
  .image {
    width: 95%;
    height: 190px;
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
