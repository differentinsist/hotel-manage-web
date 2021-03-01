<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="房间号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="房间价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "hotel-mall"
    }
</script>

<style scoped>

</style>
