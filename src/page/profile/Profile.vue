<template>
  <div class="persontable">
    <table>
      <tr>
        <td>名字:</td><td>{{person.name}}</td>
        <td>地址:</td><td>{{person.adress}}</td>
      </tr>
      <tr>
        <td>我的ID编号:</td><td>{{person.pid}}</td>
        <td>电话:</td><td>{{person.phone}}</td>
      </tr>
      <tr>
        <td>身份证:</td><td>{{person.idcard}}</td>
      </tr>
    </table>
    <div>
      <span>头像</span>
      <img src="../../assets/touxiang.png" alt="">
    </div>
  </div>
</template>

<script>

  import {request} from "../../network/request";

  export default {
    name: "profile",
    data(){
      return{
        person: ''
      }
    },
    created() {
      request({
        url: '/api/item/person/queryPersonByPid?pid=000001'
      }).then(res => {
        this.person = res.data;
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    }
  }
</script>

<style lang="less" scoped>

  .persontable {
    display: flex;
    justify-content: space-between;
    /*justify-content: center;*/
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      img {
        /*padding-left: 5px;*/
        width: 150px;
        height: 150px;
        border-radius: 20%;
      }
      span {
        padding-right: 5px;
      }
    }
  }

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
