<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>本人业务</el-breadcrumb-item>
      <el-breadcrumb-item>我的基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="persontable">
      <table>
        <tr>
          <td>名字:</td><td>{{personOBJ.name}}</td>
          <td>地址:</td><td>{{personOBJ.address}}</td>
        </tr>
        <tr>
          <td>我的ID编号:</td><td>{{personOBJ.id}}</td>
          <td>电话:</td><td>{{personOBJ.phone}}</td>
        </tr>
        <tr>
          <td>身份证:</td><td>{{personOBJ.idcard}}</td>
          <td>注册时间:</td><td>{{personOBJ.createdtime}}</td>
        </tr>
      </table>
      <!--<div>-->
      <!--<button>替换头像</button>-->
      <!--<img src="../../assets/touxiang.png" alt="">-->
      <!--</div>-->
      <el-upload class="avatar-uploader"
                 :action="uploadURL"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
        <img v-if="imageURL" :src="imageURL" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>

</template>

<script>

  import {request} from "../../network/request";

  export default {
    name: "profile",
    data(){
      return{
        //默认图片路径（图片属性我单独抽取出来了，因为我把头像单独保存在sessionStorage中，这样方便更新）
        imageURL: 'http://image.renthotel.com/hotelhappyimages/2/0/01xixuegui.jpg',
        //图片上传到服务器的地址
        uploadURL: 'http://api.renthotel.com/upload/headPortrait',
        //设置允许的图片类型
        canPicture: ['image/jpeg','image/png'],
        //当前用户对象
        personOBJ: {
          id: '',
          name: '',
          idcard: '',
          birthday: '',
          address: '',
          phone: '',
          createdtime: ''
        }
      }
    },
    created() {
      // 不用发请求获取数据吧，我在登陆组件里面把登陆成功的当前用户信息保存到了sessionStorage中了；直接拿就行,但是图片的话就要
    //   request({
    //     url: '/api/item/person/queryPersonByPid?pid=000001'
    //   }).then(res => {
    //     this.person = res.data;
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })

      //从sessionStorage中拿到个人信息(没拿头像)
      let getStr = window.sessionStorage.getItem('personobj');
      let getObj = JSON.parse(getStr);
      this.personOBJ = getObj;
      //从sessionStorage中拿到头像
      if (window.sessionStorage.getItem('personpicture') != null){
        console.log('进来到这个if语句了吗---------------');
        this.imageURL = window.sessionStorage.getItem('personpicture');
        console.log('头像URL',this.imageURL);
      }
    },
    methods: {
      //图片上传
      handleAvatarSuccess(res, file) {
        let image = URL.createObjectURL(file.raw);
        this.imageURL = image;
        console.log('图片URL',this.imageURL);
        window.sessionStorage.setItem('personpicture',image);
      },
      beforeAvatarUpload(file) {
        // let canPicture = ['image/jpeg','image/png'];
        // const isJPG = file.type === 'image/jpeg' ;
        //indexOf是判断元素是否在数组里面；返回的是元素在数组的位置；第一个位置是0，不在就返回-1
        const isTrue = this.canPicture.indexOf(file.type) >= 0;
        console.log('--------看看isTrue的真假:--',isTrue, 'file.type是图片类型:',file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;
        // console.log('----isJPG',isJPG,'----isLt2M',isLt2M);

        if (!isTrue) {
          this.$message.error('上传头像图片只能是 JPG或Png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M ;
        return isTrue && isLt2M ;
        // return true;
      }
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

  //------上传头像组件的---------
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
