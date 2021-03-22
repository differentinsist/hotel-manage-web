<template>
  <div class="login_container">
    <!--最外层登陆的盒子div-->
    <div class="login_box">
      <!--放置图片的div-->
      <div class="touxiangclass">
        <img src="../assets/touxiang.png" alt="">
      </div>
      <!--from表单区域；也就是登陆用户名密码那些，是一个表单-->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules" label-width="100px" >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="出生日期:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像:" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">注册</el-button>
          <el-button type="info" class="rightButton" @click="resetLoginForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {request} from "../network/request";

  export default {
    name: "register",
    data(){
      return {
        //输入框写入的数据会绑定到这个对象，可以拿到用于发送请求
        loginForm: {
          username: '',
          password: ''
        },
        //定义表单验证的规则
        loginFormRules: {
          //验证用户名
          username: [
            {required: true, message: "亲，输入用户名", trigger: "blur"},
            {min:3, max:10, message:"长度在3~10个字符之间", trigger:"blur"}
          ],
          //验证密码是否合法
          password: [
            {required: true, message: "亲，输入密码", trigger: "blur"},
            {min:6, max:15, message:"长度在6~15个字符之间", trigger:"blur"}
          ]
        }
      }
    },
    //vue发送post请求有个坑，后端无法识别参数；要一种转换对吗？
    computed: {
      getUser: function () {
        let canshu = new URLSearchParams()
        canshu.append('username', this.loginForm.username)
        canshu.append('password', this.loginForm.password)
        return canshu
      }
    },
    methods:{
      //发送登陆请求的方法，抽取在这里了
      sendLoginRequest(){
        request({
          url: '/api/user/person/query',
          method: 'post',
          // data:this.loginForm
          data: this.getUser
        }).then((res) => {
          console.log('用户基本信息',res);
          //成功的话就跳转到主页；是在这里写吗？then里面是发送成功还是获取到数据成功？搞清楚
          this.$router.replace('/hotelmall');
        }).catch((err) => {
          console.log('输出错误信息就行了吗',err);  //如果报错了都是打印结果，不做其他处理吗
          this.$router.replace('/hotelmall');  //改----------------
        })
      },
      resetLoginForm(){
        console.log(this);//这个this就是整个组件，然后里面有refs对象，然后我们定义的表单对象在refs里面
        this.$refs.loginFormRef.resetFields();
      },
      //点击登陆按钮发送登陆请求
      login(){
        this.$refs.loginFormRef.validate(valid => {
          // console.log(valid);
          console.log('点击了登陆按钮');
          //if(!valid) return; //如果数据验证不通过，就不发送请求
          if(valid) return; //改----------------
          this.sendLoginRequest();
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  /*设置最外面的div的也是和背景色；背景色可以替换为图片吗？？？*/
  .login_container {
    background-color: #2b4b6d;
    height: 100%;
  }
  /*设置那个登陆框的颜色*/
  .login_box {
    width: 500px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;        //登陆div区域的圆角
    position: absolute;  //相对位置
    left: 50%;           //左边相对百分之五十
    top: 50%;            //顶部也是百分之五十
    transform: translate(-50%,-50%); //再设置这个就完全居中了
    .touxiangclass {  //设置头像区域的div样式
      height: 80px;
      width: 80px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  //登陆表单样式设置，也就是用户名密码按钮那个区域
  .login_form {
    position: absolute;
    bottom: 0; //意思是距离底部为0
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

  }
  //按钮区域
  .btns {
    display: flex;
    justify-content: space-between;
    /*.rightButton {*/
    /*left: 10px;*/
    /*}*/
  }


</style>
