<template>
  <div class="login">
      <div class="login-form">
        <!--登录标题-->
        <div class="login-header">
          <p>用户登录</p>
        </div>
        <!--登录表单：手机号码、密码、验证码-->
        <el-input
          class="custom"
          placeholder="请输入手机号码"
          v-model="tel"

        >
        </el-input>
        <el-input
          class="custom"
          placeholder="密码"
          v-model="password"
          type="password"
          @input="change($event)"
          @keyup.enter.native="login"
        >
        </el-input>
        <div class="tips" v-if="alertShow">
          <span><img src="../../../static/amazing.png" width="19px" height="19px" class="im-tips">账号或密码错误</span>
        </div>

        <el-button @click="login" class="lbt custom">确认登录</el-button>
        <!--<div>
          <router-link to="/register" class="registerTip">注册</router-link>
          <a class="forgetpwd" href="javascript:;">忘记密码</a>
        </div>-->

      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tel: '',
        password: '',
        captcha: '',
        alertShow: false
      }
    },
    computed: {

    },
    methods: {
      /*解决el-input套用太深，无法输入的问题*/
      change(e) {
        this.$forceUpdate()
      },

      login(){
        const {tel, password} = this;
        return new Promise((resolve, reject) => {
          this.$api.log.Login(tel, password).then(res =>{
            if(res.data.code == 200){
              const user = res.data;
              this.$store.dispatch('recordUserInfo', user);
              this.$router.push('/bench');
              this.$message({
                message: '登陆成功!',
                type: 'success'
              });
            }else {
              this.alertShow = true
            }
          }).catch(err =>
            this.$message({
            message: '登陆失败!连接不到服务器',
            type: 'error'
          }))
        })

      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #F6F6F6;
  }
  .login-form {
    width: 384px;
    height: 507px;
    padding: 0px 159px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    text-align: left;
    border-radius: 4px;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    zoom: 1;
    display: block;
  }
  .login-form >>> .el-input {
    width: 384px;
  }
  .login-form >>> .el-input__inner {
    background: rgba(250,250,250,1);
    opacity:1;
    border-radius:4px;
    font-size: 18px;
    padding: 28px 0px 28px 32px;
    line-height: 10px;
    font-weight: 300;
    border: 0px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .login-form >>> .el-button{
    padding: 20px 155px;
    background-color: rgba(250,250,250,1);
    margin-bottom: 13px;
    margin-top: 27px;
    border: 0px;
    font-size: 18px;
    font-weight: 300;
  }
  .login-header {
    text-align: center;
    font-size: 20px;
    margin-top: 49px;
    margin-bottom: 43px;
    font-weight: 300;
    color: rgba(95,95,95,1);
    opacity: 1;
  }
  .tips {
    font-size: 16px;
    font-weight: 300;
    color: #5F5F5F;
    opacity: 1;
  }
  .im-tips {
    margin-right: 6px;
    vertical-align: middle;
    margin-left: 7px;
  }
  body {
    margin: 0px;
  }
</style>
