<template>
  <div class="dashboard-editor-container">
    <div class="panel">
      <div class="title">您好，欢迎使用 仓库网</div>
      <div class="body">
        <div class="tit">你没有权限访问，请联系管理员或者请致电以下电话</div>
        <ul>
          <li>管理员：18888888888</li>
          <li>客服专线：0757-88888888</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // vuex
  import { mapGetters } from 'vuex'
  // utils
  import openWindow from '@/utils/openWindow'

  export default {
    name: 'dashboard-nopermission',
    data() {
      return {
        scrollHeight: 0,
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      console.log(this.roles)
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    min-height: 100vh;
    padding: 32px;

    .panel {
      padding: 30px;
      background: #fff;
      position: relative;
      ul {
        list-style: none;
        padding: 8px;
        margin: 0;
      }

      .title {
        padding: 16px;
        text-align: center;
        font-weight: 700;
      }
      .body {
        font-size: 14px;
        padding: 16px;
        text-align: center;
      }
    }
  }
</style>
