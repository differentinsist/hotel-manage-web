<template>
  <div>
    <table>
      <tr>
        <td>房间编号:</td><td>{{roomObject.roomid}}</td>
        <td>开门密码:</td><td>暂时1111</td>
      </tr>
      <tr>
        <td>房间时常:</td><td>{{roomObject.roomtime}}</td>
        <td>房间价格:</td><td>{{roomObject.roomprice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: "my-room",
    data(){
      return {
        roomObject:{

        }
      }
    },
    mounted(){
      // this.roomObject = this.$route.params.roomvalue;
      // console.log('---',this.roomObject);
    },
    //我从sessionStorage里面拿值；代码应该写在created里面还是写在mounted中好呢？？？
    created(){
      let getStr = sessionStorage.getItem('obj'); //通过键obj获取sessionStorage里面的值(这个值还是String类型)(本来是对象类型的)
      let getObj = JSON.parse(getStr);//把String类型转换为对象类型
      this.roomObject = getObj;//再把对象赋值给本VUE组件的的data的对象
      console.log('看看是否拿到roomObject',this.roomObject);
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
