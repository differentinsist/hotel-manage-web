<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>旅店商城</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="cardClass">
      <!--搜索框-->
      <el-input placeholder="输入品牌或关键字查询" v-model="setinputValue" class="inputSearch">
        <el-button slot="append" class="btnClass" icon="el-icon-search" @click="searchByInput"></el-button>
      </el-input>
      <!--表格-->
      <el-table
        :data="tableData"
        :default-sort = "{prop: 'goodsid', order: 'ascending'} ">
        <el-table-column prop="goodsid" label="商品编号" sortable width="100"></el-table-column>
        <el-table-column prop="goodsbrand" label="品牌" sortable width="80"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="goodsprice" label="商品价格(元)" sortable width="180"></el-table-column>
        <el-table-column prop="goodsstock" label="库存" sortable width="80"></el-table-column>
        <el-table-column prop="goodsdiscription" label="描述" width="200"></el-table-column>
        <el-table-column prop="goodspicture" label="图片" width="180">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.goodspicture"></el-image>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="180">
          <template slot-scope="scope" >
            <el-button type="primary" @click="buyShop(scope.row)" round>点击购买</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!--对话框-->
    <el-dialog
      class="buyDialog"
      title="购买确认"
      width="40%"
      :visible.sync="dialogVisible"
                                     >
      <!--:before-close="handleClose">-->
      <div class="dialogContent">
        <!--弹出框左边-->
        <table>
          <tr><td>品牌：</td><td>{{dialogButtonData.goodsbrand}}</td></tr>
          <tr><td>商品名称：</td><td>{{dialogButtonData.goodsname}}</td></tr>
          <tr><td>单价：</td><td>{{dialogButtonData.goodsprice}}元</td></tr>
          <tr><td>库存：</td><td>{{dialogButtonData.goodsstock}}</td></tr>
        </table>
        <!--弹出框右边的图片-->
        <el-image
          style="width: 230px; height: 250px"
          :src="dialogButtonData.goodspicture"
                                         >
          <!--:preview-src-list="srcList">-->
        </el-image>
      </div>

      <!--下方按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="routerCart(this.dialogButtonData)">确 定</el-button>-->
        <el-button type="primary" v-model="dialogButtonData" @click="routerCart(dialogButtonData)">添加到购物车</el-button>
      </span>
    </el-dialog>



    <!--分页栏-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageh"
        :page-sizes="[10, 15, 20, 40,50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalh">
      </el-pagination>
    </div>



  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "shop",
    data(){
      return {
        //点击按钮获取到的对象数据(对话框)
        dialogButtonData: {
          gid: '',
          goodsbrand: '',
          goodsid: '',
          goodsname: '',
          goodsprice: '',
          goodsstock: '',
          goodspicture: '',
          goodsdiscription: ''
        },
        // 图片路径
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //是否显示对话框
        dialogVisible: false,

        //商品数据
        tableData: [],
        //发送get请求的参数；也就是分页参数
        keyh: '',
        pageh: 1,  //显示第几页
        rowsh: 10,  //一页有多少数据
        sortByh: '',
        desch: false,
        totalh: '',
        //搜索框值的绑定
        setinputValue: ''


      }
    },
    created() {
      //发送请求的方法体抽取到methods里面去了；这样在其他方法里面可以调用；在分页参数改变时实现重新拿取数据
      this.sendRequest();

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath');
    },
    methods: {
      //发送请求的方法在抽取在这里了；调用直接写this.sendRequest();
      sendRequest() {
        request({
          // url: '/api/item/goods/showAllGoods?key=H&page=1&rows=8&sortBy=goodsprice&desc=true',
          url: '/api/item/goods/showAllGoods',
          params: {
            key: this.keyh,
            page: this.pageh,
            rows: this.rowsh,
            sortBy: this.sortByh,
            desc: this.desch
          }
        }).then(res => {
          this.totalh = res.data.total;
          this.tableData = res.data.items;
          console.log(res);
        this.tableData = res.data.items;
        }).catch(err => {
          console.log('响应失败会到这里面',err);
        //用户乱搜索的时候；也就是请求参数错误，报400，但是后端不会报错的对吧；400的话，我就给他提示得了
          this.$message.success("不好意思，找不到你要的内容");
        })
      },
      //点击搜索按钮。输入框触发的函数
      searchByInput(){
        // this.keyh = document.getElementById('inputh').value;
        this.keyh = this.setinputValue;
        console.log('点击了搜索按钮(品牌帅选)key:',this.keyh);
        //然后就发送请求获取数据
        this.sendRequest();
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

      //购买商品的按钮
      buyShop(value){
        console.log('点击了购买按钮',value);
        this.dialogVisible = true; //打开对话框
        this.dialogButtonData = value;
      },

      //点击确定购买的按钮跳转到购物车页面（）
      routerCart(obj){
        this.dialogVisible = false;
        console.log('商品对象传递进来没-这拿到也没有用,因为我要跳转到另一个页面了,作用域不同了-',obj);
        //所以我还是暂时保存在sessionStorage中；其实保存在redis中才是正确的选择
        let getStr = JSON.stringify(obj)
        window.sessionStorage.setItem('dialogButtonData',getStr);

        //设置一下sessionStorage中的路径，好实现点击按钮跳转后还能实现路由到的页面也高亮
        window.sessionStorage.setItem('activePath','/cart');
        this.$router.replace('/cart');
      }
    }
  }
</script>

<style lang="less" scoped>

  .el-table {
    width: 100%;
    padding-top: 5px;
  }

  .el-table-column {
    height: 150px;
  }

  /*搜索框的长度*/
  .inputSearch {
    /*padding-top: 0px;*/
    width: 400px;
  }

  .cardClass {

  }

  .el-breadcrumb {
    padding-bottom: 7px;
  }

  /*对话框的样式*/
  .dialogContent {
    display: flex;
    justify-content: center;
    .el-image {
      padding-left: 20px;
    }
    .tabel {
      padding: 0;
    }
  }
  /*对话框里面表格和图片的布局*/
  /*.el-dialog__body {*/
    /*padding: 10px;*/
    /*color: #606266;*/
    /*font-size: 14px;*/
    /*word-break: break-all;*/
  /*}*/

  /*表格的样式*/
  table {
    border: 2px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
  }
  th, td {
    padding: 10px 50px;
    border: 1px solid #e9e9e9;
    text-align: right;
  }
  th {
    background-color: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
  }


</style>
