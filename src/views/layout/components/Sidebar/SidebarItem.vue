<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item v-if="singleMenuByAdmin(item)" :index="item.path+'/'+item.children[0].path"
                      :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                    :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title"
                slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="item.name||item.path" :key="item.name">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        <el-badge is-dot v-if="showFlag" :hidden="showFlag && item.meta.title !== '预警监控系统'"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          :is-nest="true"
          class="nest-menu"
          v-if="child.children&&child.children.length>0"
          :routes="[child]" :key="child.path"></sidebar-item>

        <router-link v-else :to="item.path+'/'+child.path" :key="child.path">
          <el-menu-item :index="item.path+'/'+child.path" v-if="hideForAdmin(child)">
            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            <el-badge
              :value="navMap[child.meta.title]"
              :max="99"
              :hidden="navMap[child.meta.title] > 0 && !hideBadge(child)"
              :style="{marginLeft:navMap[child.meta.title] > 0 ? '-30px': ''}"/>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  // api
  import { getWarningCount } from '@/api/navMenu'
  // vuex
  import { mapActions, mapGetters } from 'vuex'

  import path from 'path'
  import { generateTitle } from '@/utils/i18n'
  import { isExternal } from '@/utils'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    components: { AppLink },
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    computed: {
      showFlag() {
        let ret
        Object.keys(this.navMap).forEach((key) => {
          if (this.navMap[key] > 0) {
            ret = true
          } else {
            ret = false
          }
        })
        return ret
      },
      ...mapGetters([
        'navMap'
      ])
    },
    methods: {
      singleMenuByAdmin(item) {
//        if (item.name === 'elGraph-parent') {
//          if (this.$store.getters.isAdmin) {
//            return false
//          }
//        }
        return true
      },
      hideForAdmin(child) {
        //隐藏超级管理员不需要操作的菜单
        if (child.meta.code === 'send' || child.name === 'costSetting') {
          if (this.$store.getters.isAdmin) {
            return false
          }
        }
        return true
      },
      hideBadge(child) {
        if (child.meta.title === '长期堆存集装箱预警' ||
          child.meta.title === '分区堆放预警' ||
          child.meta.title === '集装箱号异常预警' ||
          child.meta.title === '集装箱口岸漂移预警' ||
          child.meta.title === '集装箱异常离场预警' ||
          child.meta.title === '超时未申报预警' ||
          child.meta.title === '超时未提离预警') {
          return true
        } else {
          return false
        }
      },
      generateTitle,
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (this.isExternalLink(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternalLink(routePath) {
        return isExternal(routePath)
      },
      ...mapActions([
        'GetWarningCount'
      ])
    }
  }
</script>

