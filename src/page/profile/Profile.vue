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
    <!--<div>-->
      <!--<button>替换头像</button>-->
      <!--<img src="../../assets/touxiang.png" alt="">-->
    <!--</div>-->
    <el-upload class="avatar-uploader"
      action="http://localhost:2263/upload/headPortrait"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>

  import {request} from "../../network/request";

  export default {
    name: "profile",
    data(){
      return{
        person: '',
        //图片上传
        imageUrl: ''
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
    },
    methods: {
      //图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
