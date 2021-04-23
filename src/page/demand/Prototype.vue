<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>需求建议</el-breadcrumb-item>
      <el-breadcrumb-item>系统原型</el-breadcrumb-item>
    </el-breadcrumb>


    <div class="demo-image__lazy">
      <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
    </div>

  </div>



</template>

<script>
  export default {
    name: "prototype",
    data(){
      return {
        //本机:
        // urls: [
        //   'http://192.168.217.128/hotelhappyimages/0/4/0000.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0001.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0002.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0003.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0004.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0005.png',
        //   'http://192.168.217.128/hotelhappyimages/0/4/0006.png',,
        //   'http://192.168.217.128/hotelhappyimages/0/4/0007.png'
        // ]
        //阿里云服务器的
        urls: [
          'http://8.129.187.106/touxiang/prototype/0000.png',
          'http://8.129.187.106/touxiang/prototype/0001.png',
          'http://8.129.187.106/touxiang/prototype/0002.png',
          'http://8.129.187.106/touxiang/prototype/0003.png',
          'http://8.129.187.106/touxiang/prototype/0004.png',
          'http://8.129.187.106/touxiang/prototype/0005.png',
          'http://8.129.187.106/touxiang/prototype/0006.png',
          'http://8.129.187.106/touxiang/prototype/0007.png'
        ]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
