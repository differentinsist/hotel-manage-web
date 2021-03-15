<template>
  <div>
    <!--这里使用原生的做一个-->
    <div class="inputSearch">
      <input type="text" id="inputh" placeholder="输入品牌查询">
      <el-button icon="el-icon-search" circle @click="getInputValue"></el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'goodsid', order: 'ascending'}">
      <el-table-column prop="goodsid" label="商品编号" sortable width="100"></el-table-column>
      <el-table-column prop="goodsbrand" label="品牌" sortable width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goodsprice" label="商品价格(元)" sortable width="180"></el-table-column>
      <el-table-column prop="goodsstock" label="库存" sortable width="80"></el-table-column>
      <el-table-column prop="goodsdiscription" label="描述" width="200"></el-table-column>
      <el-table-column prop="goodspicture" label="图片" width="180"></el-table-column>
    </el-table>

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
        //商品数据
        tableData: [],
        //发送get请求的参数；也就是分页参数
        keyh: '',
        pageh: 1,  //显示第几页
        rowsh: 10,  //一页有多少数据
        sortByh: '',
        desch: false,
        totalh: '',
        //搜索框
        input: ''


      }
    },
    created() {
      //发送请求的方法体抽取到methods里面去了；这样在其他方法里面可以调用；在分页参数改变时实现重新拿取数据
      this.sendRequest();
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
          console.log(res);
        this.tableData = res.data.items;
        }).catch(err => {
          console.log(err);
        })
      },
      //输入框触发的函数
      getInputValue(){
        this.keyh = document.getElementById('inputh').value;
        console.log('key:',this.keyh);
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
      }
    }
  }
</script>

<style lang="less" scoped>

  .inputSearch {
    /*width: 50px;*/
  }

  #inputh {
    width: 250px;
    height: 30px;
  }

</style>
