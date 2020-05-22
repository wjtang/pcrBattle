<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="flex-header">
        <navbar></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  // components
  import {Navbar, Sidebar, AppMain, TagsView} from './components'

  // TagsView
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      TagsView,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .main-container {
    display: flex;
    flex-flow: column nowrap;
    min-height: inherit !important;
    height: 100%;
    .flex-header {
      width: 100%;
      flex: 0 0 84px;
    }
    .app-main {
      width: 100%;
      flex: 1 1 auto;
      overflow: auto;
      min-height: inherit !important;
    }
  }
</style>
