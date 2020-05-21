<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <!--<breadcrumb class="breadcrumb-container"></breadcrumb>-->

      <div class="right-menu">
        <!--<error-log class="errLog-container right-menu-item" ></error-log >-->

        <!--<el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom" >-->
        <!--<screenfull class="screenfull right-menu-item" ></screenfull >-->
        <!--</el-tooltip >-->

        <!--<lang-select class="international right-menu-item"></lang-select>-->

        <!--<el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">-->
        <!--<theme-picker class="theme-switch right-menu-item"></theme-picker>-->
        <!--</el-tooltip>-->

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
            <el-button size="mini">{{name}} <i class="el-icon-caret-bottom"></i></el-button>
          </div>
          <el-dropdown-menu slot="dropdown">

            <el-dropdown-item>
              <span @click="updatePassDialog=true"> 修改密码</span>
            </el-dropdown-item>

            <!--<router-link to="/" >-->
            <!--<el-dropdown-item >-->
            <!--{{$t('navbar.dashboard')}}-->
            <!--</el-dropdown-item >-->
            <!--</router-link >-->
            <!--<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/" >-->
            <!--<el-dropdown-item >-->
            <!--{{$t('navbar.github')}}-->
            <!--</el-dropdown-item >-->
            <!--</a >-->
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <el-dialog :visible.sync="updatePassDialog" title="修改密码" width="550px">
      <el-form ref="passwordForm" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'
               :rules="rules" :model="form"
               size="mini">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input type="password" v-model="form.confirmPass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updatePassDialog = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitPassForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import LangSelect from '@/components/LangSelect'
  import ThemePicker from '@/components/ThemePicker'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'
  import {updateMyPwd} from '@/api/users'
  import {k} from '@/utils/tools'
  const Md5 = require('blueimp-md5')

  export default {
    components: {
      ElButton,
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      LangSelect,
      ThemePicker
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    data(){
      return {
        token: this.$store.getters.token,
        updatePassDialog: false,
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPass: ''
        },
        rules: {
          oldPwd: [
            {required: true, message: '请填写旧密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (this.form.newPwd !== '') {
                  this.$refs['passwordForm'].validateField('newPwd')
                }
                callback()
              }, trigger: 'blur'
            }
          ],
          newPwd: [
            {required: true, message: '请填写新密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (this.form.oldPwd !== '') {
                  if (this.form.oldPwd === value) {
                    callback(new Error('新密码不能与原密码相同!'))
                  }
                }
                if (this.form.confirmPass !== '') {
                  this.$refs['passwordForm'].validateField('confirmPass')
                }
                callback()
              }, trigger: 'blur'
            }
          ],
          confirmPass: [
            {required: true, message: '请再次确认密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.form.newPwd) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              }, trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      },
      submitPassForm(){
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            this.form.oldPwd = Md5(this.form.oldPwd, k(), false)
            this.form.newPwd = Md5(this.form.newPwd, k(), false)
            updateMyPwd(this.form).then(res => {
              res = res.data
              this.$message({showClose: true, message: '修改成功', type: 'success'});
              this.updatePassDialog = false
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
    }
  }
</style>
