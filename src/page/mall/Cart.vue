<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>旅店商城</el-breadcrumb-item>
      <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
    </el-breadcrumb>

    <!--购物车中未支付商品模块-->
    <el-card  shadow="never">
      <span>全部待支付商品:</span>
      <el-card  >
        <el-row :gutter="20">
          <el-col span="4">
            <div>
              <el-image
                style="width: 100px; height: 100px"
                :src="dialogButtonData.goodspicture" >
                <!--:src="dialogButtonData.goodspicture" alt="没有商品">-->
              </el-image>
            </div>
          </el-col>
          <el-col span="12">
            <div>
              <span>{{dialogButtonData.goodsname}}</span>
              <span>{{dialogButtonData.goodsdiscription}}</span>
              <span>{{dialogButtonData.goodsprice}}元</span>
            </div>
          </el-col>
          <el-col span="8">
            <div>
              <el-button type="danger" round @click="deleteCart">删除</el-button>
              <el-button type="primary" round @click="buyButtomfiction">付款</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>

    <el-card  shadow="never">
      <span>已支付商品:</span>
      <el-card  >
        <el-row :gutter="20">
          <el-col span="4">

          </el-col>
          <el-col span="12">

          </el-col>
          <el-col span="8">

          </el-col>
        </el-row>
      </el-card>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "cart",
    data(){
      return {
        //从按钮获取到的数据；暂时写在sessionStorage中保存，后面放到redis中更好。
        dialogButtonData: {
          goodsid: '',
          goodsbrand: '',
          goodsname: '',
          goodsprice: '这里啥也没有',
          goodsstock: '',
          goodsdiscription: '',
          goodspicture: ''
        },
        // 控制购买弹框的属性
        buyButtom: false
      }
    },
    //写在created里面好还是写在mounted里面好？
    created(){
      if(window.sessionStorage.getItem('dialogButtonData') != null){
        let getStr = window.sessionStorage.getItem('dialogButtonData');
        let getObj = JSON.parse(getStr);
        this.dialogButtonData = getObj;
      }

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath')
    },
    methods: {
      // 点击购买按钮弹出购买成功界面
      buyButtomfiction(){

      },
      // 点击【删除按钮】删除购物车记录
      deleteCart(){
        // window.sessionStorage.removeItem('dialogButtonData');
        // this.dialogButtonData = null;
      }
    }
  }
</script>

<!--<style lang="less" scoped> 加less的话好像导致el-row不生效，好像又不是-->
<style scoped>

  /*.firstCard {*/
    /*display: flex;*/
    /*justify-content: center;*/
  /*}*/

  /*.el-row {*/
    /*margin-bottom: 20px;*/
    /*&:last-child {*/
      /*margin-bottom: 0;*/
    /*}*/
  /*}*/
  /*.el-col {*/
    /*border-radius: 4px;*/
  /*}*/
  /*.bg-purple-dark {*/
    /*background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
    /*background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
    /*background: #e5e9f2;*/
  /*}*/
  /*.grid-content {*/
    /*border-radius: 4px;*/
    /*min-height: 36px;*/
  /*}*/
  /*.row-bg {*/
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  /*}*/


</style>
