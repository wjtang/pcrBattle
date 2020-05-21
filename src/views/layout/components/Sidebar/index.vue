<template>
  <scroll-bar>
    <div class="logo">
      <!--<img src="../../favicon.png" alt="">-->
      <h1>pcr 内部jjc查询</h1>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">

      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'
  import {constantRouterMap} from '@/router'

  export default {
    components: {SidebarItem, ScrollBar},
    computed: {
      ...mapGetters([
        'permission_routers',// for test
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data(){
      return {
//        permission_routers: [] // for test
      }
    },
    created(){
//      this.permission_routers = constantRouterMap // for test
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped="scope">
  .sidebar-container {
    background: #1f2d3d;
    position: inherit !important;
    float: left !important;
  }

  .logo {
    position: relative;
    height: 64px;
    padding-left: 16px;
    overflow: hidden;
    line-height: 64px;
    background-color: rgba(48, 65, 86, .4);
    transition: all .3s;
    color: #fff;

    img {
      display: inline-block;
      height: 30px;
      vertical-align: middle;
    }

    h1 {
      display: inline-block;
      margin: 0 0 0 10px;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
</style>
