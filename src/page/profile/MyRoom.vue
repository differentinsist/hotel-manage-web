<template>
  <div>
    <table>
      <tr>
        <td>房间编号:</td><td>{{}}</td>
        <td>房间时常:</td><td>{{}}</td>
      </tr>
      <tr>
        <td>房间价格:</td><td>{{}}</td>
        <td>开门密码:</td><td>{{}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: "my-room",
    data(){
      return {

      }
    }
  }
</script>

<style lang="less" scoped>

  table {
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,td {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
    height: 70px;
  }

  th {
    background-color: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
  }

</style>
