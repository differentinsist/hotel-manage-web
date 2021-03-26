<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的房间</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <span>我的房间信息：</span>
      <table>
        <tr>
          <td>房间号</td>
          <td>{{roomObject.roomid}}</td>
        </tr>
        <tr>
          <td>时长</td>
          <td>{{roomObject.roomtime}}</td>
        </tr>
        <tr>
          <td>开门密码</td>
          <td><span class="testcolor">{{roompasswd}}</span></td>
        </tr>
        <tr>
          <td>价格</td>
          <td>{{roomObject.roomprice}}元</td>
        </tr>
      </table>
    </el-card>
    <span>应该实现已被预订的房或正在被使用的房不显示在商店或者变成灰色,或者显示倒计时在按钮那里,然后按钮禁用</span>



  </div>
</template>

<script>

  export default {
    name: "my-room",
    data(){
      return {
        //订房基本数据
        roomObject:{
          roomid: '无',
          roomprice: '0',
          roomtime: '无',
        }
      }
    },
    mounted(){
      // this.roomObject = this.$route.params.roomvalue;
      // console.log('---',this.roomObject);
    },
    //计算属性非常方便实现一个属性的变化，可以加上判断。
    computed: {
      roompasswd: function(){
        console.log('生效了吗');
        if(sessionStorage.getItem('obj') == null){
          return '无';
        }
        let pass = Math.random()*10000; //使用这种方法生成一个随机数作为房门密码
        let passwd = Math.floor(pass);
        return passwd;
      }
    },
    //我从sessionStorage里面拿值；代码应该写在created里面还是写在mounted中好呢？？？
    created(){
      let getStr = sessionStorage.getItem('obj'); //通过键obj获取sessionStorage里面的值(这个值还是String类型)(本来是对象类型的)
      let getObj = JSON.parse(getStr);//把String类型转换为对象类型
      if(getObj != null){

        this.roomObject = getObj;//再把对象赋值给本VUE组件的的data的对象
      }
      console.log('看看是否拿到roomObject',this.roomObject);
    }

  }
</script>

<style lang="less" scoped>


  .mbx {
    padding-bottom: 20px;
  }

  .box-card {
    padding: 0px;
    width: 100%;
    height: 300px;
  }

  //表格的样式
  table {
    border: 2px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
  }
  th, td {
    padding: 15px 100px;
    border: 1px solid #e9e9e9;
    text-align: right;
  }
  th {
    background-color: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
  }

  //文字样式
  .testcolor {
    font-weight: bold;
    color: forestgreen;
  }


</style>
