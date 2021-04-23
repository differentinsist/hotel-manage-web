<template>
  <div>
    <!--面包屑放在每一个组价中；写死；好像不好-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'hotelmall' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>本人业务</el-breadcrumb-item>
      <el-breadcrumb-item>我的基本信息</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>




      <div class="persontable">


        <el-upload class="avatar-uploader"
                   :action="uploadURL"
                   :data="personOBJ"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <!--<img v-if="imageURL" :src="imageURL" class="avatar">原来的 -->
          <h4>点击替换头像</h4>
          <!--<img :src="imageURL" class="avatar" alt="点击上传头像">-->
          <img :src="this.$store.state.imageurl" class="avatar" alt="点击上传头像">
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>原来的 -->
        </el-upload>

        <table>
          <!--<tr>  tr是一行数据 好像也是换行？ -->
            <!--<td>名字:</td><td>{{personOBJ.name}}</td>-->
            <!--<td>地址:</td><td>{{personOBJ.address}}</td>-->
          <!--</tr>-->
          <tr>
            <td>名字:</td><td>{{personOBJ.name}}</td>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisibleName = true" circle>修改名字</el-button>
          </tr>
          <tr>
            <td>我的ID编号:</td><td>{{personOBJ.id}}</td>
          </tr>
          <tr>
            <td>电话:</td><td>{{personOBJ.phone}}</td>
            <el-button type="primary" icon="el-icon-edit"  @click="dialogVisiblePhone = true" circle>修改号码</el-button>
          </tr>
          <tr>
            <td>身份证:</td><td>{{personOBJ.idcard}}</td>
          </tr>
          <tr>
            <td>地址:</td><td>{{personOBJ.address}}</td>
            <el-button type="primary" icon="el-icon-edit"  @click="dialogVisibleAddress = true" circle>修改住址</el-button>
          </tr>
          <tr>
            <td>注册时间:</td><td>{{personOBJ.createdtime}}</td>
          </tr>
        </table>
        <!--<div>-->
        <!--<button>替换头像</button>-->
        <!--<img src="../../assets/touxiang.png" alt="">-->
        <!--</div>-->
      </div>


      <!--点击按钮弹出【修改用户名】的   对话框 1（其实对话框可以合并为一个） -->
      <el-dialog title="修改用户名" :visible.sync="dialogVisibleName" width="30%" :before-close="handleClose">
        <el-form ref="editFromRef" class="editUser" :model="userEditObj" :rules="editUserFormRules" label-width="100px">
          <el-form-item   label="用户名:" prop="username"  >
            <el-input v-model="userEditObj.username" placeholder="3-10个字符之间" @blur="handelBlurName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleName = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleNameFunction()" :disabled="kaiguan">确 定 修 改</el-button>
        </span>
      </el-dialog>

      <!--点击按钮弹出【修改电话】的  对话框 2-->
      <el-dialog title="修改电话|点击修改实现值跟着显示变化" :visible.sync="dialogVisiblePhone" width="30%" :before-close="handleClose">
        <el-form ref="editFromRef" class="editUser" :model="userEditObj" :rules="editUserFormRules" label-width="100px">
          <el-form-item  label="电话:" prop="phone"  >
            <!--<el-input v-model="userEditObj.phone" placeholder="电话号码在7-11位数之间"></el-input> -->
            <!--name、phone、address三个字段的值斗殴绑定在userEditObj.name，这样就好-->
            <el-input v-model="userEditObj.username" placeholder="电话号码在7-11位数之间"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblePhone = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblePhoneFunction">确 定 修 改</el-button>
        </span>
      </el-dialog>

      <!--点击按钮弹出【修改地址】的  对话框 3-->
      <el-dialog title="修改地址" :visible.sync="dialogVisibleAddress" width="30%" :before-close="handleClose">
        <el-form  class="editUser" :model="userEditObj" :rules="editUserFormRules" label-width="100px">
          <!--<el-form-item   label="地址:"  ><el-input v-model="userEditObj.address" ></el-input></el-form-item>-->
          <el-form-item   label="地址:"  ><el-input v-model="userEditObj.username" ></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAddress = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleAddressFunction">确 定 修 改</el-button>
        </span>
      </el-dialog>

      <!--点击按钮弹出【修改密码,还没做】的对  话框 4-->
      <el-dialog title="修改密码" :visible.sync="dialogVisiblePassword" width="30%" :before-close="handleClose">
        <el-form class="editUser" :model="userEditObj" :rules="editUserFormRules" label-width="100px">
          <el-form-item   label="密码:" prop="password"  >
          <el-input v-model="userEditObj.password" placeholder="长度在6~15个字符之间" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblePassword = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisiblePassword = false">确 定 修 改</el-button>
        </span>
      </el-dialog>



    </el-card>
  </div>

</template>

<script>

  import {requestImage} from "../../network/request";
  import {request} from "../../network/request";

  export default {
    name: "profile",
    data(){
      return{
        //对话框控制
        dialogVisibleName: false,
        dialogVisiblePhone: false,
        dialogVisiblePassword: false,
        dialogVisibleAddress: false,
        //控制按钮是否允许可按
        kaiguan: true,

        //默认图片路径（图片属性我单独抽取出来了，因为我把头像单独保存在sessionStorage中，这样方便更新）
        //imageURL: 'http://image.renthotel.com/hotelhappyimages/2/0/01xixuegui.jpg',
        imageURL: 'http://8.129.187.106/touxiang/01xixuegui.jpg',
        //图片上传到服务器的地址【这是本地的】  改为localhost还是端口好一点？
        //uploadURL: 'http://api.renthotel.com/upload/headPortrait',
        //uploadURL: 'http://8.129.187.106/upload/headPortrait',

        //阿里云的话就这样子:
        uploadURL: '/upload/headPortrait',
        //本机：
        // uploadURL: 'http://localhost:2263/upload/headPortrait',
        //设置允许的图片类型
        canPicture: ['image/jpeg','image/png'],
        //当前【展示的】用户对象
        personOBJ: {
          id: '',
          name: '',
          idcard: '',
          birthday: '',
          address: '',
          phone: '',
          createdtime: '',
          personpicture: ''
        },
        //赋值给这个对象；用户【发送请求】 也可以作为修改用户信息【绑定的对象】
        userEditObj: {
          userid: '',
          username: ''
          // password: '',  没有必要用到
          // address: '',
          // phone: ''
        },

        //字段名,不是值
        fileName: '',
        // fieldName: 'name',
        // fieldPhone: 'phone',
        // fieldAddress: 'address',


        //定义表单验证的规则
        editUserFormRules: {
          //验证用户名
          username: [
            {required: false, message: "修改用户名", trigger: "blur"},
            {min:3, max:10, message:"长度在3~10个字符之间", trigger:"blur"}
          ],
          //验证密码是否合法
          password: [
            {required: false, message: "亲，输入密码", trigger: "blur"},
            {min:6, max:15, message:"长度在6~15个字符之间", trigger:"blur"}
          ],
          //校验身份证号
          idcard: [
            {required: false, message: "请输入假的18位的身份证号", trigger: "blur"},
            {min:18, max:18, message:"18个字符", trigger:"blur"}
          ],
          //校验电话
          phone: [
            {required: false, message: "请输入假的手机号码", trigger: "blur"},
            {min:7, max:11, message:"电话号码在7-11位数之间", trigger:"blur"}
          ],
          birthday: [
            {required: true, message: "请输入日期,格式xx-xx-xx", trigger: "blur"},
          ]
        },

        //失去输入框失去焦点就发送请求查询这个用户名是否被使用
        handelBlur(){
          console.log('输入框失去焦点了,我就要发送请求');
          this.queryUsername();
        }
      }
    },
    computed: {
      fieldValue3: function(){
        console.log('看看修改输入框的值',fieldValue3);
        return fieldValue3 = this.userEditObj.username;
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

      //从sessionStorage中拿到个人信息(没拿头像)  我觉得还是发请求从数据库拿到信息和头像比较好
      let getStr = window.sessionStorage.getItem('personobj');
      let getObj = JSON.parse(getStr);
      this.personOBJ = getObj;
      //从sessionStorage中拿到头像 （我觉得还是发请求从数据库拿比较好）
      if (window.sessionStorage.getItem('personpicture') != null){
        console.log('进来到这个if语句了吗---------------');
        this.imageURL = window.sessionStorage.getItem('personpicture');
        console.log('头像URL',this.imageURL);
      }

      //在页面初始化之后都更新一下路径的状态值；好实现高亮菜单
      this.$store.commit('changeActivePath')
    },
    methods: {
      //图片上传
      handleAvatarSuccess(res, file) {
        let image = URL.createObjectURL(file.raw);
        this.imageURL = image;
        console.log('图片URL',this.imageURL);
        // window.sessionStorage.setItem('personpicture',image);

        this.personOBJ.personpicture = image;
        let getUserStr = JSON.stringify(this.personOBJ);
        window.sessionStorage.setItem('personobj',getUserStr);

        // this.sendRequestQueryUserMessage();

        // 这里的意思是我上传头像了，就改变(同步)Vuex中头像变量的URL
        this.$store.commit('changeImage')  //额外添加的关于头像同步-----Vuex的同步更新值再组件页面不刷新的情况下也能实现---
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
      },

      //点击修改按钮--
      editUserMessageById(){

      },

      //发送请求，根据用户表的id修改基本数据，同时获取到最新数据到sessionStorage中，同时更新Vuex内容
      //双向绑定、{{xx}}站位 是响应式的吗，data变化能跟着变化吗？还是要？刷新后会怎么样？
      sendRequestEditUserMessageById(){
        request({
          url: '/user/person/findAndAlterPersonById',
          params: {
            userid: this.personOBJ.id,
            //fieldName是字段的名称不是值，因为我动态修改几个字段的值，刚好他们都是字符串类型（需要传递正确的字段名）
            fieldName: this.fileName,
            //值写死不行；都是使用用户名的值作为name、phone、address的值，
            fieldValue: this.userEditObj.username
          }
        }).then((res) => {
          //修改成功同时把数据保存到sessionStorage中，同时更新状态管理Vuex中的内容
          this.personOBJ = res.data; //更新data，会同步显示吗
          let getUserStr = JSON.stringify(res.data);
          window.sessionStorage.setItem('personobj',getUserStr); //更新sessionStorage中的数据
          //更新Vuex中的数据
          this.$store.commit('getUserObject');

          console.log("看看修改后返回来的用户对象属性");


          this.userEditObj.username = ''; //加了这句就每次打开输入框都是空的,
          //不加的话三个弹出输入框的的值都一样,你可以试试看,因为我都绑定在同一个userEditObj.username

          return this.$message.success("修改成功"); //提示
        }).catch((err) => {
          console.log("出错了怎么处理",err);
          return this.$message.error('修改失败了')
        })
      },

      //对话框的函数；取消或确认。
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
          done();
        })
          .catch(_ => {});
      },

      // 用户名输入框失去焦点触发的函数。【就是查询用户名是否被使用了】
      handelBlurName(){
        this.queryUsernameIfUse();
      },

      // sendRequestQueryUserMessage(){
      //   request({
      //     url: '/item/'
      //   }).then((res) => {
      //     console.log('用户对象',res);
      //   }).catch((err) => {
      //     console.log('报错怎么处理',err);
      //   })
      // }

      // 【发请求】保存本人头像到数据库    不用单独发送了，什么elementUI框架已经帮助发送了，给出路径就行了
      // savePersonHeadPortrait(){
      //   requestImage({
      //     url: 'upload/headPortrait',
      //     method: 'post',
      //     data: ''
      //   }).then(() => {}).catch(() => {})
      // }

      // 同步头像
      // changeImageTogeder(){
      //   this.personURL = this.$store.imageurl;
      //   this.$store.commit('changeImage') 这句代码起到更新值的作用，我使用在上面了；就一句代码就行了；不用写方法
      // }

      queryUsernameIfUse(){
        request({
          url: '/user/person/check',
          params: {
            //是输入对象的绑定
            personname: this.userEditObj.username,
            type: 1
          }
        }).then((res) => {
          console.log('返回false就是已经被使用了=res.data就是返回值',res.data);
        //if(res.data === true && this.loginForm.username != ''){
        if(res.data === false){
          this.kaiguan = true; //disable=true就是禁用开关
          this.$message.error("此用户名已经有人使用，请换一个");
        };
        if(res.data === true){
          if(this.userEditObj.username == ''){
            this.kaiguan = true;
            this.$message.error("用户名不能为空");
          }else {
            this.kaiguan = false;
            this.$message.success("此用户名没人用过，可以使用");
          }
        }
        }).catch((err) => {
          console.log('根据用户名查询用户名是否被使用出错了吗',err);
        })
      },

      //点击弹出框的【确定】按钮，实现修改数据并重新获取最新数据
      dialogVisibleNameFunction(){     //修改用户名
        this.fileName = 'name',
        this.sendRequestEditUserMessageById();
        this.dialogVisibleName = false;
      },
      dialogVisiblePhoneFunction(){    //修改电话
        this.fileName = 'phone';
          this.sendRequestEditUserMessageById();
        this.dialogVisiblePhone = false;
      },
      dialogVisibleAddressFunction(){  //修改地址
        this.fileName = 'address';
        this.sendRequestEditUserMessageById();
        this.dialogVisibleAddress = false;//写在这里好吗？
      }
    }
  }
</script>

<style lang="less" scoped>

  .el-card {
    margin-top: 10px;
  }

  .persontable {
    display: flex;
    justify-content: space-around;
    /*justify-content: center;*/
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      img {
        /*padding-left: 5px;*/
        width: 150px;
        height: 150px;
        /*padding-right: 50px;*/
        border-radius: 20%;
      }
      span {
        padding-left: 50px;
      }
    }
  }

  table {
    border: 0px solid #e9e9e9;
    /*border: 1px solid #e9e9e9;*/
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,td {
    padding: 8px 16px;
    border: 0px solid #e9e9e9;
    /*border: 1px solid #e9e9e9;*/
    text-align: left;
    height: 45px;
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
