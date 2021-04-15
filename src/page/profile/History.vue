<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>本人业务</el-breadcrumb-item>
      <el-breadcrumb-item>历史记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-input >输入框</el-input>

    <!--测试显示和隐藏与切换  可删 <h1>还没有实现呢</h1>-->
    <!--<el-button @click="changeStatus">改变值</el-button>-->
    <!--<div>-->
      <!--<el-button v-if="status">下单按钮</el-button>-->
      <!--<el-button v-else>倒计时按钮</el-button>-->
    <!--</div>-->

    <el-card>
      <h1>我的住房历史记录</h1>
      <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'createtime', order: 'descending'}">
        <el-table-column prop="createtime" label="下单时间" sortable width="280"></el-table-column>
        <el-table-column prop="roomid" label="房间号"  width="180"></el-table-column>
        <el-table-column prop="roomprice" label="价格(元)" ></el-table-column>
        <el-table-column prop="roomtime" label="时长" ></el-table-column>
        <!--<el-table-column prop="roomtime" label="时长" :formatter="formatter"></el-table-column>-->
      </el-table>
    </el-card>





  </div>
</template>

<script>

  import {request} from '../../network/request.js'

  export default {
    name: "history",
    data(){
      return{
        status: true,

        //列表展示数据，不定义成员也行，只要名字和后台也要就行？
        tableData: [
          // {createtime: '', roomid: '', roomprice: '', roomtime: ''}
        ]
      }
    },
    created(){

      this.sendRequestQueryHistoryByUserId();

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath');
      //这里也要写从Vuex中获取对象，不然页面刷新就会有问题,获取到的userObj会是空的。
      this.$store.commit('getUserObject');
    },
    methods: {
      // changeStatus(){
      //   this.status = !this.status;
      // }

      //用来格式化表格内容样式？???
      formatter(row, column) {
        return row.roomid;
      },

      sendRequestQueryHistoryByUserId(){
        request({
          url: '/item/room/queryRoomHistoryByUserId',
          params: {
            userid: this.$store.state.userObj.userid
          }
        }).then((res) => {
          console.log('打印userid看看:',this.$store.state.userObj.userid);
          console.log('历史对象:',res);
          this.tableData = res.data;
        }).catch(() => {
          console.log('出错怎么处理');
        })
      }


    }
  }
</script>

<style scoped>

</style>
