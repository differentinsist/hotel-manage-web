<template>

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

</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "shop",
    data(){
      return {
        tableData: []
      }
    },
    created() {
      request({
        url: '/api/item/goods/showAllGoods?key=H&page=1&rows=8&sortBy=goodsprice&desc=true'
      }).then(res => {
        console.log(res);
        this.tableData = res.data.items;
      }).catch(err => {
          console.log(err);
      })
    }
  }
</script>

<style scoped>

</style>
