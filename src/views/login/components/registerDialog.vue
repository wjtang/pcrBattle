<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="530px"
      title="注册报关公司"
      :modal-append-to-body="false"
      :close-on-click-modal="false">
      <el-form
        class="login-form"
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm">
        <el-form-item prop="companyName" label="公司名称" label-width="150px">
          <el-input name="companyName" type="text" v-model="loginForm.companyName" placeholder="公司名称"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="creditCode" label="统一社会信用证代码" label-width="150px">
          <el-input name="creditCode" type="text" v-model="loginForm.creditCode" placeholder="统一社会信用证代码"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="account" label="账号" label-width="150px">
          <el-input name="account" type="text" v-model="loginForm.account" placeholder="账号"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="loginPwd" label="密码" label-width="150px">
          <el-input name="loginPwd" type="password" v-model="loginForm.loginPwd" placeholder="请输入6位密码"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="reloginPwd" label="重新输入密码" label-width="150px">
          <el-input name="reloginPwd" type="password" v-model="loginForm.reloginPwd" placeholder="请输入6位密码"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="contactTel" label="联系电话" label-width="150px">
          <el-input name="contactTel" type="text" v-model="loginForm.contactTel" placeholder="请输入联系电话"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="150px">
          <el-input name="email" type="text" v-model="loginForm.email" placeholder="请输入邮箱"
                    style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="address" label="地址" label-width="150px">
          <el-input name="address" type="text" v-model="loginForm.address" placeholder="地址"
                    style="width: 300px"/>
        </el-form-item>
        <el-button type="primary" @click="handleRegister" class="submit-button">确定</el-button>
        <el-button @click="dialogVisible = !dialogVisible">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Md5 from 'blueimp-md5'
  import {register} from '@/api/login.js'
  import {k} from '@/utils/tools'

  export default {
    name: "index.vue",
    data(){
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.loginPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if ((/[\u4E00-\u9FA5]/g.test(value))) {
          callback(new Error('不允许输入汉字'));
        } else {
          callback();
        }
      };
      var validateEmail =  (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入邮箱地址'));
        } else if (!(/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(value))) {
          callback(new Error('请输入正确的邮箱地址'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        smsDisabled: false,
        loginForm: {
          account: '',
          loginPwd: '',
          companyName:'',
          creditCode:'',
          address:'',
          contactTel:'',
          email:'',
          reloginPwd:''
        },
        loginRules: {
          contactTel: [{required: true, trigger: 'blur', validator: validatePhone}],
          loginPwd: [{required: true, trigger: 'blur', validator: validatePass}],
          reloginPwd: [{required: true, trigger: 'blur', validator: validatePass1}],
          companyName: [{required: true, trigger: 'blur', message: '请输入公司名称'}],
          creditCode: [{required: true, trigger: 'blur', message: '请输入统一社会信用证代码'}],
          account: [{required: true, trigger: 'blur', validator: validateAccount}],
          email:[{required: true, trigger: 'blur', validator: validateEmail}],
          address:[{required: true,trigger:'blur', message:'请输入地址'}]
        }
      }
    },
    methods: {
      changeCode(){
        this.imgsrc = this.imgsrc + 1
      },
      handleClick(tab, event){

      },
      init(){
        this.dialogVisible = !this.dialogVisible;
      },
      handleRegister(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // console.log(this.loginForm);
             let loginPwd = Md5(this.loginForm.loginPwd, k(), false);
            register({
              account: this.loginForm.account,
              companyName: this.loginForm.companyName,
              creditCode: this.loginForm.creditCode,
              address: this.loginForm.address,
              contactTel: this.loginForm.contactTel,
              email: this.loginForm.email,
              loginPwd:loginPwd
            }).then(data => {
              if (data.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success'
                });
                location.reload()
              } else {
                this.$message({
                  showClose: true,
                  message: data.data.message,
                  type: 'error'
                });
              }
            })
            console.log(this.loginForm);
          } else {

          }
        });
      }
    }
  }
</script>

<style scoped>
  .grey-word {
    color: grey;
    font-size: 13px;
    position: relative;
    top: 7px;
    left: 10px;
    cursor: pointer;
  }

  .submit-button {
    margin: 0 auto;
    margin-left: 150px
  }
</style>
