<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="dot dot-1">
        <div class="circle"></div>
      </div>
      <div class="dot dot-2">
        <div class="circle"></div>
      </div>
      <div class="dot dot-3">
        <div class="circle"></div>
      </div>
    </div>
    <el-form
      size="mini"
      class="login-form"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left">
      <div class="title-container">
        <h3 class="title">PCR内部jjc 查询系统</h3>
        <!--<lang-select class="set-language" ></lang-select >-->
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="password"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="handleLogin"
        style="width:100%;height: 40px;background-color: #0a4d92;">{{$t('login.logIn')}}
      </el-button>
      <div class="register-box">
        <!--<div class="register" @click="handleRegister"><span></span>用户注册</div>-->
      </div>
      <div style="width:100%;text-align:center;color:#333;font-size:12px;">
        productBy---Ab
      </div>
      <!--<div class="tips" >-->
      <!--<span >{{$t('login.username')}} : test</span >-->
      <!--<span >{{$t('login.password')}} : {{$t('login.any')}}</span >-->
      <!--</div >-->
      <!--<div class="tips" >-->
      <!--<span style="margin-right:18px;" >{{$t('login.username')}} : editor</span >-->
      <!--<span >{{$t('login.password')}} : {{$t('login.any')}}</span >-->
      <!--</div >-->

      <!--<el-button class="thirdparty-button" type="primary" @click="showDialog=true" >{{$t('login.thirdparty')}}-->
      <!--</el-button >-->
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign/>
    </el-dialog>
    <registerdialog ref="registerForm"></registerdialog>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import LangSelect from '@/components/LangSelect'
  import SocialSign from './socialsignin'
  import {k} from '@/utils/tools'
  import Md5 from 'blueimp-md5'
  import Registerdialog from './components/registerDialog.vue'
  import {setToken} from '@/utils/auth'

  export default {
    components: {LangSelect, SocialSign},
    name: 'login',
    data() {
      return {
        copyright: 'product by ab',
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
          password: [{required: true, trigger: 'blur', message: '请输入密码'}]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        k: 'fseport'
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if(this.loginForm.username == 'admin' && this.loginForm.password == 'abnb') {
              setToken('abnb');
              this.$router.push({ path: '/' })
            }else{
              this.$message({type: 'error', message: '密码呢,wdnmd!!!'});
            }
          } else {
            console.log('error submit!!')
            this.$message({type: 'warning', message: '请填写用户名或密码'});
            this.loginForm.password = ''
            return false
          }
        })
      },
      handleRegister(){
        this.$refs.registerForm.init();
      },
      handleDownload(){
        window.open('http://dpa.fseport.com/download/publish.zip');
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    mounted() {
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    components: {
      Registerdialog
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #333;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    background-image: url(../../img/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    .el-input /deep/{
      display: inline-block;
      height: 26px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 26px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #333 !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid #9d9d9d;
      background: #fff;
      border-radius: 4px;
      color: #454545;

      .el-form-item__content {
        line-height: 20px;
      }
    }

    .login-form {
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      width: 560px;
      height: 560px;
      border-radius: 50%;
      padding: 140px 140px 0;
      /*background-image: url(../../img/login.png);*/
      /*background-repeat: no-repeat;*/
      /*background-size: cover;*/
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 22px;
        font-weight: 700;
        color: #062f41;
        margin: 24px auto;
        text-align: center;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  .login-bg {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    width: 560px;
    height: 560px;
    border-radius: 50%;

  }

  /* 保持大小不变的小圆圈  */
  .dot {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
    height: 560px;
    border-radius: 50%;
    z-index: 2;
  }

  .dot-1 {
    width: 500px;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.18);
    .circle {
      background-color: rgba(255, 255, 255, 0.2);
      animation: spread 3s ease-out;
      animation-iteration-count: infinite;
    }
  }
  .register-box{
    width: 100%;
    height: 40px;
    text-align: center;
    div{
      margin-left: 70px;
      width: 50%;
      cursor: pointer;
      line-height: 40px;
      display: flex;
      font-size: 15px;
      span{
        width: 40px;
        height: 40px;
        display: block;
        background-repeat: no-repeat;
        background-size: 63% auto;
        background-position: center center;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
    .register{
      color: #4F7CAD;
      span{
        background-image: url(../../img/register.png);
      }
    }
    .download{
      color: #D82F17;
      span{
        background-image: url(../../img/download.png);
      }
    }
  }

  .dot-2 {
    width: 440px;
    height: 440px;
    background-color: rgba(255, 255, 255, 0.3);
    .circle {
      background-color: rgba(255, 255, 255, 0.4);
      animation: spread 2.4s ease-out;
      animation-iteration-count: infinite;
    }
  }

  .dot-3 {
    width: 380px;
    height: 380px;
    background-color: rgba(255, 255, 255, 0.5);
    .circle {
      background-color: rgba(255, 255, 255, 0.6);
      animation: spread 2s ease-out;
      animation-iteration-count: infinite;
    }
  }

  .circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
  }

  @keyframes spread {
    from {
      opacity: 1;
      transform: scale(0);
    }
    to {
      opacity: 0;
      transform: scale(1.2);
    }
  }
</style>
