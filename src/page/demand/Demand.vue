<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>需求建议</el-breadcrumb-item>
      <el-breadcrumb-item>需求详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--输入框部分-->
      <el-input
        :clearable="clearable"
        type="textarea"
        :rows="2"
        placeholder="请输入你的需求或建议"
        v-model="textarea">
      </el-input>
      <!--几个按钮-->
      <el-button type="primary" @click="submitDemand" round>点击提交建议</el-button>
      <div class="listBtn">
        <el-button type="success" @click="queryMyDemand">我提的建议</el-button>
        <el-button type="danger" @click="queryAllDemand">全部的建议</el-button>
      </div>


      <!--数据表格-->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="400"
        :row-class-name="tableRowClassName">
        <el-table-column prop="demand" label="用户的需求" width="900"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
      </el-table>


      <!--分页栏-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="baseAllData.page"
          :page-sizes="[6, 12, 16, 24, 50]"

          layout="total, sizes, prev, pager, next, jumper"
          :total="totalA">
          <!--:page-size="100" 不要这个也行？-->
        </el-pagination>
      </div>


    </el-card>






  </div>
</template>

<script>

  import {request} from "../../network/request";

  export default {
    name: "demand",
    data(){
      return{
        //是否可清空输入框
        clearable: true,
        //输入的文本保存到这里
        textarea: '',
        //表格的数据
        tableData: [],
        baseAllData: {
          status: 1,
          page: 1,
          rows: 6,  //没页显示多少条
          sortBy: 'createtime',
          desc: true
        },
        //总共有多少页
        totalA: 11,

        //保存的数据
        ddname: '匿名用户',
        dstatus: 1,

        //用户对象(保存在sessionStorage中的东西不安全)
        userObj: {
          id: '',
          name: '',
          idcard: '',
          birthday: '',
          address: '',
          phone: '',
          createdtime: '',
          personpicture: ''
        },
        //单独拿出名字来
        userid: null ,
        clearable: false

      }
    },
    created(){
      //初始化就拿到用户对象赋值
      let getStr = window.sessionStorage.getItem("personobj");
      let getObj = JSON.parse(getStr);
      this.userObj = getObj;
      console.log('打印user对象',this.userObj);

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath')

      // this.name = this.userObj.name;
      this.sendRequestFindAllDemand();
    },
    methods: {
      //点击按钮保存建议，并展示到列表中最前面
      submitDemand(){
        this.name = this.userObj.name;
        this.sendRequestSaveDemand();
      },

      //请求所有的用户需求 / 或者请求当前用户的需求
      sendRequestFindAllDemand(){
        request({
          // url: 'api/item/demand/queryAllUserDemand',
          url: '/item/demand/queryAllUserDemand',
          params: {
            status: this.baseAllData.status,
            page: this.baseAllData.page,
            rows: this.baseAllData.rows,
            sortBy: this.baseAllData.sortBy,
            userid: this.userid,
            desc: this.baseAllData.desc
          }
        }).then((res) => {
          this.tableData = res.data.items;
          this.totalA = res.data.total;
          console.log('获取所有的用户需求成功了res=',res);
        }).catch((err) => {
          console.log('获取数据失败;可能是请求参数不合理；应该怎么处理',err);
        })
      },
      //发送请求，保存用户提出需求建议
      sendRequestSaveDemand(){
        request({
          url: '/item/demand/saveUserDemand',
          params: {
            userid: this.userObj.id,
            dname: this.userObj.name,
            demand: this.textarea,
            status: this.dstatus
          }
        }).then((res) => {
          console.log('保存数据后返回来的数据',res);
          //保存成功后再获取所有的需求数据-----写在这里不会有问题吧
          this.sendRequestFindAllDemand();
        }).catch((err) => {
          console.log('保存失败怎么处理',err)
          return this.$message.error("哎呀！没有数据");
        })
      },


      // 分页
      handleSizeChange(val) {
        console.log(`每页显示多少条打印了吗== ${val} 条`);
        this.baseAllData.rows = val;
        this.baseAllData.page = 1; //每页显示条数改变后；我想重置为默认显示第一页；可以写死？？？？？？？？？？？？
        this.sendRequestFindAllDemand();

      },
      handleCurrentChange(val) {
        console.log(`当前显示第几页打印了吗===: ${val}`);
        this.baseAllData.page = val;
        this.sendRequestFindAllDemand();
      },



      // 表格的颜色？？？？？？？？？？？？没起作用
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },


      //查询所有用户需求
      queryAllDemand(){
        this.userid = null,
        // this.name = '',
        this.baseAllData.page = 1;
        console.log('查询所有的需求-----------')
        this.sendRequestFindAllDemand();
      },
      //查询我自己的需求
      queryMyDemand(){
        console.log('查询我自己的需求');
        this.baseAllData.page = 1;
        this.userid = this.userObj.id;
        this.sendRequestFindAllDemand();
      }

    }
  }
</script>

<style lang="less" scoped>

  .el-card {
    margin-top: 15px;
  }

  /*表头外面两个按钮的样式*/
  .listBtn {
    display: flex;
    justify-content: space-between;
    padding-left: 30%;
    padding-right: 30%;
  }

  /*表格的样式*/
  .el-table .warning-row {
    /*background: oldlace;*/
    background: forestgreen;
  }
  .el-table .success-row {
    background: bisque;
    /*background: #f0f9eb;*/
  }

</style>
